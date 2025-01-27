import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Grid from "@mui/material/Grid";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/joy/CircularProgress";
import SvgIcon from "@mui/joy/SvgIcon";

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          overflow: "hidden",
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={3}>
            <Card sx={{}}>
              <AspectRatio
                minHeight="120px"
                maxHeight="200px"
                sx={{ backgroundColor: "blue" }}
              >
                <div style={{ backgroundColor: "lightblue" }}>
                  <CircularProgress size="lg" determinate value={20}>
                    <SvgIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                        />
                      </svg>
                    </SvgIcon>
                  </CircularProgress>
                </div>
              </AspectRatio>
              <div>
                <Typography level="title-lg">Cafe Order Statistics</Typography>
              </div>
              <CardContent orientation="horizontal">
                <Button
                  component={Link}
                  to="/admin/orderGraph"
                  variant="solid"
                  size="md"
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
                >
                  View Report
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2} sm={4} md={3}>
            <Card sx={{}}>
              <AspectRatio
                minHeight="120px"
                maxHeight="200px"
                sx={{ backgroundColor: "blue" }}
              >
                <div style={{ backgroundColor: "lightblue" }}>
                  <CircularProgress size="lg" determinate value={20}>
                    <SvgIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                        />
                      </svg>
                    </SvgIcon>
                  </CircularProgress>
                </div>
              </AspectRatio>
              <div>
                <Typography level="title-lg">
                  Bookings Analysis Statistics
                </Typography>
              </div>
              <CardContent orientation="horizontal">
                <Button
                  component={Link}
                  to="/admin/BookingsAnalysis"
                  variant="solid"
                  size="md"
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
                >
                  View Report
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2} sm={4} md={3}>
            <Card sx={{}}>
              <AspectRatio
                minHeight="120px"
                maxHeight="200px"
                sx={{ backgroundColor: "blue" }}
              >
                <div style={{ backgroundColor: "lightblue" }}>
                  <CircularProgress size="lg" determinate value={20}>
                    <SvgIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                        />
                      </svg>
                    </SvgIcon>
                  </CircularProgress>
                </div>
              </AspectRatio>
              <div>
                <Typography level="title-lg">Cafe Inventory Report</Typography>
              </div>
              <CardContent orientation="horizontal">
                <Button
                  component={Link}
                  to="/admin/CafeInventoryChart"
                  variant="solid"
                  size="md"
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
                >
                  View Report
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2} sm={4} md={3}>
            <Card sx={{}}>
              <AspectRatio
                minHeight="120px"
                maxHeight="200px"
                sx={{ backgroundColor: "blue" }}
              >
                <div style={{ backgroundColor: "lightblue" }}>
                  <CircularProgress size="lg" determinate value={20}>
                    <SvgIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                        />
                      </svg>
                    </SvgIcon>
                  </CircularProgress>
                </div>
              </AspectRatio>
              <div>
                <Typography level="title-lg">Review Report</Typography>
              </div>
              <CardContent orientation="horizontal">
                <Button
                  component={Link}
                  to="/admin/reviews"
                  variant="solid"
                  size="md"
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
                >
                  View Report
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
