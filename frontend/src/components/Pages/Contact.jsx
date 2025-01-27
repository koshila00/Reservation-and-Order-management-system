import React, { useRef, useState } from "react";
import "../../styles/tutorials.css";
import "../../styles/home.css";
import "../../styles/codeEditor.css";
import logo from "../../images/logo.png";

export default function AboutUs() {
  return (
    <>
      <div className="mb-5">
        <div className="main-top">
          <div className="tutContainer">
            <div className="home-main pageMain">
              <img
                src={logo}
                className="img-fluid footer-logo mt-5"
                alt="Logo"
              />
              <div className="left ">
                <section className="mt-5">
                  <p className="categ-topic" style={{ width: "100%" }}>
                    Contact Us
                  </p>
                  <p
                    className="categ-desc categ-subtopic"
                    style={{ maxWidth: "800px", width: "100%" }}
                  >
                    FEEL FREE TO CONTACT US FOR ANY QUESTIONS AND DOUBTS
                  </p>
                </section>
                <section className="mt-5">
                  <p
                    className="categ-desc categ-subtopic"
                    style={{ maxWidth: "800px", width: "100%" }}
                  >
                    173 Kotugoda Rd, Seeduwa 11410
                  </p>
                  <p
                    className="categ-desc categ-subtopic"
                    style={{ maxWidth: "800px", width: "100%" }}
                  >
                    Monday – Sunday, 8:30 am – 5:00 pm
                  </p>
                  <p
                    className="categ-desc categ-subtopic"
                    style={{ maxWidth: "800px", width: "100%" }}
                  >
                    Phone: +94 750 300 900
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
