import React, { useState, useEffect } from "react";
import "../../styles/tutorials.css";
import "../../styles/home.css";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/material/Grid";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import { useAlert } from "../../components/AlertProvider";

export default function Cafe() {
  const [cafeItems, setCafeItems] = useState([]);
  const { showAlert } = useAlert();
  const token = localStorage.getItem("token");

  const addToCart = (item) => {
    const existingCartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

    const itemIndex = existingCartItems.findIndex(
      (cartItem) => cartItem.cafeItemId === item.cafeItemId
    );

    if (itemIndex === -1) {
      const updatedCartItems = [...existingCartItems, { ...item, quantity: 1 }];
      sessionStorage.setItem("cart", JSON.stringify(updatedCartItems));
      showAlert("Item successfully added to your cart!", "success");
    } else {
      showAlert("This item is already in your cart!", "warning");
    }
  };

  useEffect(() => {
    const fetchCafeItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8099/api/v1/cafeitem/getAllCafeItems",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCafeItems(response.data.data);
      } catch (error) {
        showAlert("Error fetching details", "danger");
      }
    };

    fetchCafeItems();
  }, []);

  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    showAlert("Login to Continue", "warning");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="mb-5">
      <div className="main-top">
        <div className="tutContainer">
          <div className="home-main container pageMain">
            <div className="topic topic-main pageTopic container">
              <div
                className="left mb-4"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <p
                  className="categ-topic mt-3"
                  style={{
                    width: "100%",
                  }}
                >
                  Order Online from Cafe
                </p>
                <Link to="/cart" style={{ textDecoration: "none" }}>
                  <IconButton sx={{ height: "50px" }}>
                    <ShoppingCartIcon fontSize="large" sx={{ color: "red" }} />
                  </IconButton>
                </Link>
              </div>
              <Grid
                container
                spacing={{ xs: 5, md: 5 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {cafeItems.map((item) => (
                  <Grid item xs={2} sm={6} md={6} key={item.cafeItemId}>
                    <Card
                      variant="outlined"
                      orientation="horizontal"
                      sx={{
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                        borderRadius: "8px",
                        "&:hover": {
                          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                        },
                        textAlign: "left",
                        padding: "30px 15px 15px 30px",
                      }}
                    >
                      <AspectRatio
                        ratio="1"
                        sx={{
                          width: 110,
                        }}
                      >
                        <img
                          src={item.cafeItemImage}
                          loading="lazy"
                          alt={item.cafeItemName}
                        />
                      </AspectRatio>
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "var(--pink)",
                            fontFamily: "Rosario",
                            fontWeight: "700",
                          }}
                          mb={1}
                        >
                          {item.cafeItemName}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitLineClamp: 3,
                            maxHeight: "3em",
                            minHeight: "3em",
                          }}
                        >
                          {item.cafeItemDescription}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "red", fontWeight: "600" }}
                        >
                          Rs. {item.cafeItemPrice}
                        </Typography>
                        <Button
                          onClick={() => addToCart(item)}
                          variant="solid"
                          sx={{
                            width: "150px",
                            backgroundColor: "#ff8900",
                            ml: "auto",
                            "&:hover": {
                              backgroundColor: "var(--pink)",
                              color: "#ffffff",
                            },
                          }}
                        >
                          Add to cart
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
