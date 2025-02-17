import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyBooking = () => {
  const [booking, setBooking] = useState([]);
  const { bookingId } = useParams();
  const [bookingStatus, setBookingStatus] = useState([]);
  const [updateBookingStatus, setUpdateBookingStatus] = useState({
    bookingId: bookingId,
    status: "",
  });

  const retrieveAllBookingStatus = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/book/ground/fetch/status"
    );
    return response.data;
  };

  useEffect(() => {
    const getBooking = async () => {
      const b = await retrieveBooking();
      if (b) {
        setBooking(b.bookings[0]);
      }
    };

    const getAllBookingStatus = async () => {
      const allBookingStatus = await retrieveAllBookingStatus();
      if (allBookingStatus) {
        setBookingStatus(allBookingStatus);
      }
    };

    getAllBookingStatus();
    getBooking();
  }, []);

  const retrieveBooking = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/book/ground/fetch/bookingId?id=" + bookingId
    );
    return response.data;
  };

  const handleBookingInput = (e) => {
    setUpdateBookingStatus({
      ...updateBookingStatus,
      [e.target.name]: e.target.value,
    });
  };

  let navigate = useNavigate();

  const updateGroundBookingStatus = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/book/ground/update/status", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBookingStatus),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
          });
          setTimeout(() => navigate("/user/evstation/booking/all"), 1000);
        } else {
          toast.error("It seems server is down", {
            position: "top-center",
            autoClose: 1000,
          });
          setTimeout(() => window.location.reload(true), 1000);
        }
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#d4edda" }}>
      <div className="container d-flex justify-content-center" style={{ maxWidth: "80%" }}>
        <div className="card p-5 shadow-lg" style={{ backgroundColor: "#ffffff", borderRadius: "15px", width: "40rem" }}>
          <div className="card-header text-center" style={{ backgroundColor: "#ffffff", color: "#28a745", borderRadius: "15px 15px 0 0" }}>
            <h5>Verify Booking</h5>
          </div>
          <div className="card-body">
            <div className="text-center mb-3">
              <img src={"http://localhost:8080/api/ground/" + booking.groundImage} className="img-fluid rounded" alt="ground_img" style={{ maxHeight: "200px" }} />
            </div>
            <form onSubmit={updateGroundBookingStatus}>
              <div className="mb-3">
                <label className="form-label text-success"><b>EV Station Name</b></label>
                <input type="text" className="form-control" value={booking.groundName} readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label text-success"><b>Time Slot</b></label>
                <input type="text" className="form-control" value={booking.timeSlot} readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label text-success"><b>Booking ID</b></label>
                <input type="text" className="form-control" value={booking.bookingId} readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label text-success"><b>Select Status</b></label>
                <select name="status" onChange={handleBookingInput} className="form-control">
                  <option value="">Status</option>
                  {bookingStatus.map((status) => (
                    <option value={status} key={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="text-center">
                <button type="submit" className="btn w-100" style={{ backgroundColor: "#28a745", color: "white" }}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyBooking;
