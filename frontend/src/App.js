import "./App.css";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./page/AboutUs";
import ContactUs from "./page/ContactUs";
import Header from "./NavbarComponent/Header";
import HomePage from "./page/HomePage";
import UserRegister from "./UserComponent/UserRegister";
import UserLoginForm from "./UserComponent/UserLoginForm";


import ViewAllCustomer from "./UserComponent/ViewAllCusomer";
import ViewMyBooking from "./BookingComponent/ViewMyBooking";
import ViewAllBooking from "./BookingComponent/ViewAllBooking";
import VerifyBooking from "./BookingComponent/VerifyBooking";
import MyWallet from "./UserComponent/MyWallet";
import AddReview from "./ReviewComponent/AddReview";


import ViewAllStation from "./EvStationComponent/ViewAllStation";
import AddEvStationForm from "./EvStationComponent/AddEvStationForm";
import ViewAllEvStation from "./EvStationComponent/ViewAllEvStation";
import EvStation from "./EvStationComponent/EvStation";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/all/hotel/location" element={<HomePage />} />

        <Route path="contact" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />

        <Route path="user/hotel/register" element={<UserRegister />} />
        <Route path="user/customer/register" element={<UserRegister />} />
        <Route path="user/admin/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLoginForm />} />

        <Route path="admin/evstation/add" element={<AddEvStationForm />} />
        <Route path="book/evstation/add" element={<AddEvStationForm />} />
        <Route path="user/customer/all" element={<ViewAllCustomer />} />

        <Route path="/book/evstation/:groundId" element={<EvStation />} />
        <Route path="user/evstation/bookings" element={<ViewMyBooking />} />
        <Route path="user/evstation/booking/all" element={<ViewAllBooking />} />
        <Route
          path="/user/admin/verify/booking/:bookingId"
          element={<VerifyBooking />}
        />
        <Route path="/customer/wallet" element={<MyWallet />} />
        <Route path="/evstation/review/add" element={<AddReview />} />
        <Route path="/admin/evstation/all" element={<ViewAllEvStation />} />
        <Route path="/evstation/all" element={<ViewAllStation />} />

        
      </Routes>
    </div>
  );
}

export default App;
