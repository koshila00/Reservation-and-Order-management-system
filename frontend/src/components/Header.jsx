import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "../styles/header.css";
import logo from "../images/logo.png";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

function Header() {
  const [isScrolled, setScrolled] = useState(false);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const changeOnScroll = () => {
    if (window.scrollY >= 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener("scroll", changeOnScroll);

  // Avatar
  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  const handleLogout = () => {
    window.localStorage.removeItem("LoggedIn");
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.reload();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={isScrolled ? "sticky" : "nav-bar"}>
      <Navbar expand="lg">
        <Container className="header-container">
          <Navbar.Brand href="/">
            <img
              alt="Logo"
              src={logo}
              className="d-inline-block align-top logo-header"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-0 toggle-btn"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-center flex-grow-1 nav-items">
              <Nav.Link href="/" className="nav-links">
                Home
              </Nav.Link>
              <Nav.Link href="/aboutus" className="nav-links">
                About Us
              </Nav.Link>
              <Nav.Link href="/contact" className="nav-links">
                Contact
              </Nav.Link>

              <Nav.Link href={token ? "/cafe" : "/login"} className="nav-links">
                Menu
              </Nav.Link>
            </Nav>

            {window.localStorage.getItem("LoggedIn") ? (
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <AccountCircleIcon sx={{ fontSize: "2.8rem" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleClose}
                    className="mb-2"
                  >
                    <Avatar /> My Profile
                  </MenuItem>
                  {role === "admin" && (
                    <MenuItem
                      component={Link}
                      to="/admin/home"
                      onClick={handleClose}
                      className="mb-2"
                    >
                      <Avatar /> Dashboard
                    </MenuItem>
                  )}
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </React.Fragment>
            ) : (
              <Button
                variant="outline-light"
                href="/login"
                className="header-btn register p-2 px-4 pe-4"
              >
                Login
                <LoginIcon className="mx-2" fontSize="small" />
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
