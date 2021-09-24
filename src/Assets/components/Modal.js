import { useState } from "react";

const Modal = ({ display, closeModal, modalItem, addToCartHandler }) => {
  let showModal = display ? "layer show-layer" : "layer";

  const [qnty, setQuantity] = useState(1);

  const incDecQuantity = (val) => {
    if (qnty > 1 && val === "minus") {
      setQuantity(qnty - 1);
    } else {
      setQuantity(qnty + 1);
    }
  };

  return (
    <div className={showModal}>
      <div className="modal">
        <button onClick={() => closeModal(false)}>
          <i className="fa fa-close close-modal-icon"></i>
        </button>
        <div className="modal-info-container">
          <div className="modal-image">
            <img src={modalItem.image} alt={modalItem.title} />
          </div>
          <div className="modal-detail">
            <h2 className="modal-title">{modalItem.title}</h2>
            <p className="modal-desc">
              Description: <span>{modalItem.description}</span>
            </p>
            <p className="modal-category">
              Category: <span>{modalItem.category}</span>
            </p>
            <p className="modal-price">
              Price: <span>{modalItem.price}$</span>
            </p>
            <span className="modal-qnty">Quantity: </span>
            <i
              onClick={() => {
                incDecQuantity("minus");
              }}
              className="fa fa-minus count-icon"
            ></i>
            <span className="modal-count">{qnty}</span>
            <i
              onClick={() => incDecQuantity("plus")}
              className="fa fa-plus count-icon"
            ></i>
            <br />
            <br />
            <button
              className="detail-add-to-cart-btn"
              onClick={() => {
                addToCartHandler(modalItem, qnty);
                setQuantity(1);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
