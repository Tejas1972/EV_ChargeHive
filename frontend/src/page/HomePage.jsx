import Carousel from "./Carousel";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import football_turf from "../images/img1.jpg";
import cricket_turf from "../images/img2.jpg";

const HomePage = () => {
  return (
    <div className="container-fluid mb-5">
      <Carousel />

      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="fw-bold text-success">Welcome to EV Station Booking</h1>
            <p className="text-muted lead">
              Find and book EV charging stations in seconds! Enjoy real-time availability,
              seamless transactions, and a hassle-free experience with our user-friendly platform.
            </p>
            <Link to="/evstation/all" className="btn btn-success shadow-lg px-4 py-2">
              <b>Get Started</b>
            </Link>
          </div>
          <div className="col-md-6 text-center">
            <img src={football_turf} alt="EV Station" className="img-fluid rounded shadow" />
          </div>
        </div>

        <div className="row mt-5 align-items-center">
          <div className="col-md-6 text-center">
            <img src={cricket_turf} alt="EV Facilities" className="img-fluid rounded shadow" />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold text-success">Instant Booking & Premium Facilities</h2>
            <p className="text-muted lead">
              Enjoy premium features like fast charging, secure payments, and 24/7 support.
              Track your charging history, access top-tier amenities, and book in advance.
            </p>
            <p className="text-muted lead">
              Our platform provides a smooth and convenient way to charge your EV without hassle.
              With user reviews, interactive maps, and station ratings, you can make informed decisions
              about the best charging locations.
            </p>
            <p className="text-muted lead">
              Additionally, we offer exclusive discounts for frequent users and members.
              Stay updated with the latest advancements in EV technology and charging infrastructure.
            </p>
          </div>
        </div>
      </div>

      <hr className="my-5" />
      <Footer />
    </div>
  );
};

export default HomePage;
