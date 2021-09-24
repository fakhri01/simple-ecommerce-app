import React from "react";

const Product = ({id, title, image, price, item, openModal, getModalData, addToCartHandler}) => {
  return (
    <div className="product-item">
      <div className="product-image">
        <img src={image} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{price}$</p>
      <div className="product-item-footer">
        <button
          onClick={() => {
            openModal(id);
            getModalData(item);
          }}
          className="see-product-details"
        >
          Quick View
        </button>
        <button onClick={() => addToCartHandler(item)} className="add-to-cart">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
