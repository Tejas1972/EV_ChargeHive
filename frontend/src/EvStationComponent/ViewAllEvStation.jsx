import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ViewAllEvStation = () => {
  const [allGround, setAllGround] = useState([]);

  useEffect(() => {
    const getAllGround = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/ground/fetch");
        setAllGround(response.data.grounds || []);
      } catch (error) {
        console.error("Error fetching EV stations:", error);
      }
    };
    getAllGround();
  }, []);

  const deleteGround = async (groundId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/ground/delete?groundId=${groundId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.responseMessage, { position: "top-center", autoClose: 1000 });
        setAllGround(allGround.filter((ground) => ground.id !== groundId));
      } else {
        toast.error("Failed to delete the EV station", { position: "top-center", autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error deleting EV station:", error);
      toast.error("It seems the server is down", { position: "top-center", autoClose: 1000 });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#d4edda", width: "100vw", padding: "40px" }}>
      <div className="container" style={{ maxWidth: "90%" }}>
        <div className="card p-5 shadow-lg" style={{ backgroundColor: "#ffffff", borderRadius: "15px" }}>
          <div className="card-header text-center" style={{ backgroundColor: "#28a745", color: "white", borderRadius: "15px 15px 0 0" }}>
            <h2>All EV Stations</h2>
          </div>
          <div className="card-body" style={{ overflowY: "auto", maxHeight: "700px" }}>
            <div className="table-responsive">
              <table className="table table-hover text-center">
                <thead className="table-bordered bg-success text-white">
                  <tr>
                    <th>EV Station Name</th>
                    <th>Address</th>
                    <th>Charging Points</th>
                    <th>Charging Speed</th>
                    <th>Charger Type</th>
                    <th>Pincode</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allGround.map((ground) => (
                    <tr key={ground.id}>
                      <td><b>{ground.name}</b></td>
                      <td><b>{ground.description}</b></td>
                      <td><b>{ground.chargingPoints}</b></td>
                      <td><b>{ground.chargingSpeed}</b></td>
                      <td><b>{ground.chargerType}</b></td>
                      <td><b>{ground.pincode}</b></td>
                      <td><b>{ground.price}</b></td>
                      <td>
                        <button onClick={() => deleteGround(ground.id)} className="btn btn-sm btn-danger">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllEvStation;
