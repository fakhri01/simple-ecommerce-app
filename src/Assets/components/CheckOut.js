import { useState } from "react/cjs/react.development";
import CardImage from "../images/sample1.jpg";

function CheckOut({ checkOutClose, checkOut, notification, successHandler }) {
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [expire, setExpire] = useState("");
  const [cvv, setCvv] = useState("");

  let toggle = checkOut ? "checkout show-checkout" : "checkout";

  const simpleValidation = () => {
    if (
      name.length > 0 &&
      num.length > 0 &&
      !isNaN(num) &&
      expire.length > 0 &&
      cvv.length > 0 &&
      cvv.length >= 3 &&
      !isNaN(cvv)
    ) {
        successHandler()
    } else {
      notification("Warning", "Please fill all area correctly!", "warning");
    }
  };

  return (
    <section className={toggle}>
      <div className="checkout-header">
        <i onClick={() => checkOutClose(false)} className="fa fa-remove"></i>
        <h3>Card Details</h3>
        <img src={CardImage} alt="Sample Card" />
      </div>
      <div className="card-info">
        <ul>
          <li>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name On Card"
            />
          </li>
          <li>
            <input
              onChange={(e) => setNum(e.target.value)}
              type="number"
              placeholder="Card Number"
            />
          </li>
          <li>
            <label htmlFor="ExDate">Expiration Date: </label>
            <input
              onChange={(e) => setExpire(e.target.value)}
              type="date"
              id="ExDate"
            />
          </li>
          <li>
            <input
              onChange={(e) => setCvv(e.target.value)}
              maxLength="3"
              placeholder="CVV"
              type="number"
              required="required"
            />
          </li>
        </ul>
        <button onClick={() => simpleValidation()}>Check Out</button>
      </div>
    </section>
  );
}

export default CheckOut;
