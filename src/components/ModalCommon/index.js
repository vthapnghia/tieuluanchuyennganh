import { t } from "i18next";
import { Modal } from "react-bootstrap";
import Button from "../Button";
import "./ModalCommon.scss";

function ModalCommon({
  show,
  modalTitle,
  modalBody,
  isButton,
  handleConfirm,
  labelButton,
  handleCloseModal,
  className,
  size,
  disabled = false,
  ...props
}) {
  return (
    <Modal
      show={show}
      animation={true}
      className={`${className ? className : ""}`}
      // onHide={handleCloseModal}
      size={size}
    >
      <div className="modal-content">
        <h3>{modalTitle}</h3>
        <div className="body">{modalBody && <div>{modalBody}</div>}</div>
        <div className="modal-btn">
          {isButton && (
            <Button className="primary" onClick={handleConfirm}>
              {labelButton ? labelButton : t("confirm")}
            </Button>
          )}
        </div>
      </div>
      {!disabled && <div className="close-btn" onClick={handleCloseModal}>
        x
      </div>}
    </Modal>
  );
}

export default ModalCommon;
