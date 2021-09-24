import React, { useState } from "react";
import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import DetailHeader from "./DetailHeader";
import Footer from "./Footer";
import CartProducts from "./CartProducts";
import { useLocation } from "react-router-dom";
import CheckOut from "./CheckOut";
import Success from "./Success";

const Cart = () => {
  const location = useLocation();
  const { cart } = location.state;
  const [newCart, setNewCart] = useState(cart);
  const [subTotal, setSubTotal] = useState(0);
  const [checked, setChecked] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const [success, setSuccess] = useState(false);

  const getSubTotalValue = () => {
    const getTotalVal = newCart.reduce((a, c) => a + c.price * c.quantity, 0);
    setSubTotal(getTotalVal);
  };

  const removeFromCart = (product) => {
    const newItems = newCart.filter((item) => item.id !== product);
    setNewCart(newItems);
    notification("Warning", "Product removed from cart!", "danger");
  };

  const notification = (ttl, msg, typ) => {
    store.addNotification({
      title: ttl,
      message: msg,
      type: typ,
      insert: "bottom",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: false,
      },
    });
  };

  const checkOutOpen = () => {
    setCheckOut(true);
  };
  const checkOutClose = (val) => {
    setCheckOut(val);
  };

  const successHandler = () => {
    setSuccess(true)
  }

  return (
    <div>
      <Success success={success} />
      <ReactNotification />
      <DetailHeader />
      <section className="cart-details">
        <div className="selected-cart-items">
          <ul className="selected-item-detail">
            <li>Product</li>
            <li>Price</li>
            <li>Quantity</li>
            <li>Total</li>
          </ul>
          <section className="cart-products">
            {newCart.length === 0 && (
              <center>
                <br /> Cart is empty
              </center>
            )}
            {newCart.map((cartItems) => (
              <CartProducts
                id={cartItems.id}
                key={cartItems.id}
                name={cartItems.title}
                price={cartItems.price}
                image={cartItems.image}
                quantity={cartItems.quantity}
                removeFromCart={removeFromCart}
                getSubTotalValue={getSubTotalValue}
              />
            ))}
          </section>
        </div>
        <div className="cart-totals">
          <p className="cart-total-title">CART TOTALS</p>
          <ul>
            <li>
              <p className="cart-total-subtitle">Subtotal</p>
              <p className="cart-total-secondary-subtitle">
                ${newCart.length > 0 ? subTotal.toFixed(2) : 0}
              </p>
            </li>
            <li>
              <p className="cart-total-subtitle">Shipping</p>
              <div>
                <input
                  id="free"
                  type="checkbox"
                  onChange={() => {
                    setChecked(false);
                  }}
                  checked={!checked && "checked"}
                />
                <label className="cart-total-secondary-subtitle" htmlFor="free">
                  Standart(Free)
                </label>
                <br />
                <input
                  id="express"
                  type="checkbox"
                  onChange={() => {
                    setChecked(true);
                  }}
                  checked={checked && "checked"}
                />
                <label
                  className="cart-total-secondary-subtitle"
                  htmlFor="express"
                >
                  Express($150)
                </label>
              </div>
            </li>
            <li>
              <p className="cart-total-subtitle">Total</p>
              <p className="cart-total-payment">
                $
                {newCart.length > 0
                  ? checked
                    ? (subTotal + 150).toFixed(2)
                    : subTotal.toFixed(2)
                  : 0}
              </p>
            </li>
          </ul>
          <button
            onClick={() => {
              newCart.length > 0
                ? checkOutOpen()
                : notification(
                    "Warning",
                    "There is nothing in cart to proceed",
                    "warning"
                  );
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </section>
      <CheckOut
        checkOutClose={checkOutClose}
        checkOut={checkOut}
        notification={notification}
        successHandler={successHandler}
      />
      <Footer />
    </div>
  );
};

export default Cart;
