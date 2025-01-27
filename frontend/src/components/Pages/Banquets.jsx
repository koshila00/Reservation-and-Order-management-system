import React, { useState, useEffect } from "react";
import "../../styles/tutorials.css";
import "../../styles/home.css";
import grand from "../../images/grand.png";
import orchid from "../../images/orchid.png";
import tulip from "../../images/tulip.png";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/joy/Grid";
import { Link, Navigate } from "react-router-dom";

export default function Banquets() {
  const token = localStorage.getItem("token");

  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="mb-5">
      <div className="main-top">
        <div className="tutContainer">
          <div className="home-main container pageMain">
            <div className="topic topic-main pageTopic ">
              <div className="left">
                <p className="categ-topic mt-3" style={{ width: "100%" }}>
                  Siyasra Luxury Banquets
                </p>

                <Grid
                  container
                  spacing={3}
                  sx={{ flexGrow: 1, ml: "auto", mr: "auto" }}
                >
                  <Grid xs={2} sm={4} md={4}>
                    <div className="mt-4">
                      <Card sx={{ width: 320 }}>
                        <AspectRatio minHeight="120px" maxHeight="200px">
                          <img src={grand} loading="lazy" alt="" />
                        </AspectRatio>
                        <CardContent>
                          <Typography level="body-sm">
                            It’s built-in the fashion of heaven for weddings &
                            functions we take pride to offer you luxury and
                            comfort as a service par excellence. Janitha Bakers,
                            the expert connoisseurs in the sphere of culinary
                            cuisine & confectionery are on hand to turn out
                            delicious Western & Eastern menus. <br />
                            <p>Capacity up to 350 Pax - AC</p>
                          </Typography>

                          <Button
                            component={Link}
                            to="/grandHall"
                            variant="solid"
                            size="md"
                            aria-label="Explore Bahamas Islands"
                            sx={{
                              ml: "auto",
                              mr: "auto",
                              alignSelf: "center",
                              fontWeight: 600,
                              mt: 2,
                              backgroundColor: "#ff8900",
                              "&:hover": {
                                backgroundColor: "var(--pink)",
                                color: "#ffffff",
                              },
                            }}
                          >
                            Book Hall
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </Grid>
                  <Grid xs={2} sm={4} md={4}>
                    <div className="mt-4">
                      <Card sx={{ width: 320 }}>
                        <AspectRatio minHeight="120px" maxHeight="200px">
                          <img src={orchid} loading="lazy" alt="" />
                        </AspectRatio>
                        <CardContent>
                          <Typography level="body-sm">
                            It’s built-in the fashion of heaven for weddings &
                            functions we take pride to offer you luxury and
                            comfort as a service par excellence. Janitha Bakers,
                            the expert connoisseurs in the sphere of culinary
                            cuisine & confectionery are on hand to turn out
                            delicious Western & Eastern menus.<br />
                            <p>Capacity up to 250 Pax - AC</p>
                          </Typography>

                          <Button
                            component={Link}
                            to="/orchidHall"
                            variant="solid"
                            size="md"
                            aria-label="Explore Bahamas Islands"
                            sx={{
                              ml: "auto",
                              mr: "auto",
                              alignSelf: "center",
                              fontWeight: 600,
                              mt: 2,
                              backgroundColor: "#ff8900",
                              "&:hover": {
                                backgroundColor: "var(--pink)",
                                color: "#ffffff",
                              },
                            }}
                          >
                            Book Hall
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </Grid>
                  <Grid xs={2} sm={4} md={4}>
                    <div className="mt-4">
                      <Card sx={{ width: 320 }}>
                        <AspectRatio minHeight="120px" maxHeight="200px">
                          <img src={tulip} loading="lazy" alt="" />
                        </AspectRatio>
                        <CardContent>
                          <Typography level="body-sm">
                            It’s built-in the fashion of heaven for weddings &
                            functions we take pride to offer you luxury and
                            comfort as a service par excellence. Janitha Bakers,
                            the expert connoisseurs in the sphere of culinary
                            cuisine & confectionery are on hand to turn out
                            delicious Western & Eastern menus.<br />
                            <p>Capacity up to 400 Pax - AC</p>
                          </Typography>

                          <Button
                            component={Link}
                            to="/tulipHall"
                            variant="solid"
                            size="md"
                            aria-label="Explore Bahamas Islands"
                            sx={{
                              ml: "auto",
                              mr: "auto",
                              alignSelf: "center",
                              fontWeight: 600,
                              mt: 2,
                              backgroundColor: "#ff8900",
                              "&:hover": {
                                backgroundColor: "var(--pink)",
                                color: "#ffffff",
                              },
                            }}
                          >
                            Book Hall
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
