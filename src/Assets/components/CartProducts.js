import { useEffect } from "react";

const CartProducts = ({
  name,
  price,
  image,
  removeFromCart,
  id,
  quantity,
  getSubTotalValue,
}) => {
  useEffect(() => {
    getSubTotalValue();
  }, [getSubTotalValue]);

  const amount = price * quantity;

  return (
    <div className="cart-prducts-wrapper">
      <ul>
        <li>
          <button
            onClick={() => {
              removeFromCart(id);
            }}
          >
            <i className="fa fa-remove"></i>
          </button>
        </li>
        <li>
          <div className="cart-products-img">
            <img src={image} alt={name} />
          </div>
        </li>
        <li className="cart-products-name">{name}</li>
        <li className="cart-products-price">${price}</li>
        <li className="cart-products-quantity">{quantity}</li>
        <li className="cart-products-price">${amount.toFixed(2)}</li>
      </ul>
    </div>
  );
};
export default CartProducts;
