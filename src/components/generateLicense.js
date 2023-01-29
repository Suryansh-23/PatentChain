import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../env";
import LicenseToken from "../artifacts/contracts/LicenseToken.sol/LicenseToken.json";
LicenseToken = JSON.parse(LicenseToken);
// const fs = require("fs");
import { NFTStorage, File } from "nft.storage";
// import imageToBlob from "image-to-blob";
// The 'mime' npm package helps us set the correct file type on our File objects
import { NFT_API_KEY } from "../../env";

const NFT_STORAGE_KEY = NFT_API_KEY;

// const { formatTitle } = require("./utils/format-title");
const loadImage = (url) => {
    return new Promise((resolve, revoke) => {
        let img = new Image();
        img.onload = () => {
            resolve(img);
        };
        img.crossOrigin = "Anonymous";
        img.src = url;
    });
};

const getLicenseNum = async (i) => {
    return String(i).padStart(9, "0");
};

const contractAddress = CONTRACT_ADDRESS;

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, LicenseToken.abi, signer);

// const getMintedStatus = async () => {
//     const result = await contract.isContentOwned(formState.licenseUrl.url);
//     console.log(result);
//     setIsMinted(result);
// };

const mintToken = async (licenseNum, formState) => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    // const addr = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
    // console.log();
    const result = await contract.payToMint(
        addr,
        licenseNum,
        formState.title,
        formState.authorName,
        formState.abstract,
        formState.bg,
        formState.des,
        formState.claims,
        formState.nftUrl,
        formState.drawings,
        {
            value: ethers.utils.parseEther("0.1"),
        }
    );

    console.log("PayToMint Completed");

    await result.wait();
    // getMintedStatus();
};

const loadFont = (url) => {
    return new Promise((resolve, revoke) => {
        let font = new FontFace("montserrat", `url(${url})`);
        font.load()
            .then((face) => {
                document.fonts.add(face);

                resolve();
            })
            .catch(revoke);
    });
};

async function imageToBlob(bloburl) {
    let response = await fetch(bloburl);
    let data = await response.blob();
    return data;
    // ... do something with the file or return it
}

const genLicense = async (obj, insert, minted, incrementMinted) => {
    incrementMinted();
    const lnum = await getLicenseNum(minted);
    console.log(lnum);

    const tmpObj = JSON.parse(JSON.stringify(obj));

    let canvas = document.createElement("canvas");
    canvas.height = 1000;
    canvas.width = 1000;
    let context = canvas.getContext("2d");

    // const base = new Image();
    // base.src = "../../public/base.png";
    return loadFont("../../public/Montserrat-Regular.otf").then(() => {
        const base = loadImage("../../public/base.png");
        return base.then((img) => {
            context.drawImage(img, 0, 0);
            context.font = "28px montserrat";
            context.textAlign = "center";
            context.textBaseline = "top";
            context.fillStyle = "#fff";
            context.fillText(obj.authorName.toUpperCase(), 500, 820);
            context.font = "50px montserrat";
            context.fillText(obj.title, 500, 770);

            context.font = "28px montserrat";
            context.fillStyle = "#000";
            context.fillText(`#LCN${lnum}`, 500, 950);

            canvas.toBlob((blob) => {
                const files = obj.drawings;

                if (files.length > 0) {
                    const drws = [];
                    let idx = 0;

                    for (let i of files) {
                        imageToBlob(i.objectURL).then((d) => {
                            uploadNFT(
                                d,
                                i.name,
                                "Drawings for the Patent",
                                i.type
                            ).then((e) => {
                                drws.push(e);
                                if (idx == files.length - 1) {
                                    tmpObj["drawingUrls"] = drws;
                                }
                            });
                        });
                        idx++;
                    }
                } else {
                    obj["drawingUrls"] = [];
                }

                uploadNFT(blob, obj.title, obj.abstract, "image/png").then(
                    (e) => {
                        console.log(e, URL.createObjectURL(blob));
                        tmpObj["licenseUrl"] = e;
                        tmpObj["nftUrl"] = URL.createObjectURL(blob);

                        mintToken(lnum, tmpObj);
                        insert(
                            tmpObj.title,
                            tmpObj.authorName,
                            tmpObj.abstract,
                            tmpObj.bg,
                            tmpObj.des,
                            tmpObj.claims,
                            tmpObj.nftUrl,
                            tmpObj.licenseUrl,
                            tmpObj.drawings,
                            tmpObj.drawingUrls
                        );
                        // console.log("SetL", licenses, obj);
                    }
                );
                // console.log("##", obj);
            }, "image/png");
        });
    });
};

async function storeNFT(imgBuffer, name, description, type) {
    // load the file from disk
    const image = new File([imgBuffer], name, { type: type });

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

    // call client.store, passing in the image & metadata
    return nftstorage.store({
        image,
        name,
        description,
    });
}

async function uploadNFT(imgBuffer, name, description, type) {
    console.log(imgBuffer);
    const result = await storeNFT(imgBuffer, name, description, type);
    console.log(result);
    return result;
}

export { genLicense, uploadNFT, getLicenseNum };
