import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { useRef, useState, useEffect } from "react";
import { genLicense } from "./generateLicense";
import useStore from "./State";

// const uploadToBlockchain = () => {};

const Form = () => {
    const insert = useStore((state) => state.insert);
    const minted = useStore((state) => state.minted);
    const incrementMinted = useStore((state) => state.incrementMinted);
    const [formState, setFormState] = useState({
        title: "",
        authorName: "",
        abstract: "",
        bg: "",
        des: "",
        claims: "",
        nftUrl: "",
        licenseUrl: {},
        drawings: [],
        drawingUrls: [],
    });
    // const toast = useRef();

    return (
        <div className="flex flex-column gap-2">
            <div>
                <label
                    htmlFor="title"
                    className="block text-900 font-medium mb-2 text-xl"
                >
                    Title for the <span>Patent</span>
                </label>
                <InputText
                    id="title"
                    type="text"
                    placeholder="Title for the patent"
                    value={formState.title}
                    onChange={(e) =>
                        setFormState({ ...formState, title: e.target.value })
                    }
                    className="w-full mb-3 full-opacity"
                />
            </div>

            <div>
                <label
                    htmlFor="author"
                    className="block text-900 font-medium mb-2 text-xl"
                >
                    Author Name 🧑🏻‍🦱
                </label>
                <InputText
                    id="author"
                    type="text"
                    placeholder="Name of the Author"
                    value={formState.authorName}
                    onChange={(e) =>
                        setFormState({
                            ...formState,
                            authorName: e.target.value,
                        })
                    }
                    className="w-full mb-3"
                />
            </div>

            <div>
                <label
                    htmlFor="abstract"
                    className="block text-900 font-medium mb-2 text-xl"
                >
                    Abstract 🦄
                </label>
                <InputTextarea
                    id="abstract"
                    type="text"
                    placeholder="Abstract"
                    className="w-full mb-3"
                    rows={5}
                    value={formState.abstract}
                    onChange={(e) =>
                        setFormState({ ...formState, abstract: e.target.value })
                    }
                />
            </div>

            <div>
                <label
                    htmlFor="bg"
                    className="block text-900 font-medium mb-2 text-xl"
                >
                    Background of the Invention 🖼️
                </label>
                <InputTextarea
                    id="bg"
                    type="text"
                    placeholder="Background of the Invention"
                    className="w-full mb-3"
                    rows={5}
                    value={formState.bg}
                    onChange={(e) =>
                        setFormState({ ...formState, bg: e.target.value })
                    }
                />
            </div>

            <div>
                <label
                    htmlFor="detail"
                    className="block text-900 font-medium mb-2 text-xl"
                >
                    Detailed Description 💬
                </label>
                <InputTextarea
                    id="detail"
                    type="text"
                    placeholder="Detailed Description"
                    className="w-full mb-3"
                    rows={5}
                    value={formState.des}
                    onChange={(e) =>
                        setFormState({ ...formState, des: e.target.value })
                    }
                />
            </div>

            <div>
                <label
                    htmlFor="claims"
                    className="block text-900 font-medium mb-2 text-xl"
                >
                    Claims ‼️
                </label>
                <InputTextarea
                    id="claims"
                    type="text"
                    placeholder="Your Claims"
                    className="w-full mb-3"
                    rows={5}
                    value={formState.claims}
                    onChange={(e) =>
                        setFormState({ ...formState, claims: e.target.value })
                    }
                />
            </div>

            <div>
                <label
                    htmlFor="file"
                    className="block text-900 font-medium mb-2 text-xl"
                >
                    Drawings ✏️
                </label>
                {/* <Toast ref={toast}></Toast> */}
                <FileUpload
                    multiple
                    customUpload
                    id="file"
                    mode="basic"
                    name="demo[]"
                    accept="image/*"
                    maxFileSize={1000000}
                    uploadHandler={(e) => {
                        console.log(e);
                        setFormState({ ...formState, drawings: e.files });
                    }}
                    auto
                    chooseLabel="Browse"
                />
            </div>

            {/* <div className="flex align-items-center justify-content-between mb-6">
                <div className="flex align-items-center">
                    {/* <Checkbox
                        id="rememberme"
                        onChange={(e) => setChecked(e.checked)}
                        checked={checked}
                        className="mr-2"
                    /> 
                    <label htmlFor="rememberme">Remember me</label>
                </div>
                <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
                    Forgot your password?
                </a>
                </div>*/}
            <div className="mt-4">
                <Button
                    label="Send for Review"
                    icon="pi pi-bolt"
                    className="w-full"
                    onClick={async () => {
                        // const lnum = await getLicenseNum();
                        // console.log();
                        genLicense(
                            formState,
                            insert,
                            minted,
                            incrementMinted
                        ).then(() => {
                            console.log(formState);
                        });
                    }}
                />
            </div>
        </div>
    );
};

const DataDialog = ({ formState, visible, setVisible }) => {
    // console.log("$$$$", formState);
    return (
        <Dialog
            header="Previous Patent Application 🚀"
            className="blur2 border-change shine-border"
            visible={visible}
            maximizable
            style={{ width: "60vw" }}
            onHide={() => setVisible(false)}
        >
            <div className="flex flex-column gap-2">
                <div>
                    <img className="w-full fit" src={formState.nftUrl} alt="" />
                </div>
                <div>
                    <label
                        htmlFor="title"
                        className="block text-900 font-medium mb-2 text-xl"
                    >
                        Title for the <span>Patent</span>
                    </label>
                    <InputText
                        disabled
                        id="title"
                        type="text"
                        placeholder="Title for the patent"
                        value={formState.title}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                title: e.target.value,
                            })
                        }
                        className="w-full mb-3 full-opacity"
                    />
                </div>

                <div>
                    <label
                        htmlFor="author"
                        className="block text-900 font-medium mb-2 text-xl"
                    >
                        Author Name 🧑🏻‍🦱
                    </label>
                    <InputText
                        disabled
                        id="author"
                        type="text"
                        placeholder="Name of the Author"
                        value={formState.authorName}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                authorName: e.target.value,
                            })
                        }
                        className="w-full mb-3 full-opacity"
                    />
                </div>

                <div>
                    <label
                        htmlFor="abstract"
                        className="block text-900 font-medium mb-2 text-xl"
                    >
                        Abstract 🦄
                    </label>
                    <InputTextarea
                        disabled
                        id="abstract"
                        type="text"
                        placeholder="Abstract"
                        className="w-full mb-3 full-opacity"
                        rows={5}
                        value={formState.abstract}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                abstract: e.target.value,
                            })
                        }
                    />
                </div>

                <div>
                    <label
                        htmlFor="bg"
                        className="block text-900 font-medium mb-2 text-xl"
                    >
                        Background of the Invention 🖼️
                    </label>
                    <InputTextarea
                        disabled
                        id="bg"
                        type="text"
                        placeholder="Background of the Invention"
                        className="w-full mb-3 full-opacity"
                        rows={5}
                        value={formState.bg}
                        onChange={(e) =>
                            setFormState({ ...formState, bg: e.target.value })
                        }
                    />
                </div>

                <div>
                    <label
                        htmlFor="detail"
                        className="block text-900 font-medium mb-2 text-xl"
                    >
                        Detailed Description 💬
                    </label>
                    <InputTextarea
                        disabled
                        id="detail"
                        type="text"
                        placeholder="Detailed Description"
                        className="w-full mb-3 full-opacity"
                        rows={5}
                        value={formState.des}
                        onChange={(e) =>
                            setFormState({ ...formState, des: e.target.value })
                        }
                    />
                </div>

                <div>
                    <label
                        htmlFor="claims"
                        className="block text-900 font-medium mb-2 text-xl"
                    >
                        Claims ‼️
                    </label>
                    <InputTextarea
                        disabled
                        id="claims"
                        type="text"
                        placeholder="Your Claims"
                        className="w-full mb-3 full-opacity"
                        rows={5}
                        value={formState.claims}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                claims: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <label
                        htmlFor="drawings"
                        className="block text-900 font-medium mb-2 text-xl"
                    >
                        Drawings ✏️
                    </label>
                    <div className="flex flex-row overflow-x-scroll">
                        {formState.drawings &&
                            formState.drawings.map((i, idx) => {
                                return (
                                    <div key={idx}>
                                        <img
                                            className="w-15rem h-15rem"
                                            src={i.objectURL}
                                            alt=""
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export { Form, DataDialog };
