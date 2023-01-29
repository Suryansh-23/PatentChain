/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");

module.exports = {
    // defaultNetwork: "matic",
    solidity: "0.8.17",
    // networks: {
    //     hardhat: {},
    //     matic: {
    //         url: "https://rpc-mumbai.maticvigil.com",
    //         accounts: [
    //             "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    //         ],
    //     },
    // },
    gas: 2100000,
    gasPrice: 8000000000,
    paths: {
        artifacts: "./src/artifacts",
    },
};

