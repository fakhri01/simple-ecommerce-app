import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";

const DetailHeader = () => {
  return (
    <div className="details-header">
      <Link to="/">
        <button className="back-to-shop">
          <i className="fa fa-chevron-left"></i>
          <p>Back To Shop</p>
        </button>
      </Link>
    </div>
  );
};

export default DetailHeader;
