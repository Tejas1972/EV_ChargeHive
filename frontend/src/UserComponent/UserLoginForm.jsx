import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const loginAction = (e) => {
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          console.log(res);

          if (res.success) {
            console.log("Got the success response");

            if (res.jwtToken !== null) {
              console.log("JWT TOKEN not null, positive response");
              if (res.user.role === "admin") {
                sessionStorage.setItem(
                  "active-admin",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("admin-jwtToken", res.user.jwtToken);
              } else if (res.user.role === "customer") {
                sessionStorage.setItem(
                  "active-customer",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("customer-jwtToken", res.user.jwtToken);
              }
            }

            if (res.jwtToken !== null) {
              toast.success(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {
                window.location.href = "/home";
              }, 2000);
            } else {
              toast.error(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          } else {
            console.log("Didn't got success response");
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    e.preventDefault();
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#d4edda" }}>
      <div className="container d-flex justify-content-center" style={{ maxWidth: "80%" }}>
        <div className="card p-5 shadow-lg" style={{ backgroundColor: "#ffffff", borderRadius: "15px", width: "50rem" }}>
          <div className="card-header text-center" style={{ backgroundColor: "#ffffff", color: "#28a745", borderRadius: "15px 15px 0 0" }}>
            <h5>User Login</h5>
          </div>
          <div className="card-body">
            <form onSubmit={loginAction}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-success"><b>User Role</b></label>
                  <select className="form-control" name="role" onChange={handleUserInput} value={loginRequest.role}>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label text-success"><b>Email Id</b></label>
                  <input type="email" className="form-control" name="emailId" onChange={handleUserInput} value={loginRequest.emailId} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label text-success"><b>Password</b></label>
                  <input type="password" className="form-control" name="password" onChange={handleUserInput} value={loginRequest.password} autoComplete="on" />
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn w-100" style={{ backgroundColor: "#28a745", color: "white" }}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLoginForm;
