import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ethers } from "ethers";

const NavBarCommonContent = () => {
    const [balance, setBalance] = useState();

    useEffect(() => {
        getBalance();
    });

    const getBalance = async () => {
        const [account] = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
    };

    return (
        <div className="p-2 px-4 flex flex-row">
            <div className="flex align-items-center">
                {/* <div className="border-2 w-3rem h-3rem bg-white border-round" /> */}
                <img src="logo.png" className="w-2rem h-2rem" />
                <h1 className="text-4xl px-2 my-2 shine-text font-bold">
                    PatentChain
                </h1>
            </div>

            <div className="flex align-items-center column-gap-3 ml-auto">
                <div className="flex py-1 hover border-round-2xl align-items-center">
                    <h1 className="text-3xl px-2 my-2 shine-text font-bold">
                        About Us
                    </h1>
                </div>

                <div className="flex py-1 hover border-round-2xl align-items-center">
                    <h1 className="text-3xl px-2 my-2 shine-text font-bold">
                        Product
                    </h1>
                </div>

                <div className="flex py-1 hover border-round-2xl align-items-center">
                    <h1 className="text-3xl px-2 my-2 shine-text font-bold">
                        Contact Us
                    </h1>
                </div>

                <div className="flex align-items-center">
                    <h1 className="text-3xl px-2 my-2 shine-text font-bold"></h1>
                    <Button
                        label={balance ? "Logged In" : "Login"}
                        className="p-button-raised p-button-outlined text-2xl shine-text font-bold"
                        onClick={() => getBalance()}
                    />
                </div>
            </div>
        </div>
    );
};

const NavBar = () => {
    return (
        <div
            className="flex flex-column align-items-center w-screen"
            style={{ zIndex: 10 }}
        >
            <Card className="mx-2 w-screen border-noround shadow-5 shine-border">
                <NavBarCommonContent />

                {/* <i
                            className="pi pi-bars text-3xl ml-auto text-white font-bold"
                            // onClick={() => {
                            //     setShowMenu(!showMenu);
                            // }}
                        /> */}
            </Card>
        </div>
    );
};

export default NavBar;
