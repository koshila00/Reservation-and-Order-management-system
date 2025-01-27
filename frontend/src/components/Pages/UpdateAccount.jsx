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

// FORMIK
const INITIAL_FORM_STATE = {
  userName: "",
  userPhoneNumber: "",
  userAddress: "",
  userEmail: "",
};

// YUP
const FORM_VALIDATION = Yup.object().shape({
  userName: Yup.string().required("Required!"),
  userPhoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile should be 10 digits & only numbers")
    .required("Required!"),
  userAddress: Yup.string().required("Required!"),
  userEmail: Yup.string().email().required("Required!"),
});

export default function Cart() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const formik = useFormik({
    initialValues: {
      userName: "",
      userPhoneNumber: "",
      userAddress: "",
      userEmail: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Required!"),
      userPhoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile should be 10 digits & only numbers")
        .required("Required!"),
      userAddress: Yup.string().required("Required!"),
      userEmail: Yup.string().email().required("Required!"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await updateUser(values);
      } catch (error) {
        console.error("Error updating account:", error);
      }
    },
  });

  // Function to update user information
  const updateUser = async (userData) => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `http://localhost:8099/api/v1/user/updateUser`,
        {
          userName: userData.userName,
          userPhoneNumber: userData.userPhoneNumber,
          userAddress: userData.userAddress,
        },
        config
      );

      showAlert(`User updated successfully`, "success");
      navigate("/profile");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showAlert(error.response.data.errorMessage, "danger");
      } else {
        showAlert("An error occurred. Please try again later.", "danger");
      }
    }
  };

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

      const userDataFromApi = response.data.data;
      formik.setValues({
        userName: userDataFromApi.userName,
        userPhoneNumber: userDataFromApi.userPhoneNumber,
        userAddress: userDataFromApi.userAddress,
        userEmail: userDataFromApi.userEmail,
      });
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

  return (
    <div className="main-top">
      <div className="tutContainer">
        <div className="home-main container pageMain">
          <div className="login-container container register-container">
            <div className="login-form pt-4" style={{ width: "550px" }}>
              <div className="login-lead">Update Your Profile</div>

              <Formik>
                <Grid container sx={{}} spacing={2}>
                  {/* 1st row */}

                  <Grid item xs={6}>
                    <Form.Label>Name</Form.Label>
                    <TextField
                      name="userName"
                      placeholder="Enter first name"
                      {...formik.getFieldProps("userName")}
                      error={
                        formik.touched.userName &&
                        Boolean(formik.errors.userName)
                      }
                      helperText={
                        formik.touched.userName && formik.errors.userName
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Form.Label>Mobile</Form.Label>
                    <TextField
                      name="userPhoneNumber"
                      placeholder="Enter phone no."
                      {...formik.getFieldProps("userPhoneNumber")}
                      error={
                        formik.touched.userPhoneNumber &&
                        Boolean(formik.errors.userPhoneNumber)
                      }
                      helperText={
                        formik.touched.userPhoneNumber &&
                        formik.errors.userPhoneNumber
                      }
                    />
                  </Grid>

                  {/* 2nd row */}
                  <Grid item xs={12}>
                    <Form.Label>Address</Form.Label>
                    <TextField
                      name="userAddress"
                      placeholder="Enter your home address"
                      {...formik.getFieldProps("userAddress")}
                      error={
                        formik.touched.userAddress &&
                        Boolean(formik.errors.userAddress)
                      }
                      helperText={
                        formik.touched.userAddress && formik.errors.userAddress
                      }
                    />
                  </Grid>

                  {/* 3rd row */}

                  <Grid item xs={12}>
                    <Form.Label>Email</Form.Label>
                    <TextField
                      name="userEmail"
                      placeholder="Enter email"
                      {...formik.getFieldProps("userEmail")}
                      error={
                        formik.touched.userEmail &&
                        Boolean(formik.errors.userEmail)
                      }
                      helperText={
                        formik.touched.userEmail && formik.errors.userEmail
                      }
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      className="header-btn register-btn mt-2"
                      sx={{
                        backgroundColor: "var(--dark-blue)",
                        "&:hover": {
                          color: "white",
                        },
                        width: "100%",
                      }}
                      onClick={formik.handleSubmit}
                    >
                      Update Account
                    </Button>
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
