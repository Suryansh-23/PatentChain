const hre = require("hardhat");

async function main() {
    const LicenseToken = await hre.ethers.getContractFactory("LicenseToken");
    const lt = await LicenseToken.deploy();

    await lt.deployed();

    console.log("My NFT deployed to:", lt.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
