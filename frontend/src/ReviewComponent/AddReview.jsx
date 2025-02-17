import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const AddReview = () => {
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const navigate = useNavigate();
  const location = useLocation();
  const ground = location.state;

  const [star, setStar] = useState("");
  const [review, setReview] = useState("");

  const saveReview = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login as Customer to add your review!");
      return;
    }

    const data = {
      userId: user.id,
      groundId: ground.id,
      star,
      review,
    };

    try {
      const response = await fetch("http://localhost:8080/api/ground/review/add", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      toast.warn(result.responseMessage, {
        position: "top-center",
        autoClose: 1000,
      });
      
      navigate(`/book/evstation/${ground.id}`);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#d4edda" }}>
      <div className="container d-flex justify-content-center">
        <div className="card p-5 shadow-lg" style={{ backgroundColor: "#ffffff", border: "2px solid #ffffff", borderRadius: "10px", width: "30rem" }}>
          <div className="card-header text-center" style={{ backgroundColor: "#ffffff", color: "#28a745", borderRadius: "10px 10px 0 0" }}>
            <h5 className="card-title">Add EV Station Review</h5>
          </div>
          <div className="card-body">
            <form onSubmit={saveReview}>
              <div className="mb-3">
                <label className="form-label text-success"><b>Star</b></label>
                <select className="form-control" value={star} onChange={(e) => setStar(e.target.value)}>
                  <option value="">Select Star</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="review" className="form-label text-success"><b>EV Station Review</b></label>
                <textarea className="form-control" id="review" rows="3" placeholder="Enter review..." value={review} onChange={(e) => setReview(e.target.value)} />
              </div>
              <input type="submit" className="btn w-100" style={{ backgroundColor: "#28a745", color: "white" }} value="Add Review" />
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;