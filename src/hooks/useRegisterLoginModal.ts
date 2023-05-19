import { create } from "zustand";

interface RegisterLoginModalStore {
  isOpen: boolean;
  email: string;
  userState: string;
  onOpen: () => void;
  onClose: () => void;
  setEmail: (email: string) => void;
  setUserState: (userState: string) => void;
}

const useRegisterLoginModal = create<RegisterLoginModalStore>((set) => ({
  isOpen: false,
  email: "",
  userState: "",

  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, email: "", userState: "" }),

  setEmail: (email) => set({ email }),
  setUserState: (userState) => set({ userState }),
}));

export default useRegisterLoginModal;
