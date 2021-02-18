import Modal from "react-modal";
import styles from "@styles/components/Modal.module.scss";

export default function ModalView({ isOpen, setIsOpen, children, ...props }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} {...props}>
      {children}
    </Modal>
  );
}
