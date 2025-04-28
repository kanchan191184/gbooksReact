import classes from "./Modal.module.scss";

const Modal = ({ children, onClose }) => {
  return (
    <div className={classes.modalBackdrop}>
      <div
        className={classes.modalContent}
        // onClick={(e) => e.stopPropagation()}
      >
        <button className={classes.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
