import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewAllBooking = () => {
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    const getAllBooking = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/book/ground/fetch/all");
        setAllBookings(response.data.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    getAllBooking();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#d4edda", width: "100vw", padding: "40px", marginTop: "-50px" }}>
      <div className="container" style={{ maxWidth: "90%" }}>
        <div className="card p-5 shadow-lg" style={{ backgroundColor: "#ffffff", borderRadius: "15px" }}>
          <div className="card-header text-center" style={{ backgroundColor: "#28a745", color: "white", borderRadius: "15px 15px 0 0" }}>
            <h2 style={{ fontSize: "28px" }}>All Bookings</h2>
          </div>
          <div className="card-body" style={{ overflowY: "auto", maxHeight: "700px" }}>
            <div className="table-responsive">
              <table className="table table-hover text-center">
                <thead className="table-bordered bg-success text-white" style={{ fontSize: "18px" }}>
                  <tr>
                    <th>EV Station Name</th>
                    <th>Booking ID</th>
                    <th>Customer Name</th>
                    <th>Customer Contact</th>
                    <th>Booking Date</th>
                    <th>Time Slot</th>
                    <th>Status</th>
                    <th>Total Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allBookings.map((booking) => (
                    <tr key={booking.bookingId} style={{ fontSize: "16px" }}>
                      <td><b>{booking.groundName}</b></td>
                      <td><b>{booking.bookingId}</b></td>
                      <td><b>{booking.customerName}</b></td>
                      <td><b>{booking.customerContact}</b></td>
                      <td><b>{booking.date}</b></td>
                      <td><b>{booking.timeSlot}</b></td>
                      <td><b>{booking.status}</b></td>
                      <td><b>{booking.price}</b></td>
                      <td>
                        {booking.status === "Pending" && (
                          <Link to={`/user/admin/verify/booking/${booking.id}`} className="btn btn-sm btn-success" style={{ fontSize: "14px" }}>
                            <b>Verify Booking</b>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllBooking;
