import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEvStationForm = () => {
  let navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [ground, setGround] = useState({
    name: "",
    description: "",
    chargingPoints: "",
    chargingSpeed: "",
    chargerType: "",
    price: "",
    pincode: "",
  });

  const handleInput = (e) => {
    setGround({ ...ground, [e.target.name]: e.target.value });
  };

  const saveGround = () => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    Object.keys(ground).forEach((key) => {
      formData.append(key, ground[key]);
    });

    axios.post("http://localhost:8080/api/ground/add", formData)
      .then(() => {
        toast.success("EV Station added successfully!", { position: "top-center", autoClose: 2000 });
        setTimeout(() => navigate("/home"), 3000);
      })
      .catch(() => {
        toast.error("Server error. Please try again later.", { position: "top-center", autoClose: 2000 });
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#d4edda", marginTop: "-50px" }}>
      <div className="container d-flex justify-content-center" style={{ maxWidth: "80%" }}>
        <div className="card p-5 shadow-lg" style={{ backgroundColor: "#ffffff", border: "2px solid #ffffff", borderRadius: "15px", width: "50rem" }}>
          <div className="card-header text-center" style={{ backgroundColor: "#ffffff", color: "#28a745", borderRadius: "15px 15px 0 0" }}>
            <h5 className="card-title">Add EV Station</h5>
          </div>
          <div className="card-body">
            <form onSubmit={saveGround}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-success"><b>EV Station Name</b></label>
                  <input type="text" className="form-control" name="name" onChange={handleInput} value={ground.name} />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-success"><b>Charging Points</b></label>
                  <input type="number" className="form-control" name="chargingPoints" onChange={handleInput} value={ground.chargingPoints} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-success"><b>Charging Speed</b></label>
                  <input type="number" className="form-control" name="chargingSpeed" onChange={handleInput} value={ground.chargingSpeed} />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-success"><b>Pincode</b></label>
                  <input type="number" className="form-control" name="pincode" onChange={handleInput} value={ground.pincode} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label text-success"><b>EV Station Address</b></label>
                  <textarea className="form-control" name="description" rows="3" onChange={handleInput} value={ground.description} />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-success"><b>Price</b></label>
                  <input type="number" className="form-control" name="price" onChange={handleInput} value={ground.price} />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label text-success"><b>Charger Type</b></label>
                <select className="form-control" name="chargerType" onChange={handleInput} value={ground.chargerType}>
                  <option value="">Select Charger Type</option>
                  <option value="Fast Charging">Fast Charging</option>
                  <option value="Normal Charging">Normal Charging</option>
                  <option value="Wireless Charging">Wireless Charging</option>
                  <option value="USB Type-C">USB Type-C</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label text-success"><b>Select EV Station Image</b></label>
                <input className="form-control" type="file" onChange={(e) => setSelectedImage(e.target.files[0])} />
              </div>
              <div className="text-center">
                <button type="submit" className="btn w-100" style={{ backgroundColor: "#28a745", color: "white" }}>
                  Add EV Station
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

export default AddEvStationForm;
