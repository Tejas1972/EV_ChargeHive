import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus, FaList, FaUsers, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));

  const adminLogout = () => {
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("admin-jwtToken");
    navigate("/home");
    window.location.reload(true);
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link to="admin/evstation/add" className="nav-link text-success fw-bold">
          <FaPlus className="me-2" /> Add EV Station
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/evstation/all" className="nav-link text-success fw-bold">
          <FaList className="me-2" /> View All EV Stations
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/customer/all" className="nav-link text-success fw-bold">
          <FaUsers className="me-2" /> View All Customers
        </Link>
      </li>

      <li className="nav-item">
        <Link to="user/evstation/booking/all" className="nav-link text-success fw-bold">
          <FaClipboardList className="me-2" /> View All Bookings
        </Link>
      </li>

      <li className="nav-item">
        <Link to="" className="nav-link text-danger fw-bold" onClick={adminLogout}>
          <FaSignOutAlt className="me-2" /> Logout
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default AdminHeader;
