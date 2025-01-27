import React from "react";
import "../styles/footer.css";
import logo from "../images/logo-white.png";

export default function Footer() {
  const token = localStorage.getItem("token");

  return (
    <div className="footer-main">
      <div className="footer container">
        <div className="foot-col">
          <div className="foot-topic">ABOUT US</div>
          <div className="foot-content">
            We have what you are looking for. Siyasra Banquets can provide you
            the modern, classic & elegant banquets halls you are looking for
            your big day.
          </div>
        </div>
        <div className="foot-col">
          <div className="foot-topic">CONTACT INFO</div>
          <div className="foot-content">
            <p>Address: 173 Kotugoda Rd, Seeduwa 11410</p>

            <p>
              Phone: <a href="#"> +94 750 300 900</a>
            </p>

            <p>
              Email: <a href="#">siyasra@janitha.lk </a>
            </p>
          </div>
        </div>
        <div className="foot-col">
          <div className="foot-topic">QUICK LINKS</div>
          <div className="foot-content">
            <p>
              <a href="/">Home</a>
            </p>

            <p>
              <a href="/aboutus">About Us</a>
            </p>

            <p>
              <a href="/contact">Contact</a>
            </p>

            <p>
              <a href={token ? "/cafe" : "/login"}>Menu</a>
            </p>
          </div>
        </div>
        <div className="foot-col">
          <div className="foot-topic">NEWSLETTER</div>
          <div className="foot-content">
            <p>
              <a href="#">
                THE GORGEOUS SETTING OF OUR BANQUET HALL WILL PROVIDE AN
                UNPARALLELED EXPERIENCE FOR YOUR SPECIAL EVENT.
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="container footer footer-lower">
        <div className="foot-lower">
          <a href="/">
            <img src={logo} className="img-fluid footer-logo" alt="Logo" />
          </a>
        </div>
        <div className="foot-lower-icons">
          <a href="#">
            <i class="fa-brands fa-instagram"></i>
          </a>

          <a href="#">
            <i class="fa-brands fa-facebook"></i>
          </a>

          <a href="#">
            <i class="fa-brands fa-twitter"></i>
          </a>

          <a href="#">
            <i class="fa-brands fa-youtube"></i>
          </a>

          <a href="#">
            <i class="fa-brands fa-pinterest"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
