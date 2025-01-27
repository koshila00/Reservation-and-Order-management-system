import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { Button, OverlayTrigger, Tooltip, Carousel } from "react-bootstrap";
import caro1 from "../images/caro1.png";
import caro2 from "../images/caro2.png";
import caro3 from "../images/caro3.png";
import logo from "../images/logo.png";
import coverimg from "../images/coverimg.jpg";
import cafeimg from "../images/cafeimg.jpg";

export default function Home() {
  const token = localStorage.getItem("token");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //TOOLTIP
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Login
    </Tooltip>
  );

  // CAROUSEL
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div style={{ backgroundColor: "#e9e3dd" }}>
      <div className="main-top">
        <div className="top-container">
          <div className="home-main container">
            <div className="left-inner ">
              <div className="lead">We Make Your Day Memorable</div>
              <p className="flex-wrap  lead-second">
                You Make The Choice, Leave The Rest To Us
              </p>
              <div className="top-btns">
                <Button
                  variant="outline-light"
                  href={token ? "/cafe" : "/login"}
                  className="header-btn register me-2"
                >
                  Cafe
                </Button>
                <Button
                  variant="outline-light"
                  href={token ? "/banquets" : "/login"}
                  className="header-btn register mx-2"
                >
                  Banquets
                </Button>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <Button
                    variant="outline-light"
                    href="/login"
                    className="header-btn login reg-company-btn login-body"
                  >
                    <i className="fa-sharp fa-solid fa-right-to-bracket"></i>
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* BODY */}
      <div className="topic topic-main mt-5 ">
        <img src={logo} className="img-fluid footer-logo" alt="Logo" />
      </div>

      {/* CATEGORIES */}

      <div className="categories-main">
        {/* UPPER SECTION */}
        <div className="categ-upper container ">
          <div className="left ">
            <p className="categ-topic">Siyasra Luxury Banquets</p>
            <section>
              <p className="categ-desc categ-subtopic">
                A spacious lobby, Two elevators, and Changing rooms add to the
                grandeur of Siyasra.
              </p>
              <Button
                variant="outline-light"
                href={token ? "/banquets" : "/login"}
                className="header-btn login reg-company-btn learn-more"
              >
                Explore Banquets
                <i className="fa-solid fa-chevron-right ms-1"></i>
              </Button>
            </section>
          </div>
          <div className="right">
            <img src={coverimg} className="bodyimg" alt="Logo" />
          </div>
        </div>

        {/* LOWER SECTION */}

        <div className="categ-upper categ-lower container bg-white pt-5 pb-5">
          <div className="left">
            <p className="categ-topic categ-topic-lower">Siyasra Luxury Cafe</p>
            <p className="categ-desc categ-subtopic">
              A spacious lobby, Two elevators, and Changing rooms add to the
              grandeur of Siyasra.
            </p>
            <Button
              variant="outline-light"
              href={token ? "/cafe" : "/login"}
              className="header-btn login reg-company-btn learn-more"
            >
              Explore Cafe<i className="fa-solid fa-chevron-right ms-1"></i>
            </Button>
          </div>
          <div className="right ">
            <img src={cafeimg} className="bodyimg" alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}
