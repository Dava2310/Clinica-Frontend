import { useState } from "react";

const useModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const open = () => setOpenModal(true);
  const close = () => setOpenModal(false);

  return { openModal, open, close };
};

export default useModal;
