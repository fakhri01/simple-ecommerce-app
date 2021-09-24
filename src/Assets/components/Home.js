import { useState, useEffect } from "react";
import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";
import ReactLoading from "react-loading";
import Product from "./Product";

const Home = () => {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [popUp, setPopUp] = useState();
  const [modalItem, setModaltem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  let isModalOpen = false;

  const fetchItems = async () => {
    await fetch("https://fakestoreapi.com/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setItems(data);
      })
      .catch((err) => {
        console.log(err, " error");
      });
  };

  const addToCartHandler = (item, qnty = 1) => {
    const productExist = cart.find((items) => items.id === item.id);

    if (!productExist) {
      setCart([...cart, { ...item, quantity: qnty }]);
      showNotification("Success", "Product added to the cart.", "success");
    } else {
      showNotification("Warning", "Product already exist in cart.", "warning");
    }
  };

  const categoryHandler = (e) => {
    setFilter(e.target.value);
  };

  const getModalData = (item) => {
    setModaltem(item);
  };

  const openModal = () => {
    isModalOpen = true;
    setPopUp(isModalOpen);
  };

  const closeModal = (val) => {
    isModalOpen = val;
    setPopUp(isModalOpen);
  };

  const showNotification = (ttl, msg, typ) => {
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

  const addNewProduct = (product) => {
    setItems([...items, product]);
  };

  return (
    <>
      <Header
        cart={cart}
        productsLength={items.length}
        addNewProduct={addNewProduct}
      />
      <ReactNotification />
      <main>
        <Modal
          modalItem={modalItem}
          closeModal={closeModal}
          display={popUp}
          addToCartHandler={addToCartHandler}
        />
        <div className="product-wrapper">
          <select className="product-category" onChange={categoryHandler}>
            <option value="Default" disabled>
              Change category
            </option>
            <option value="all">all</option>
            <option value="men's clothing">Mens Casualwear</option>
            <option value="women's clothing">Womens Casualwear</option>
            <option value="jewelery">Jewellery</option>
            <option value="electronics">Electronics</option>
          </select>
          <div className="products">
            {isLoading ? (
              <ReactLoading color={"white"} height={"10%"} width={"10%"} />
            ) : (
              items
                .filter((val) => {
                  if (filter === "men's clothing") {
                    return val.category === filter;
                  } else if (filter === "women's clothing") {
                    return val.category === filter;
                  } else if (filter === "jewelery") {
                    return val.category === filter;
                  } else if (filter === "electronics") {
                    return val.category === filter;
                  } else {
                    return val;
                  }
                })
                .reverse()
                .map((item) => (
                  <Product
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    item={item}
                    openModal={openModal}
                    getModalData={getModalData}
                    addToCartHandler={addToCartHandler}
                  />
                ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
