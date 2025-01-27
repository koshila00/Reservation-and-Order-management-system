import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Rating,
  Box,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import letterHead from "../../images/letterhead.jpg"; // Adjust the path to your letterhead image

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8099/api/v1/cafereview/getReviewCount",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews(response.data.data.reviews);
        setCount(response.data.data.starCounts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [token]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const imgHeight = 60;
    const imgY = 0;
    const imgX = 0;

    doc.addImage(letterHead, "JPEG", imgX, imgY, pageWidth, imgHeight);

    const titleY = imgY + imgHeight + 10;
    doc.setFontSize(16);
    doc.text("Cafe Reviews", pageWidth / 2, titleY, { align: "center" });

    const starCountsY = titleY + 10;
    let starY = starCountsY;

    doc.setFontSize(12);
    doc.text("Review Counts :", 10, starY);

    Object.keys(count).forEach((star, index) => {
      starY += 10;
      doc.text(`${star} Star: ${count[star]} review(s)`, 10, starY);
    });

    const tableY = starY + 10;

    doc.autoTable({
      startY: tableY,
      head: [["User", "Rating", "Review"]],
      body: reviews.map((review) => [
        review.userName,
        review.cafeReviewRate,
        review.cafeReviewDescription,
      ]),
    });

    doc.save("cafe_reviews.pdf");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Cafe Reviews
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={downloadPDF}
        sx={{ mb: 2, backgroundColor: "var(--dark-blue)", color: "white" }}
      >
        Download PDF
      </Button>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Review Counts
        </Typography>
        {Object.keys(count).map((star) => (
          <Box key={star} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Rating name="read-only" value={Number(star)} readOnly />
            <Typography variant="body1" sx={{ ml: 2 }}>
              {count[star]} review(s)
            </Typography>
          </Box>
        ))}
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Review</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.cafeReviewId}>
                <TableCell>{review.userName}</TableCell>
                <TableCell>
                  <Rating
                    name="read-only"
                    value={review.cafeReviewRate}
                    readOnly
                  />
                </TableCell>
                <TableCell>{review.cafeReviewDescription}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
