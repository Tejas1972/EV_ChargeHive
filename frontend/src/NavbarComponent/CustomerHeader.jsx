import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserCircle, FaHistory, FaSignOutAlt } from "react-icons/fa";

const CustomerHeader = () => {
  let navigate = useNavigate();

  const userLogout = () => {
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    sessionStorage.removeItem("active-customer");
    sessionStorage.removeItem("customer-jwtToken");
    navigate("/home");
    window.location.reload(true);
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link to="/customer/wallet" className="nav-link text-success fw-bold">
          <FaUserCircle className="me-2" /> My Account
        </Link>
      </li>

      <li className="nav-item">
        <Link to="user/evstation/bookings" className="nav-link text-success fw-bold">
          <FaHistory className="me-2" /> Booked Station
        </Link>
      </li>

      <li className="nav-item">
        <Link to="" className="nav-link text-danger fw-bold" onClick={userLogout}>
          <FaSignOutAlt className="me-2" /> Logout
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default CustomerHeader;
