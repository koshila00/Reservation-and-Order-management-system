import React, { useState } from "react";
import "../../styles/tutorials.css";
import "../../styles/home.css";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useAlert } from "../../components/AlertProvider";

export default function Cart() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const { showAlert } = useAlert();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleFeedbackSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8099/api/v1/cafereview/createCafeReview",
        {
          cafeReviewDescription: feedback,
          cafeReviewRate: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("Feedback sent successfully", "success");
      navigate("/");
    } catch (error) {
      showAlert("There was an error!", "danger");
    }
  };

  return (
    <div className="mb-5">
      <div className="main-top">
        <div className="tutContainer">
          <div className="home-main container pageMain">
            <div className="topic topic-main pageTopic container ">
              <Card
                variant="outlined"
                sx={{
                  maxHeight: "max-content",
                  width: "550px",
                  mx: "auto",
                  overflow: "auto",
                  mt: 5,
                }}
              >
                <Typography
                  level="title-lg"
                  sx={{ color: "var(--pink)", textAlign: "center", p: 2 }}
                >
                  Give Us a Feedback About Our Service
                </Typography>
                <CardContent
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
                    gap: 3,
                  }}
                >
                  <FormControl sx={{ gridColumn: "1/-1" }}>
                    <Rating
                      name="rating"
                      value={rating}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                      sx={{ ml: "auto", mr: "auto" }}
                      className="mb-3"
                    />
                    <Textarea
                      placeholder="Share your feedback here regarding our service!"
                      minRows={6}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                  </FormControl>
                  <CardActions
                    buttonFlex="0 1 550px"
                    sx={{ gridColumn: "1/-1" }}
                  >
                    <Button
                      component={Link}
                      to="/"
                      variant="solid"
                      sx={{
                        backgroundColor: "#ff8900",
                        "&:hover": {
                          backgroundColor: "var(--pink)",
                          color: "#ffffff",
                        },
                      }}
                    >
                      Later
                    </Button>
                    <Button
                      onClick={handleFeedbackSubmit}
                      variant="solid"
                      sx={{
                        backgroundColor: "#ff8900",
                        "&:hover": {
                          backgroundColor: "var(--pink)",
                          color: "#ffffff",
                        },
                      }}
                    >
                      Send Feedback
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
