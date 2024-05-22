import { PiTrashFill } from "react-icons/pi";
import styles from "./styles.module.css";
import Button from "../Button";

type DeleteModalProps = {
  onDelete: () => void;
  name: string;
  message?: string;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ onDelete, name, message }) => {
  message = message || `Are you sure want to delete ${name}?`;
  return (
    <div className={styles.delete_modal}>
      <div className={styles.delete_icon}>
        <PiTrashFill size={52} color="red" />
      </div>
      <h3 className={styles.delete_title}>Confirm Delete</h3>
      <p className={styles.delete_message}>
        {message}?
      </p>
      <div className={styles.delete_button}>
        <Button content="Delete" variant="danger" onClick={onDelete} />
      </div>
    </div>
  );
};

export default DeleteModal;
