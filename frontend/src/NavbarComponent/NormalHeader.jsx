import { Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";

const NormalHeader = () => {
  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link to="/user/customer/register" className="nav-link text-success fw-bold">
          <FaUserPlus className="me-2" /> Register Customer
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/login" className="nav-link text-success fw-bold">
          <FaSignInAlt className="me-2" /> Login
        </Link>
      </li>
    </ul>
  );
};

export default NormalHeader;
