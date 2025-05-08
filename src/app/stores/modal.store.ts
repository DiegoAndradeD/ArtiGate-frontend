import { create } from "zustand";
// Enums
import { Modal } from "../enums/Modal";

type ModalState = Record<Modal, boolean>;

interface ModalActions {
  toggleModal: (modal: Modal) => void;
}

const initialModalStoreState: ModalState = Object.values(Modal).reduce(
  (acc, modal) => {
    acc[modal] = false;
    return acc;
  },
  {} as ModalState
);

const useModalStore = create<ModalState & ModalActions>()((set) => ({
  ...initialModalStoreState,
  toggleModal: (modal) =>
    set((state) => ({
      ...state,
      [modal]: !state[modal],
    })),
}));

export default useModalStore;
