import { PiX } from "react-icons/pi";
import { type ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  width?: string;
  children: ReactNode;
};

const Modal = ({ open, onClose, width = "1/2", children }: ModalProps) => {
  const modalRoot = document.getElementById("modal")!;
  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div>
        <div
          onClick={onClose}
          className={`${styles.modal_base} ${
            open ? "visible bg-black/20" : "invisible"
          }`}
        >
          {/* modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${styles.modal_body} w-[80%] md:w-${width} 
            ${
              open
                ? "scale-100 scale-x-100 md:scale-100  opacity-100"
                : "scale-125 opacity-0"
            }
      `}
          >
            <button onClick={onClose} className={styles.close_button}>
              <PiX />
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
