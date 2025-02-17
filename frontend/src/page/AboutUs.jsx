import EV_Logo from '../images/EV_Logo.png';
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="container mt-5" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Image in Card Format */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 mt-3">
            <div className="card-body text-center">
              <img 
                src={EV_Logo} 
                alt="ChargeHive Overview" 
                className="img-fluid rounded" 
                style={{ maxWidth: '200px', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* About Us Section */}
      <div className="row justify-content-center mt-4">
        <div className="col-md-8 text-center">
          <h2 className="fw-bold text-success">About Us</h2>
          <p className="text-muted lead">
            Welcome to our EV Station Booking System! We aim to make EV charging effortless
            by providing real-time availability, seamless transactions, and a hassle-free
            booking experience.
          </p>
        </div>
      </div>
      
      {/* ChargeHive Project Information */}
      <div className="row justify-content-center mt-4">
        <div className="col-md-10 p-4" style={{ backgroundColor: '#e8f5e9', borderRadius: '10px' }}>
          <h3 className="fw-bold text-success text-center">What is ChargeHive?</h3>
          <p className="text-dark lead text-center">
            Electric vehicle (EV) charging stations play a crucial role in promoting sustainable transportation
            and reducing carbon emissions. These stations provide a convenient and efficient way for EV owners
            to recharge their vehicles, ensuring seamless mobility and reducing dependency on fossil fuels. 
          </p>
          <p className="text-dark lead text-center">
            By offering accessible charging points, these stations help address range anxiety, encouraging more
            people to transition to eco-friendly electric vehicles. They support the growth of smart cities,
            enabling intelligent energy management and integration with renewable energy sources like solar
            and wind power. 
          </p>
          <p className="text-dark lead text-center">
            With the increasing adoption of EVs, a well-organized charging infrastructure is essential to enhance
            user convenience, minimize wait times, and optimize energy distribution. EV charging stations contribute
            to a greener future, making transportation more sustainable, cost-effective, and environmentally friendly.
          </p>
        </div>
      </div>

      {/* Full-width Styled HR */}
      <hr/>

      {/* Full-width Footer */}
      <footer className="bg-dark text-light py-4 mt-4" style={{ width: '100%', margin: '0 auto' }}>
        <div className="container text-center">
          <p className="mb-2">© 2025 EV Station Booking System. All rights reserved.</p>
          <Link to="/contact" className="text-success">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
