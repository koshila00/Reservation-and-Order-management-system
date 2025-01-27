import React, { useState, useEffect } from "react";
import "../../styles/tutorials.css";
import "../../styles/home.css";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import CardActions from "@mui/joy/CardActions";
import Grid from "@mui/system/Unstable_Grid";
import axios from "axios";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/joy/Input";
import Box from "@mui/system/Box";
import { useAlert } from "../../components/AlertProvider";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Select from "@mui/material/Select";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export default function Cart() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const token = localStorage.getItem("token");
  const [cartItems, setCartItems] = useState(() => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    return cart;
  });
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [discounts, setDiscounts] = useState([]);
  const [cardHolderName, setCardHolderName] = useState("");
  const [finalTotal, setFinalTotal] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardHolderName: "",
  });

  const [selectedDiscount, setSelectedDiscount] = useState({ name: '', percentage: 0 });
  const [discountId, setDiscountId] = useState("");

  useEffect(() => {
    if (discounts.length > 0) {
      // Set a random discount on mount
      const randomIndex = Math.floor(Math.random() * discounts.length);
      const randomDiscount = discounts[randomIndex];
      setSelectedDiscount({ name: randomDiscount.discountName, percentage: randomDiscount.discountPercentage });
      setDiscountId(randomDiscount.discountId);
    }
  }, [discounts]);

  const handleDiscountChange = (event) => {
    const selected = discounts.find(d => d.discountId === event.target.value);
    if (selected) {
      setSelectedDiscount({ name: selected.discountName, percentage: selected.discountPercentage });
    }
    setDiscountId(event.target.value);
  };

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8099/api/v1/discount/getAllDiscounts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDiscounts(response.data.data);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };

    fetchDiscounts();
  }, []);

  useEffect(() => {
    const newSubtotal = selectedDiscount.name === "No Discount" ? calculateSubtotal() : (calculateSubtotal() - (calculateSubtotal() * (selectedDiscount.percentage / 100)));
    setFinalTotal(newSubtotal);

  }, [subTotal, selectedDiscount]);


  const updateCartItemQuantity = async (itemId, newQuantity) => {
    const currentItem = cartItems.find((item) => item.cafeItemId === itemId);
    const isIncrease = newQuantity > currentItem.quantity;

    const updatedCartItems = cartItems.map((item) =>
      item.cafeItemId === itemId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCartItems);
    sessionStorage.setItem("cart", JSON.stringify(updatedCartItems));

    if (isIncrease) {
      try {
        const sub_total = calculateSubtotal();
        setSubTotal(sub_total);

        const response = await axios.post(
          `http://localhost:8099/api/v1/cafeitem/increase-one/${itemId}`
        );
      } catch (error) {
        console.log("There was an error!", "danger");
      }
    } else if (newQuantity >= 0) {
      try {
        const sub_total = calculateSubtotal();
        setSubTotal(sub_total);

        const response = await axios.post(
          `http://localhost:8099/api/v1/cafeitem/reduce-one/${itemId}`
        );
      } catch (error) {
        console.log("There was an error!", "danger");
      }
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.cafeItemId !== itemId
    );
    setCartItems(updatedCartItems);
    sessionStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.cafeItemPrice * item.quantity,
      0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;

    const newErrors = {
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      cardHolderName: "",
      discountId: "",
    };

    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number should be 16 digits and no letters.";
      hasErrors = true;
    }

    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate)) {
      newErrors.expiryDate = "Expiry date should be in the MM/YY format.";
      hasErrors = true;
    } else {
      // Extract month and year
      const [month, year] = expiryDate.split('/');
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // getMonth() returns month from 0 to 11
      const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year

      // Convert to numbers for comparison
      const expMonth = parseInt(month, 10);
      const expYear = parseInt(year, 10);

      // Check if the expiry date is not in the past
      if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        newErrors.expiryDate = "Expiry date cannot be in the past.";
        hasErrors = true;
      }
    }

    if (!/^\d{3}$/.test(cvc)) {
      newErrors.cvc = "CVC should be only 3 digits.";
      hasErrors = true;
    }

    if (!/^[a-zA-Z\s]+$/.test(cardHolderName) || cardHolderName === "") {
      newErrors.cardHolderName =
        "Card holder name should be only letters and not empty.";
      hasErrors = true;
    }

    if (discountId === "") {
      newErrors.discountId = "Select a discount";
      hasErrors = true;
    }

    if (calculateSubtotal() === 0) {
      showAlert("Your cart is empty.", "danger");
      return;
    }

    setErrors(newErrors);

    if (hasErrors) {
      showAlert("Please fill in all fields correctly.", "danger");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8099/api/v1/cafeorder/createCafeOrder",
        {
          cafeOrderTotal: finalTotal,
          cafeOrderDeliveryStatus: "Processing",
          cafeOrderType: "TakeAway",
          discountId: discountId,
          items: cartItems.map((item) => ({
            cafeItemId: item.cafeItemId,
            cafeOrderItemQty: item.quantity,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("Order made successfully", "success");
      navigate("/feedback");
      sessionStorage.removeItem("cart");
    } catch (error) {
      showAlert("There was an error!", "danger");
    }
  };

  return (
    <div className="mb-5">
      <div className="main-top">
        <div className="tutContainer">
          <div className="home-main container pageMain">
            <div className="topic topic-main pageTopic ">
              <div className="left mb-4">
                <p className="categ-topic mt-3" style={{ width: "100%" }}>
                  Browse Your Cart
                </p>
              </div>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid xs={8}>
                    {cartItems.length === 0 ? (
                      <Card
                        variant="outlined"
                        orientation="horizontal"
                        sx={{
                          width: "600",
                          ml: "auto",
                          mr: "auto",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                          borderRadius: "8px",
                          textAlign: "left",
                          p: 4,
                          paddingRight: "15px",
                          display: "flex",
                          flexDirection: "column",
                          paddingBottom: "15px",
                        }}
                      >
                        <Typography
                          level="title-lg"
                          id="card-description"
                          sx={{
                            color: "var(--pink)",
                            fontFamily: "Rosario",
                            fontWeight: "700",
                            textAlign: "center",
                          }}
                          mb={1}
                        >
                          Your Cart is Empty
                        </Typography>
                      </Card>
                    ) : (
                      <Card
                        variant="outlined"
                        orientation="horizontal"
                        sx={{
                          width: 650,
                          ml: "auto",
                          mr: "auto",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                          borderRadius: "8px",
                          textAlign: "left",
                          p: 4,
                          paddingRight: "15px",
                          display: "flex",
                          flexDirection: "column",
                          paddingBottom: "15px",
                        }}
                      >
                        {cartItems.map((item, index) => (
                          <div key={item.cafeItemId}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                marginTop: "5px",
                              }}
                            >
                              <AspectRatio
                                ratio="1"
                                sx={{
                                  width: 90,
                                  mr: 3,
                                }}
                              >
                                <img
                                  src={item.cafeItemImage}
                                  loading="lazy"
                                  alt={item.cafeItemName}
                                />
                              </AspectRatio>
                              <CardContent>
                                <Stack
                                  key={item.cafeItemId}
                                  direction="row"
                                  useFlexGap
                                  spacing={1}
                                  sx={{
                                    justifyContent: "space-between",
                                    height: "100%",
                                  }}
                                >
                                  <div style={{ width: "300px" }}>
                                    <Typography
                                      level="title-lg"
                                      id="card-description"
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
                                      level="body-sm"
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
                                  </div>
                                  <Typography
                                    sx={{ mt: "auto", mb: "auto", width: 110 }}
                                  >
                                    <IconButton
                                      sx={{
                                        backgroundColor: "lightgray",
                                        padding: "5px",
                                        marginRight: "10px",
                                      }}
                                      onClick={() => {
                                        if (item.quantity > 0) {
                                          updateCartItemQuantity(
                                            item.cafeItemId,
                                            item.quantity - 1
                                          );
                                        }
                                      }}
                                    >
                                      <RemoveIcon fontSize="small" />
                                    </IconButton>
                                    <Typography level="body-md">
                                      {item.quantity}
                                    </Typography>
                                    <IconButton
                                      sx={{
                                        backgroundColor: "lightgray",
                                        padding: "5px",
                                        marginLeft: "10px",
                                      }}
                                      onClick={() =>
                                        updateCartItemQuantity(
                                          item.cafeItemId,
                                          item.quantity + 1
                                        )
                                      }
                                    >
                                      <AddIcon fontSize="small" />
                                    </IconButton>
                                  </Typography>
                                  <Typography
                                    level="body-lg"
                                    aria-describedby="card-description"
                                    sx={{
                                      fontWeight: "700",
                                      width: "95px",
                                      textAlign: "right",
                                      mt: "auto",
                                      mb: "auto",
                                    }}
                                  >
                                    Rs. {item.cafeItemPrice * item.quantity}
                                  </Typography>
                                </Stack>
                              </CardContent>
                            </div>
                            <Divider
                              sx={{
                                height: "1px",
                                width: "97%",
                                backgroundColor: "grey",
                                marginTop: "15px",
                              }}
                            />
                          </div>
                        ))}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "right",
                            alignItems: "center",
                            marginTop: "10px",
                          }}
                        >
                          <Typography level="body-md">Sub-Total</Typography>
                          <Typography
                            level="body-lg"
                            aria-describedby="card-description"
                            sx={{
                              fontWeight: "700",
                              textAlign: "right",
                              marginLeft: "25px",
                            }}
                          >
                            Rs. {calculateSubtotal()}
                          </Typography>
                        </div>
                      </Card>
                    )}
                  </Grid>
                  <Grid xs={4}>
                    <Card
                      variant="outlined"
                      sx={{
                        maxHeight: "max-content",
                        width: "100%",
                        maxWidth: "550px",
                        mx: "auto",
                        overflow: "auto",
                      }}
                    >
                      <Typography
                        level="title-lg"
                        startDecorator={<ShoppingCartCheckoutIcon />}
                        sx={{ color: "var(--pink)" }}
                      >
                        Checkout
                      </Typography>
                      <Divider inset="none" />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "left",
                          padding: "16px",
                        }}
                      >
                        <Typography level="body-sm">Total due</Typography>
                        <Typography
                          level="body-lg"
                          aria-describedby="card-description"
                          sx={{
                            fontSize: "1.5rem",
                          }}
                        >
                          Rs. {finalTotal}
                        </Typography>
                        <Typography level="body-sm" sx={{ marginTop: "10px" }}>
                          Select Discount
                        </Typography>
                        <Select
                          name="discountId"
                          required
                          sx={{
                            width: 180,
                            backgroundColor: "white",
                            height: "35px",
                          }}
                          value={discountId}
                          onChange={handleDiscountChange}
                          disabled // Disable the select to block manual selection
                        >
                          {discounts.map((discount) => (
                            <MenuItem
                              key={discount.discountId}
                              value={discount.discountId}
                            >
                              {discount.discountName}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.discountId && (
                          <Typography
                            level="body-sm"
                            color="error"
                            sx={{
                              color: "red",
                              textAlign: "left",
                              fontSize: "0.8rem",
                            }}
                          >
                            {errors.discountId}
                          </Typography>
                        )}
                      </div>

                      <Typography
                        level="title-lg"
                        startDecorator={<CreditCardIcon />}
                        sx={{ color: "var(--pink)", mt: 1 }}
                      >
                        Payment Details
                      </Typography>
                      <Divider inset="none" />
                      <form onSubmit={handleSubmit}>
                        <CardContent
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
                            gap: 3,
                            padding: "16px",
                          }}
                        >
                          <FormControl sx={{ gridColumn: "1/-1" }}>
                            <FormLabel>Card number</FormLabel>
                            <Input
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              endDecorator={<CreditCardIcon />}
                            />
                            {errors.cardNumber && (
                              <Typography
                                level="body-sm"
                                color="error"
                                sx={{
                                  color: "red",
                                  textAlign: "left",
                                  fontSize: "0.8rem",
                                }}
                              >
                                {errors.cardNumber}
                              </Typography>
                            )}
                          </FormControl>
                          <FormControl>
                            <FormLabel>Expiry date</FormLabel>
                            <Input
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              endDecorator={<CreditCardIcon />}
                            />
                            {errors.expiryDate && (
                              <Typography
                                level="body-sm"
                                color="error"
                                sx={{
                                  color: "red",
                                  textAlign: "left",
                                  fontSize: "0.8rem",
                                }}
                              >
                                {errors.expiryDate}
                              </Typography>
                            )}
                          </FormControl>
                          <FormControl>
                            <FormLabel>CVC/CVV</FormLabel>
                            <Input
                              value={cvc}
                              onChange={(e) => setCvc(e.target.value)}
                              endDecorator={<InfoOutlined />}
                            />
                            {errors.cvc && (
                              <Typography
                                level="body-sm"
                                color="error"
                                sx={{
                                  color: "red",
                                  textAlign: "left",
                                  fontSize: "0.8rem",
                                }}
                              >
                                {errors.cvc}
                              </Typography>
                            )}
                          </FormControl>
                          <FormControl sx={{ gridColumn: "1/-1" }}>
                            <FormLabel>Card holder name</FormLabel>
                            <Input
                              value={cardHolderName}
                              onChange={(e) =>
                                setCardHolderName(e.target.value)
                              }
                              placeholder="Enter cardholder's full name"
                            />
                            {errors.cardHolderName && (
                              <Typography
                                level="body-sm"
                                color="error"
                                sx={{
                                  color: "red",
                                  textAlign: "left",
                                  fontSize: "0.8rem",
                                }}
                              >
                                {errors.cardHolderName}
                              </Typography>
                            )}
                          </FormControl>
                        </CardContent>
                        <CardActions sx={{ gridColumn: "1/-1" }}>
                          <Button
                            type="submit"
                            variant="solid"
                            sx={{
                              backgroundColor: "#ff8900",
                              "&:hover": {
                                backgroundColor: "var(--pink)",
                                color: "#ffffff",
                              },
                            }}
                          >
                            Confirm Checkout
                          </Button>
                        </CardActions>
                      </form>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
