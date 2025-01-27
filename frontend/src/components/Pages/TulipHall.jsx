import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/joy/Input";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Divider from "@mui/material/Divider";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAlert } from "../AlertProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

export default function TulipHall() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hallTypeId: 3,
    hallBookingGuestCount: 0,
    discountId: "",
    hallBookingDate: null,
    hallBookingTotal: 0,
    hallBookingMenuPackageId: 1,
  });

  const token = localStorage.getItem("token");
  const [discounts, setDiscounts] = useState([]);
  const [hallBookings, setHallBookings] = useState([]);

  const [show, setShow] = useState(false);
  const [menuTitle, setMenuTitle] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [discountValue, setdiscountValue] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (title, items) => {
    setMenuTitle(title);
    setMenuItems(items);
    setShow(true);
  };

  console.log(formData.discountId);

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

    const fetchHallBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8099/api/v1/hallbooking/getAllHallBookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHallBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching hall bookings:", error);
      }
    };

    fetchDiscounts();
    fetchHallBookings();
  }, []);

  const handleChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (discounts.length > 0) {
      const randomDiscount = discounts[Math.floor(Math.random() * discounts.length)];
      setFormData((prevFormData) => ({
        ...prevFormData,
        discountId: randomDiscount.discountId
      }));
    }
  }, [discounts]);

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, hallBookingDate: newValue });
    const selectedDate = dayjs(newValue).format("YYYY-MM-DD");

    const isDateTaken = hallBookings.some(
      (booking) =>
        dayjs(booking.hallBookingDate).format("YYYY-MM-DD") === selectedDate &&
        booking.hallTypeId === formData.hallTypeId
    );

    if (isDateTaken) {
      showAlert(
        "The selected date is already taken. Please choose another date.",
        "warning"
      );
    }
  };

  const handleSubmit = async () => {
    try {
      const formattedDate = formData.hallBookingDate
        ? dayjs(formData.hallBookingDate).format("YYYY-MM-DD")
        : null;

      if (
        !formData.hallBookingGuestCount ||
        !formattedDate ||
        !formData.discountId ||
        !formData.hallBookingMenuPackageId ||
        formData.hallBookingGuestCount < 9 ||
        formData.hallBookingGuestCount > 401
      ) {
        showAlert(
          "Please fill in all required fields and ensure guest count is between 10 and 400",
          "warning"
        );
        return;
      }

      const isDateTaken = hallBookings.some(
        (booking) =>
          dayjs(booking.hallBookingDate).format("YYYY-MM-DD") ===
          formattedDate && booking.hallTypeId === formData.hallTypeId
      );

      if (isDateTaken) {
        showAlert(
          "The selected date is already taken. Please choose another date.",
          "warning"
        );
        return;
      }

      let price = 0;
      switch (formData.hallBookingMenuPackageId) {
        case "1":
          price = 3600;
          break;
        case "2":
          price = 4600;
          break;
        case "3":
          price = 6600;
          break;
        default:
          price = 3600;
      }

      try {
        const response = await axios.get(
          `http://localhost:8099/api/v1/discount/getOneDiscount/${formData.discountId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setdiscountValue(response.data.discountPercentage);
      } catch (error) {
        console.error("Error fetching Discont:", error);
      }

      const hallBookingTotal = 150000 + formData.hallBookingGuestCount * price - ((formData.hallBookingGuestCount * price) * (discountValue / 100));

      const response = await axios.post(
        "http://localhost:8099/api/v1/hallbooking/createHallBooking",
        {
          ...formData,
          hallBookingDate: formattedDate,
          hallBookingTotal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("Inquiry sent successfully", "success");
      navigate("/feedback");
    } catch (error) {
      showAlert("Error sending inquiry", "error");
    }
  };

  return (
    <div className="mb-5">
      <div className="main-top">
        <div className="tutContainer">
          <div className="home-main container pageMain">
            <div className="topic topic-main pageTopic">
              <div className="left">
                <p className="categ-topic mt-3 mb-3" style={{ width: "100%" }}>
                  Orchid Hall
                </p>
                <Box
                  sx={{
                    flexGrow: 1,
                    width: "800px",
                    ml: "auto",
                    mr: "auto",
                  }}
                >
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <p
                        className="categ-topic"
                        style={{
                          width: "100%",
                          fontSize: "1.8rem",
                          color: "gray",
                        }}
                      >
                        Wedding Packages
                      </p>

                      <div className="mb-4">
                        <p
                          style={{
                            width: "100%",
                            fontWeight: "700",
                            marginBottom: "5px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Buffet
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Welcome drink
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Soup with Bread
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Salads
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Main Courses
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Meat Items
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Seafood Items
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Vege & Curry Items
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Desserts
                        </p>
                      </div>
                      <div className="mb-4">
                        <p
                          style={{
                            width: "100%",
                            fontWeight: "700",
                            marginBottom: "5px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Photo Location
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Photo Location
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Including Roof top Garden
                        </p>
                      </div>

                      <div className="mb-4">
                        <p
                          style={{
                            width: "100%",
                            fontWeight: "700",
                            marginBottom: "5px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Decorations
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Hotel Stock Setups
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Settee Back
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Poruwa
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Oil Lamp
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Cake Structure
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Table Decoration
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Registration Table
                        </p>
                      </div>

                      <div className="mb-4">
                        <p
                          style={{
                            width: "100%",
                            fontWeight: "700",
                            marginBottom: "5px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Changing Room
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Dressing and Changing
                        </p>
                      </div>
                      <div className="mb-4">
                        <p
                          style={{
                            width: "100%",
                            fontWeight: "700",
                            marginBottom: "5px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Service
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Event Planning Service
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Liquor Service
                        </p>
                        <p
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "0px",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Table Service
                        </p>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <p
                        className="categ-topic"
                        style={{
                          width: "100%",
                          fontSize: "1.8rem",
                          color: "gray",
                          textAlign: "center",
                        }}
                      >
                        Hall Information
                      </p>
                      <div className="mb-3">
                        <p
                          style={{
                            width: "100%",
                            fontWeight: "700",
                            marginBottom: "5px",
                            fontSize: "1rem",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Hall Only Charges
                        </p>
                        <div
                          style={{
                            display: "flex",
                            width: "400px",
                            marginRight: "auto",
                            marginLeft: "auto",
                          }}
                        >
                          <p
                            style={{
                              width: "100%",
                              color: "gray",
                            }}
                            className="categ-desc categ-subtopic"
                          >
                            Welcome drink
                          </p>
                          <p
                            style={{
                              width: "100%",
                              color: "gray",
                              fontWeight: "600",
                            }}
                            className="categ-desc categ-subtopic"
                          >
                            Rs. 150,000.00
                          </p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p
                          style={{
                            width: "100%",
                            fontWeight: "700",
                            marginBottom: "5px",
                            fontSize: "1rem",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Plan Your Budget
                        </p>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="silver"
                            name="hallBookingMenuPackageId"
                            value={formData.hallBookingMenuPackageId}
                            onChange={handleChange}
                          >
                            <div
                              style={{
                                display: "flex",
                                width: "400px",
                                marginRight: "auto",
                                marginLeft: "auto",
                              }}
                            >
                              <p
                                style={{
                                  width: "100%",
                                  color: "gray",
                                }}
                                className="categ-desc categ-subtopic"
                                onClick={() => handleShow('Silver Menu', [
                                  'Garden Salad',
                                  'Garlic Bread',
                                  'Grilled Chicken with Rice',
                                  'Spaghetti with Marinara Sauce',
                                  'Baked Fish with Vegetables',
                                  'Chocolate Brownie',
                                  'Fresh Fruit Cup'
                                ])}
                              >
                                Silver Menu
                              </p>
                              <p
                                style={{
                                  width: "100%",
                                  color: "gray",
                                  fontWeight: "600",
                                }}
                                className="categ-desc categ-subtopic"
                                onClick={() => handleShow('Gold Menu', [
                                  'Caesar Salad',
                                  'Cheese and Crackers',
                                  'Roast Beef with Mashed Potatoes',
                                  'Chicken Alfredo Pasta',
                                  'Grilled Salmon with Quinoa',
                                  'Tiramisu',
                                  'Cheesecake'
                                ])}
                              >
                                Rs. 3,600.00{" "}
                                <FormControlLabel
                                  value="1"
                                  control={<Radio />}
                                  labelPlacement="start"
                                  sx={{
                                    margin: "0px",
                                    height: "10px",
                                  }}
                                />
                              </p>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "400px",
                                marginRight: "auto",
                                marginLeft: "auto",
                              }}
                            >
                              <p
                                style={{
                                  width: "100%",
                                  color: "gray",
                                }}
                                className="categ-desc categ-subtopic"
                              >
                                Gold Menu
                              </p>
                              <p
                                style={{
                                  width: "100%",
                                  color: "gray",
                                  fontWeight: "600",
                                }}
                                className="categ-desc categ-subtopic"
                                onClick={() => handleShow('Platinum Menu', [
                                  'Shrimp Cocktail',
                                  'Bruschetta',
                                  'Filet Mignon with Asparagus',
                                  'Chicken Cordon Bleu',
                                  'Seared Sea Bass with Risotto',
                                  'Molten Lava Cake',
                                  'Assorted Gourmet Cheeses'
                                ])}
                              >
                                Rs. 4,600.00{" "}
                                <FormControlLabel
                                  value="2"
                                  control={<Radio />}
                                  labelPlacement="start"
                                  sx={{
                                    margin: "0px",
                                    height: "10px",
                                  }}
                                />
                              </p>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                width: "400px",
                                marginRight: "auto",
                                marginLeft: "auto",
                              }}
                            >
                              <p
                                style={{
                                  width: "100%",
                                  color: "gray",
                                }}
                                className="categ-desc categ-subtopic"
                              >
                                Platinum Menu
                              </p>
                              <p
                                style={{
                                  width: "100%",
                                  color: "gray",
                                  fontWeight: "600",
                                }}
                                className="categ-desc categ-subtopic"
                              >
                                Rs. 6,600.00{" "}
                                <FormControlLabel
                                  value="3"
                                  control={<Radio />}
                                  labelPlacement="start"
                                  sx={{
                                    margin: "0px",
                                    height: "10px",
                                  }}
                                />
                              </p>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <div className="mb-3">
                        <p
                          style={{
                            width: "100%",
                            fontWeight: "700",
                            marginBottom: "5px",
                            fontSize: "1rem",
                          }}
                          className="categ-desc categ-subtopic"
                        >
                          Additional Information
                        </p>
                        <FormControl>
                          <div
                            style={{
                              display: "flex",
                              width: "350px",
                              marginRight: "auto",
                              marginLeft: "auto",
                            }}
                          >
                            <p
                              style={{
                                width: "100%",
                                color: "gray",
                              }}
                              className="categ-desc categ-subtopic"
                            >
                              Guest Count
                            </p>
                            <Input
                              required
                              type="number"
                              value={formData.hallBookingGuestCount}
                              placeholder="Guest Count"
                              onChange={handleChange}
                              name="hallBookingGuestCount"
                              sx={{ height: "20px" }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              width: "350px",
                              marginRight: "auto",
                              marginLeft: "auto",
                              marginTop: "15px",
                            }}
                          >
                            <p
                              style={{
                                width: "100%",
                                color: "gray",
                              }}
                              className="categ-desc categ-subtopic"
                            >
                              Discount Name
                            </p>
                            <Select
                              name="discountId"
                              required
                              value={formData.discountId}
                              onChange={handleChange}
                              sx={{
                                width: 240,
                                backgroundColor: "white",
                                height: "35px",
                              }}
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
                          </div>
                          <Divider />
                          <div
                            style={{
                              display: "flex",
                              width: "fit-content",
                              marginRight: "auto",
                              marginLeft: "auto",
                              flexDirection: "column",
                            }}
                          >
                            <p
                              style={{
                                width: "100%",
                                color: "gray",
                              }}
                              className="categ-desc categ-subtopic mt-4 mb-3"
                            >
                              Allocate a Date and Time
                            </p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <StaticDatePicker
                                orientation="portrait"
                                openTo="day"
                                value={formData.hallBookingDate}
                                onChange={handleDateChange}
                                shouldDisableDate={(date) => {
                                  const formattedDate = dayjs(date).format("YYYY-MM-DD");
                                  const isPastDate = dayjs(date).isBefore(dayjs(), 'day');

                                  if (isPastDate) {
                                    return true;
                                  }

                                  return hallBookings.some(
                                    (booking) =>
                                      dayjs(booking.hallBookingDate).format("YYYY-MM-DD") === formattedDate &&
                                      booking.hallTypeId === formData.hallTypeId
                                  );
                                }}
                              />
                            </LocalizationProvider>
                          </div>
                        </FormControl>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
                <Divider
                  sx={{
                    height: "1px",
                    backgroundColor: "grey",
                    mt: 3,
                  }}
                />
                <Button
                  endDecorator={<SendIcon />}
                  variant="solid"
                  size="md"
                  aria-label="Send Inquiry"
                  onClick={handleSubmit}
                  sx={{
                    width: "200px",
                    ml: "auto",
                    mr: "auto",
                    fontWeight: 600,
                    mt: 2,
                    backgroundColor: "#ff8900",
                    "&:hover": {
                      backgroundColor: "var(--pink)",
                      color: "#ffffff",
                    },
                  }}
                >
                  Send Inquiry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{menuTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {menuItems.map((item, index) => (
              <li key={index} style={{ marginBottom: '10px', fontSize: '16px' }}>{item}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
