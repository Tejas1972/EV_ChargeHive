import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroundCard from "./GroundCard";
import GetReviews from "../ReviewComponent/GetReviews";
import backgroundImage from "../images/admin-bg.png";

const EvStation = () => {
  const { groundId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const [timeSlots, setTimeSlots] = useState([]);
  const [grounds, setGrounds] = useState([]);
  const [ground, setGround] = useState({});
  const [booking, setBooking] = useState({ userId: user?.id || "", groundId, date: "", timeSlot: "" });

  const handleBookingInput = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groundResponse = await axios.get(`http://localhost:8080/api/ground/id?groundId=${groundId}`);
        setGround(groundResponse.data.grounds[0]);
        const slotsResponse = await axios.get("http://localhost:8080/api/book/ground/fetch/slots");
        setTimeSlots(slotsResponse.data);
        const groundsResponse = await axios.get("http://localhost:8080/api/ground/fetch");
        setGrounds(groundsResponse.data.grounds);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [groundId]);

  const bookGround = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/book/ground/", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, { autoClose: 1000 });
          setTimeout(() => navigate("/user/evstation/bookings"), 1000);
        } else {
          toast.error("Server error, try again", { autoClose: 1000 });
        }
      })
      .catch(() => toast.error("Server error, try again", { autoClose: 1000 }));
  };

  return (
    <div className="container-fluid mb-5">
      <div className="row d-flex justify-content-center">
        {/* Centered Main Card */}
        <div className="col-sm-5 mt-2 d-flex justify-content-center">
          <div className="card p-4 shadow-lg bg-white rounded-xl w-100">
            <div className="card-header text-green-900 text-center font-bold text-xl">
              <h3>{ground.name}</h3>
            </div>
            <div className="card-body text-green-900">
              <h5 className="text-lg font-bold">EV Station Address:</h5>
              <p className="text-sm">{ground.description}</p>
              <div className="text-green-900 text-md font-semibold">
                <p>Charging Points: {ground.chargingPoints}</p>
                <p>Charging Speed: {ground.chargingSpeed}W</p>
                <p>Charger Type: {ground.chargerType}</p>
                <p>Pincode: {ground.pincode}</p>
              </div>
              <h5 className="text-danger text-md font-bold">
                Note: The price mentioned below is for 1 hour
              </h5>
            </div>
            <div className="card-footer bg-green-900 p-3 rounded-b-xl d-flex justify-content-center">
              <h4 className="text-success">Price: ₹{ground.price}</h4>
            </div>
            <form className="mt-3" onSubmit={bookGround}>
              <label className="form-label text-green-900 font-bold">
                Booking Date
              </label>
              <input
                type="date"
                className="form-control"
                name="date"
                onChange={handleBookingInput}
                required
              />
              <label className="form-label text-green-900 font-bold mt-2">
                Booking Time Slot
              </label>
              <select
                name="timeSlot"
                onChange={handleBookingInput}
                className="form-control"
              >
                <option value="">Select Time Slot</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="btn btn-success shadow-lg w-100 mt-3"
              >
                Book Station
              </button>
            </form>
            {user && (
              <button
                className="btn btn-warning shadow-lg w-100 mt-2"
                onClick={() =>
                  navigate("/evstation/review/add", { state: ground })
                }
              >
                Add Review
              </button>
            )}
          </div>
        </div>
  
        {/* Reviews Section - Aligned to Right */}
        <div className="col-sm-3 mt-2 d-flex justify-content-end">
          <GetReviews />
        </div>
      </div>
  
      <div className="row mt-4">
        <div className="col-sm-12">
          <h2>Other Ev Stations:</h2>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {grounds.map((g) => (
              <GroundCard key={g.id} item={g} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default EvStation;
