import { create } from "zustand";

const useStore = create((set) => ({
    licenses: [],
    minted: 0,
    // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 }),
    incrementMinted: () =>
        set((state) => ({
            licenses: state.licenses,
            minted: state.minted + 1,
        })),
    updateMinted: (i) =>
        set((state) => ({ licenses: state.licenses, minted: i })),
    insert: (
        title,
        authorName,
        abstract,
        bg,
        des,
        claims,
        nftUrl,
        licenseUrl,
        drawings,
        drawingUrls
    ) =>
        set((state) => ({
            licenses: [
                ...state.licenses,
                {
                    title,
                    authorName,
                    abstract,
                    bg,
                    des,
                    claims,
                    nftUrl,
                    licenseUrl,
                    drawings,
                    drawingUrls,
                },
            ],
        })),
}));
export default useStore;
