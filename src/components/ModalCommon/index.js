import { t } from "i18next";
import { Modal } from "react-bootstrap";
import Button from "../Button";
import "./ModalCommon.scss";

function ModalCommon({
  show,
  modalTitle,
  modalBody,
  isButton,
  handleClose,
  labelButton,
  ...props
}) {
  return (
    <Modal show={show} animation={true}>
      <div className="modal-content">
        <h3>{modalTitle}</h3>
        <div className="body">{modalBody && <div>{modalBody}</div>}</div>
        <div className="modal-btn">
          {isButton && (
            <Button className="primary" onClick={handleClose}>
              {labelButton ? labelButton : t("confirm")}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ModalCommon;
