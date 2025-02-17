import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    age: "",
    sex: "",
  });

  const navigate = useNavigate();

  if (document.URL.indexOf("admin") !== -1) {
    user.role = "admin";
  } else if (document.URL.indexOf("customer") !== -1) {
    user.role = "customer";
  }

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [genders, setGenders] = useState([]);

  const retrieveAllGenders = async () => {
    const response = await axios.get("http://localhost:8080/api/user/gender");
    return response.data;
  };

  useEffect(() => {
    const getAllGenders = async () => {
      const allGenders = await retrieveAllGenders();
      if (allGenders) {
        setGenders(allGenders.genders);
      }
    };
    getAllGenders();
  }, []);

  const saveUser = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {
      result.json().then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
          });
          setTimeout(() => {
            navigate("/user/login");
          }, 1000);
        } else {
          toast.error("It seems server is down", {
            position: "top-center",
            autoClose: 1000,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 1000);
        }
      });
    });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#d4edda" }}
    >
      <div
        className="container d-flex justify-content-center"
        style={{ maxWidth: "80%" }}
      >
        <div
          className="card p-5 shadow-lg"
          style={{
            backgroundColor: "#ffffff",
            border: "2px solid #ffffff",
            borderRadius: "15px",
            width: "50rem",
          }}
        >
          <div
            className="card-header text-center"
            style={{
              backgroundColor: "#ffffff",
              color: "#28a745",
              borderRadius: "15px 15px 0 0",
            }}
          >
            <h5>Register {user.role}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-success">
                    <b>First Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    onChange={handleUserInput}
                    value={user.firstName}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-success">
                    <b>Last Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    onChange={handleUserInput}
                    value={user.lastName}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-success">
                    <b>Contact Number</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="contact"
                    onChange={handleUserInput}
                    value={user.contact}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-success">
                    <b>Age</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    onChange={handleUserInput}
                    value={user.age}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-success">
                    <b>Email Id</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="emailId"
                    onChange={handleUserInput}
                    value={user.emailId}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-success">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={handleUserInput}
                    value={user.password}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-success">
                    <b>Street</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="street"
                    onChange={handleUserInput}
                    value={user.street}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-success">
                    <b>City</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    onChange={handleUserInput}
                    value={user.city}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-success">
                    <b>Pincode</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="pincode"
                    onChange={handleUserInput}
                    value={user.pincode}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-success">
                    <b>Gender</b>
                  </label>
                  <select
                    className="form-control"
                    name="sex"
                    onChange={handleUserInput}
                    value={user.sex}
                  >
                    <option value="0">Select Sex</option>
                    {genders.map((gender, index) => (
                      <option key={index} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn w-100"
                  style={{ backgroundColor: "#28a745", color: "white" }}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserRegister;
