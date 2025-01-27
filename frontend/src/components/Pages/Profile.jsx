import React, { useState, useEffect } from "react";
import "../../styles/tutorials.css";
import "../../styles/home.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Grid } from "@mui/material";
import { useFormik, Formik, Field } from "formik";
import * as Yup from "yup";
import TextField from "../FormsUI/TextField";
import SubmitButton from "../FormsUI/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../components/AlertProvider";
import Input from "@mui/joy/Input";
import FormLabel from "@mui/joy/FormLabel";
import { Button } from "@mui/material";

export default function Cart() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8099/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data.data);
    } catch (error) {
      showAlert(
        "Failed to fetch user profile. Please try again later.",
        "danger"
      );
      navigate("/");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        "http://localhost:8099/api/v1/user/delete/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showAlert("Account deleted successfully", "success");
      window.localStorage.removeItem("LoggedIn");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      showAlert("Failed to delete account. Please try again later.", "danger");
    }
  };

  return (
    <div className="main-top">
      <div className="tutContainer">
        <div className="home-main container pageMain">
          <div className="login-container container register-container">
            <div className="login-form pt-4" style={{ width: "550px" }}>
              <div className="login-lead">Your Profile</div>

              <Formik>
                <Grid container spacing={2}>
                  {/* 1st row */}

                  <Grid item xs={6} className="mb-2">
                    <FormLabel>Name</FormLabel>

                    <Input
                      size="sm"
                      value={userData.userName}
                      disabled
                      sx={(theme) => ({
                        color:
                          theme.palette.mode === "dark" ? "white" : "black",
                        "&.Mui-disabled": {
                          color:
                            theme.palette.mode === "dark" ? "white" : "black",
                        },
                      })}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormLabel>Mobile</FormLabel>
                    <Input
                      size="sm"
                      value={userData.userPhoneNumber}
                      disabled
                      sx={(theme) => ({
                        color:
                          theme.palette.mode === "dark" ? "white" : "black",
                        "&.Mui-disabled": {
                          color:
                            theme.palette.mode === "dark" ? "white" : "black",
                        },
                      })}
                    />
                  </Grid>

                  {/* 2nd row */}
                  <Grid item xs={12} className="mb-2">
                    <FormLabel>Address</FormLabel>

                    <Input
                      size="sm"
                      value={userData.userAddress}
                      disabled
                      sx={(theme) => ({
                        color:
                          theme.palette.mode === "dark" ? "white" : "black",
                        "&.Mui-disabled": {
                          color:
                            theme.palette.mode === "dark" ? "white" : "black",
                        },
                      })}
                    />
                  </Grid>

                  {/* 3rd row */}

                  <Grid item xs={12}>
                    <FormLabel>Email</FormLabel>

                    <Input
                      size="sm"
                      value={userData.userEmail}
                      disabled
                      sx={(theme) => ({
                        color:
                          theme.palette.mode === "dark" ? "white" : "black",
                        "&.Mui-disabled": {
                          color:
                            theme.palette.mode === "dark" ? "white" : "black",
                        },
                      })}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <div style={{ textAlign: "center" }}>
                      <Button
                        href="/updateAccount"
                        variant="contained"
                        className="header-btn register-btn mt-3 mx-1"
                        sx={{
                          backgroundColor: "var(--dark-blue)",
                          "&:hover": {
                            color: "white",
                          },
                        }}
                      >
                        Update Account
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
