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
                <p className="categ-topic mt-3" style={{ width: "100%" }}>
                  Discover Our Story and Mission
                </p>
                <section className="mt-5">
                  <p className="categ-topic" style={{ width: "100%" }}>
                    Our Story
                  </p>
                  <p
                    className="categ-desc categ-subtopic"
                    style={{ maxWidth: "800px", width: "100%" }}
                  >
                    The elegant craftsmanship and the exquisitely
                    decorated Siyasra Banquet Hall open its doors to give you a
                    warm event in style beyond your expectations. Siyasra
                    Banquet Halls are supremely super luxurious and situated in
                    a vantage spot in Raddoluwa adjoining the Seeduwa,
                    Kotugoda Main Road.
                  </p>
                </section>
                <section className="mt-5">
                  <p className="categ-topic" style={{ width: "100%" }}>
                    Our Mission
                  </p>
                  <p
                    className="categ-desc categ-subtopic"
                    style={{ maxWidth: "800px", width: "100%" }}
                  >
                    We, Janitha Group. Filled with hospitality, the warmth of
                    the sunny climate and the cool of the sea breeze provide you
                    with a very unique experience for your money, making your
                    holiday dreamlike. If you are planning a wedding, a
                    corporate function, a meeting, or any other social function,
                    we are equipped to serve you with the most elegant and
                    state-of-the-art facilities while enhancing your image and
                    desire.
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
