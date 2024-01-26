import { SafeListing } from "@/types";
import { list } from "postcss";
import { create } from "zustand";

interface EditRentModalStore {
  isOpen: boolean;
  listing?: SafeListing;
  onOpen: () => void;
  onClose: () => void;
  setListing: (listing: SafeListing) => void;
}

const useEditRentModal = create<EditRentModalStore>((set) => ({
  isOpen: false,

  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, listing: undefined }),

  setListing: (listing) => set({ listing: listing }),
}));

export default useEditRentModal;
