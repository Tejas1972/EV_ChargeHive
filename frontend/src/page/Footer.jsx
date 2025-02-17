import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-dark text-light py-4">
      <div className="container">
        <p className="mb-0">© 2025 EV Station Booking System. All rights reserved.</p>
        <Link to="/contact" className="text-success">Contact Us</Link>
      </div>
    </footer>
  );
};
export default Footer;