import { Link } from "react-router-dom";
import logo from "../images/e_logo.png";
import RoleNav from "./RoleNav";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container-fluid">
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <img src={logo} width="80" height="50" alt="Logo" className="me-2" />
          <span className="fs-4 fw-bold text-success">ChargeHive</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/about" className="nav-link text-success fw-bold px-3 hover-effect">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-success fw-bold px-3 hover-effect">
                Contact Us
              </Link>
            </li>
          </ul>
          <RoleNav />
        </div>
      </div>
    </nav>
  );
};

export default Header;
