import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Form, DataDialog } from "./Form";
import { useEffect, useState } from "react";
import useStore from "./State";

import LicenseToken from "../artifacts/contracts/LicenseToken.sol/LicenseToken.json";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../env";
import { getLicenseNum } from "./generateLicense";

const contractAddress = CONTRACT_ADDRESS;

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, LicenseToken.abi, signer);

const Dashboard = () => {
    const licenses = useStore((state) => state.licenses);
    const updateMinted = useStore((state) => state.updateMinted);
    const insert = useStore((state) => state.insert);
    const [visible, setVisible] = useState(false);
    const [dataPane, setDataPane] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        const connection = contract.connect(signer);
        const addr = connection.address;
        // const addr = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
        // console.log();
        contract.count().then(async (e) => {
            // console.log("count: ", e);
            let n = parseInt(e);
            updateMinted(n);
            let lnum, res;
            // console.log(lnum);
            for (let i = 0; i < n; i++) {
                lnum = await getLicenseNum(minted);

                res = await contract.returnToken(lnum);

                await res.wait();
                console.log("Res", res);
                // insert()
            }
        });
        // console.log("count", result);
    }, [updateMinted]);

    // useEffect(() => {}, [setLicenses]);

    return (
        <Card className="border-change mx-4 h-screen border-noround shadow-5 shine-border blur p-4">
            <div className="grid gap-5">
                <div
                    className="col-3 card h-14rem border-change"
                    onClick={() => setVisible(true)}
                >
                    <div className="flex align-items-center justify-content-center h-full">
                        <Button
                            icon="pi pi-plus text-white text-4xl"
                            className="p-button-rounded p-button-text"
                            aria-label="Submit"
                        />
                    </div>
                </div>
                {licenses.map((i, idx) => {
                    console.log(":::", i);
                    return (
                        <div
                            key={idx}
                            className="col-3 h-14rem card border-change"
                            onClick={() => {
                                setDataPane(true);
                                setData(i);
                            }}
                        >
                            <div className="flex align-items-center justify-content-center h-full">
                                <img
                                    src={i.nftUrl}
                                    className="w-full h-full fit border-change"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <EntryDialog visible={visible} setVisible={setVisible} />
            <DataDialog
                formState={data}
                visible={dataPane}
                setVisible={setDataPane}
            />
        </Card>
    );
};

const EntryDialog = ({ visible, setVisible }) => {
    return (
        <Dialog
            header="New Patent Application 🚀🚀🚀"
            className="blur2 border-change shine-border"
            visible={visible}
            maximizable
            style={{ width: "60vw" }}
            onHide={() => setVisible(false)}
        >
            <Form />
        </Dialog>
    );
};

export default Dashboard;
