import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Button } from "react-bootstrap";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import randomColor from "randomcolor"; // Import randomcolor library
import { Chart, ArcElement, Tooltip, Legend } from "chart.js/auto";

export default function Progress() {
  const [languageData, setLanguageData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8071/ala/getChart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLanguageData(response.data.languageArray); // Set language data from response
      } catch (error) {
        console.error("Error fetching language data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: languageData.map((item) => item.language),
    datasets: [
      {
        label: "Language Levels",
        data: languageData.map((item) => item.count),
        backgroundColor: languageData.map(() => randomColor()),
        hoverOffset: 4,
      },
    ],
  };

  const options = {};

  return (
    <div className="mb-5">
      <div className="main-top">
        <div className="tutContainer">
          <div className="home-main container pageMain">
            <div className="tutTopBar container mt-5">
              <Button
                variant="outline-light"
                onClick={() => window.history.back()}
                className="header-btn register viewTutBtn"
              >
                <ArrowBackIosNewIcon fontSize="small" className="me-1" />
                Back
              </Button>
            </div>
            <div className="topic topic-main pageTopic">Achievements</div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "70vw",
          height: "70vh",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Doughnut data={data} options={options}></Doughnut>
      </div>
    </div>
  );
}
