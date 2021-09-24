import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../css/App.css";
import { useState } from "react";

const Header = ({ cart, addNewProduct, productsLength }) => {
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [newItemPrice, setNewItemPrice] = useState(0);
  const [newItemImage, setNewItemImage] = useState("");
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const newItem = {
    id: productsLength + 1,
    title: newItemTitle,
    description: newItemDesc,
    category: newItemCategory,
    price: newItemPrice,
    image: newItemImage,
  };

  const navStyle = {
    left: isSideNavOpen ? "0" : "-600px",
  };

  const handleEmptyInput = (ttl, msg, typ) => {
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
        pauseOnHover: true,
      },
    });
  };

  return (
    <header>
      <ReactNotification />
      <button
        onClick={() => setIsSideNavOpen(true)}
        className="open-side-navbar"
      >
        <i className="fa fa-plus"></i>
      </button>
      <nav style={navStyle}>
        <button
          onClick={() => setIsSideNavOpen(false)}
          className="close-side-nav"
        >
          <i className="fa fa-remove"></i>
        </button>
        <div>
          <img src={logo} alt="Lorem Ipsum" />
        </div>
        <ul>
          <li>Add Product</li>
          <li>
            <input
              type="text"
              onChange={(e) => setNewItemTitle(e.target.value)}
              placeholder="Title"
            />
          </li>
          <li>
            <textarea
              onChange={(e) => setNewItemDesc(e.target.value)}
              rows="10"
              placeholder="Description"
            ></textarea>
          </li>
          <li>
            <select className="product-category">
              <option disabled>Add category</option>
              <option onClick={(e) => setNewItemCategory(e.target.value)}>
                Men's Casualwear
              </option>
              <option onClick={(e) => setNewItemCategory(e.target.value)}>
                Women's Casualwear
              </option>
              <option onClick={(e) => setNewItemCategory(e.target.value)}>
                Jewelery
              </option>
              <option onClick={(e) => setNewItemCategory(e.target.value)}>
                Electronics
              </option>
            </select>
          </li>
          <li>
            <input
              onChange={(e) => setNewItemPrice(e.target.value)}
              type="number"
              placeholder="Price"
            />
          </li>
          <li>
            <input
              onChange={(e) => setNewItemImage(e.target.value)}
              type="text"
              placeholder="Image URL"
            />
          </li>
          <li>
            <button
              onClick={() => {
                if (
                  newItem.title !== "" &&
                  newItem.description !== "" &&
                  newItem.category !== null &&
                  newItem.price !== "" &&
                  newItem.image !== ""
                ) {
                  addNewProduct(newItem);
                  handleEmptyInput(
                    "Success",
                    "Product added to the product list!",
                    "success"
                  );
                } else {
                  handleEmptyInput(
                    "Warning",
                    "Please fill empty areas!",
                    "warning"
                  );
                }
              }}
            >
              Add new product
            </button>
          </li>
        </ul>
      </nav>
      <div className="logo">
        <img src={logo} alt="Lorem Ipsum" />
      </div>

      <div className="cart">
        <Link
          to={{
            pathname: "/cart",
            state: {
              cart,
            },
          }}
        >
          <i className="fa fa-shopping-cart">
            <sup>
              <sup>{cart.length}</sup>
            </sup>
          </i>
        </Link>
      </div>
    </header>
  );
};
export default Header;
