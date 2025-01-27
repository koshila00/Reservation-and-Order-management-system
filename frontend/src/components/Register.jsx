import React, { useState, useEffect } from "react";
import "../styles/login.css";
import logo from "../images/logo.png";
import Form from "react-bootstrap/Form";
import countries from "../json/countries.json";
import axios from "axios";
import { Grid } from "@mui/material";
import { useFormik, Formik, Field } from "formik";
import * as Yup from "yup";
import TextField from "./FormsUI/TextField";
import SelectField from "./FormsUI/SelectField";
import DatePicker from "./FormsUI/DatePicker";
import SubmitButton from "./FormsUI/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./AlertProvider";

// FORMIK
const INITIAL_FORM_STATE = {
  name: "",
  mobile: "",
  address: "",
  email: "",
  password: "",
  confirmpwd: "",
};

// YUP
const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Name should only contain letters")
    .required("Required!"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile should be 10 digits & only numbers")
    .required("Required!"),
  address: Yup.string().required("Required!"),
  email: Yup.string().email().required("Required!"),
  password: Yup.string()
    .required("Required!")
    .required('Required!')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  confirmpwd: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required!"),
});

export default function Register() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  return (
    <div className="login-main">
      <div className="login-container container register-container">
        <a href="/" className="logo-div">
          <img
            src={logo}
            className="img-fluid footer-logo logo-login"
            alt="Logo"
          />
        </a>

        <div className="login-form">
          <div className="login-lead">Create Account</div>

          <Formik
            initialValues={{ ...INITIAL_FORM_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={async (values) => {
              if (values.password !== values.confirmpwd) {
                alert("Passwords do not match!");
                return;
              }
              await axios
                .post("http://localhost:8099/api/v1/user/register", {
                  userName: values.name,
                  userPhoneNumber: values.mobile,
                  userAddress: values.address,
                  userEmail: values.email,
                  userPassword: values.password,
                  userRole: "user",
                })
                .then((res) => {
                  showAlert(`User added successfully`, "success");
                  navigate("/login");
                })
                .catch((err) => {
                  if (
                    err.response &&
                    err.response.data &&
                    err.response.data.errorMessage
                  ) {
                    showAlert(err.response.data.errorMessage, "danger");
                  } else {
                    showAlert(
                      "An error occurred. Please try again later.",
                      "danger"
                    );
                  }
                });
            }}
          >
            <Grid container sx={{}} spacing={2}>
              {/* 1st row */}

              <Grid item xs={6}>
                <Form.Label>First Name</Form.Label>
                <TextField name="name" placeholder="Enter first name" />
              </Grid>
              <Grid item xs={6}>
                <Form.Label>Mobile</Form.Label>
                <TextField name="mobile" placeholder="Enter phone no." />
              </Grid>

              {/* 2nd row */}
              <Grid item xs={12}>
                <Form.Label>Address</Form.Label>
                <TextField
                  name="address"
                  placeholder="Enter your home address"
                />
              </Grid>

              {/* 3rd row */}

              <Grid item xs={12}>
                <Form.Label>Email</Form.Label>
                <TextField name="email" placeholder="Enter email" />
              </Grid>

              {/* 4th row */}

              <Grid item xs={12}>
                <Form.Label>Create Password</Form.Label>
                <TextField
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
              </Grid>

              <Grid item xs={12}>
                <Form.Label>Confirm Password</Form.Label>
                <TextField
                  name="confirmpwd"
                  type="password"
                  placeholder="Re-enter your password"
                />
              </Grid>

              <Grid item xs={12}>
                <SubmitButton
                  variant="bg-danger"
                  type="submit"
                  className="header-btn register browse-btn signin-btn register-btn"
                  style={{ marginBottom: "30px" }}
                >
                  Create Account
                </SubmitButton>

                <div className="signup-div form-label">
                  Already have an account? <a href="/login">Log In</a>
                </div>
              </Grid>
            </Grid>
          </Formik>
        </div>
      </div>
    </div>
  );
}
