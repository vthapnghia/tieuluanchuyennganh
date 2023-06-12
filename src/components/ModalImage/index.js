import { Modal } from "react-bootstrap";
import "./ModalImage.scss";

function ModalImage({
  show,
  image,
  handleCloseModal,
  className,
  size,
  ...props
}) {
  return (
    <Modal
      show={show}
      animation={true}
      className={`${className && className} modal-image`}
      // onHide={handleCloseModal}
      size={size}
    >
      <img src={image} alt="" />
      <div className="close-btn" onClick={handleCloseModal}>
        x
      </div>
    </Modal>
  );
}

export default ModalImage;
