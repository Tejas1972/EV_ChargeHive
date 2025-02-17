import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../images/admin-bg.png";

const MyWallet = () => {
  let navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const [walletAmount, setWalletAmount] = useState(user.walletAmount);

  const [walletRequest, setWalletRequest] = useState({
    userId: user.id,
    walletAmount: "",
  });

  const handleInput = (e) => {
    setWalletRequest({ ...walletRequest, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getMyWallet = async () => {
      const myWallet = await retrieveMyWallet();
      if (myWallet) {
        setWalletAmount(myWallet);
      }
    };
    getMyWallet();
  }, []);

  const retrieveMyWallet = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/user/customer/wallet/fetch?userId=${user.id}`
    );
    return response.data;
  };

  const addMoneyInWallet = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/user/add/wallet/money", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(walletRequest),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, { position: "top-center", autoClose: 1000 });
          setTimeout(() => window.location.reload(true), 1000);
        } else {
          toast.error("Server error, try again", { position: "top-center", autoClose: 1000 });
        }
      })
      .catch(() => {
        toast.error("Server error, try again", { position: "top-center", autoClose: 1000 });
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: `url(${backgroundImage}) no-repeat center center/cover` }}>
      <div className="container d-flex justify-content-center" style={{ maxWidth: "80%" }}>
        <div className="card p-5 shadow-lg" style={{ backgroundColor: "#ffffff", borderRadius: "15px", width: "50rem" }}>
          <div className="card-header text-center" style={{ backgroundColor: "#ffffff", color: "#28a745", borderRadius: "15px 15px 0 0" }}>
            <h5>My Wallet</h5>
          </div>
          <div className="card-body">
            <h4 className="text-center text-success">Account Balance: Rs {walletAmount}</h4>
            <hr />
            <form onSubmit={addMoneyInWallet}>
              <div className="mb-3">
                <label className="form-label text-success"><b>Amount</b></label>
                <input
                  type="text"
                  className="form-control"
                  name="walletAmount"
                  onChange={handleInput}
                  value={walletRequest.walletAmount}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn w-100" style={{ backgroundColor: "#28a745", color: "white" }}>Add Money</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyWallet;
