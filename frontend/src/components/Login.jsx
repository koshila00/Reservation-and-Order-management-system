import React, { useState } from "react";
import "../styles/login.css";
import logo from "../images/logo.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./AlertProvider";

export default function Login() {
  const { showAlert } = useAlert();

  // VALIDATIONS
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setValidated(true);
      try {
        await axios
          .post("http://localhost:8099/api/v1/user/login", {
            userEmail: formData.email,
            userPassword: formData.password,
          })
          .then((res) => {
            showAlert("Login Successful", "success");

            const { token, role } = res.data.data; // Access role from response

            // Store token and user details in local storage
            localStorage.setItem("LoggedIn", true);
            localStorage.setItem("role", role);
            localStorage.setItem("token", token);
            const decodedToken = jwtDecode(token);
            localStorage.setItem("user", JSON.stringify(decodedToken));

            if (decodedToken.role === "admin") {
              navigate("/admin/home");
            } else {
              navigate("/");
            }
          })
          .catch((err) => {
            if (
              err.response &&
              err.response.data &&
              err.response.data.errorMessage
            ) {
              showAlert(err.response.data.errorMessage, "danger");
            } else {
              showAlert("An error occurred. Please try again later.", "danger");
            }
          });
      } catch (err) {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          showAlert(err.response.data.errorMessage, "danger");
        } else {
          showAlert("An error occurred. Please try again later.", "danger");
        }
      }
    }
  };

  return (
    <div className="login-main">
      <div className="login-container container">
        <a href="/" className="logo-div">
          <img
            src={logo}
            className="img-fluid footer-logo logo-login"
            alt="Logo"
          />
        </a>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="login-form"
        >
          <div className="login-lead">Login to Siyasra</div>
          <Form.Group
            className="form-group"
            controlId="validationCustomUsername"
          >
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mail@example.com"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="form-group" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password here"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter the password.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Button
            variant="bg-danger"
            type="submit"
            className="header-btn register browse-btn signin-btn"
          >
            Sign in
          </Button>

          <div className="signup-div form-label">
            Don't have an account? <a href="/register">Sign up </a>
          </div>
        </Form>
      </div>
    </div>
  );
}
