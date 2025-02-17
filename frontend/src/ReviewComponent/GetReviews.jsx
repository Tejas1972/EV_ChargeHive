import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import star from "../images/star.png";

const GetReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { groundId } = useParams();

  useEffect(() => {
    const retrieveAllReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/ground/review/fetch?groundId=${groundId}`
        );
        setReviews(response.data.reviews || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    
    retrieveAllReviews();
  }, [groundId]);

  return (
    <div className="container d-flex justify-content-center">
      <div className="card p-5 shadow-lg" style={{ backgroundColor: "#ffffff", border: "2px solid #ffffff", borderRadius: "10px", width: "30rem" }}>
        <div className="card-header text-center" style={{ backgroundColor: "#ffffff", color: "#28a745", borderRadius: "10px 10px 0 0" }}>
          <h5 className="card-title">EV Station Reviews</h5>
        </div>
        <div className="card-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border-bottom pb-2 mb-2">
                <b style={{ color: "#28a745" }}>{review.user} </b>
                <span>{review.star} / 5 </span>
                <img src={star} width="20" height="20" alt="star" />
                <p>{review.review}</p>
              </div>
            ))
          ) : (
            <p className="text-center">No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetReviews;
