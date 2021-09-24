import { Link } from "react-router-dom";
import SuccessImage from "../images/check.png";

function Success({ success }) {

    let showSuccess = success ? "layer show-layer": "layer";

    return (
    <div className={showSuccess}>
      <div className="success">
        <img src={SuccessImage} alt="Success" />
        <h3>Your order is complete!</h3>
        <p>You will be receiving an email with order details.</p>
        <Link to="/">Go Home Page</Link>
      </div>
    </div>
  );
}

export default Success;
