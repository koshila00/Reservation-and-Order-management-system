import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Pages/Profile";
import UpdateAccount from "./components/Pages/UpdateAccount";
import Dashboard from "./components/Admin/Dashboard";
import Cafe from "./components/Pages/Cafe";
import { Toaster } from "react-hot-toast";
import Banquets from "./components/Pages/Banquets";
import Cart from "./components/Pages/Cart";
import Feedback from "./components/Pages/Feedback";
import AboutUs from "./components/Pages/AboutUs";
import Contact from "./components/Pages/Contact.jsx";
import HallInventory from "./components/Admin/HallInventory";
import CafeInventory from "./components/Admin/CafeInventory";
import Discounts from "./components/Admin/Discounts";
import Progress from "./components/Pages/Progress";
import AlertProvider from "./components/AlertProvider";
import OrchidHall from "./components/Pages/OrchidHall.jsx";
import TulipHall from "./components/Pages/TulipHall.jsx";
import GrandHall from "./components/Pages/GrandHall.jsx";

export default function App() {
  return (
    <Router>
      <AlertProvider>
        <AppContent />
      </AlertProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Function to check if the current path is under admin
  const isUnderAdminPath = (path) =>
    location.pathname.startsWith(`/admin${path}`);

  return (
    <div className="App">
      {/* Header */}
      {["/login", "/register", "/forgotpwd"].includes(location.pathname) ||
      isUnderAdminPath("/") ? null : (
        <Header />
      )}

      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        ></Toaster>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/grandHall" element={<GrandHall />} />
        <Route path="/orchidHall" element={<OrchidHall />} />
        <Route path="/tulipHall" element={<TulipHall />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/updateAccount" element={<UpdateAccount />} />
        <Route path="/cafe" element={<Cafe />} />
        <Route path="/banquets" element={<Banquets />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Panel */}
        <Route path="/admin/*" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="cafeInventory" element={<CafeInventory />} />
          <Route path="hallInventory" element={<HallInventory />} />
          <Route path="discounts" element={<Discounts />} />

          {/* Other nested routes */}
        </Route>
        {/* Admin Panel */}
      </Routes>

      {/* Footer */}
      {["/login", "/register", "/forgotpwd"].includes(location.pathname) ||
      isUnderAdminPath("/") ? null : (
        <Footer />
      )}
    </div>
  );
}
