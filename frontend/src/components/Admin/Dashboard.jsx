import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import logo from "../../images/logo.png";
import "../../styles/dashboard.css";
import HomeIcon from "@mui/icons-material/Home";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import Home from "./Home";
import Button from "@mui/material/Button";
import Reviews from "./Reviews";
import Discounts from "./Discounts";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import BookIcon from "@mui/icons-material/Book";
import HallInventory from "./HallInventory";
import CafeInventory from "./CafeInventory";
import AddCafe from "./AddCafe";
import OrdersGraph from "./OrdersGraph";
import BookingsAnalysis from "./BookingsAnalysis";
import CafeInventoryChart from "./CafeInventoryChart";
import Suppliers from "./Suppliers";

//Navigation
const nav = [
  { name: "Dashboard", icon: <HomeIcon />, path: "/admin/home" },

  {
    name: "Cafe",
    icon: <AutoAwesomeMotionIcon />,
    path: "/admin/cafeInventory",
  },
  {
    name: "Hall Menu Inventory",
    icon: <AutoAwesomeMotionIcon />,
    path: "/admin/hallInventory",
  },

  { name: "Reviews", icon: <EmojiPeopleIcon />, path: "/admin/reviews" },
  { name: "Discounts", icon: <BookIcon />, path: "/admin/discounts" },
  { name: "Suppliers", icon: <BookIcon />, path: "/admin/suppliers" },
];

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  backgroundColor: "var(--drawer-bg)",
  paddingLeft: "5px",
  border: 0,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
  width: `calc(${theme.spacing(7)} + 0px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 0px)`,
  },
  backgroundColor: "var(--drawer-bg)",
  paddingLeft: "5px",
  border: 0,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  color: "black",
  backgroundColor: "white",
  paddingLeft: "4rem",
  zIndex: 15,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    backgroundColor: "white",
    marginLeft: drawerWidth,
    paddingLeft: "0px",
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard() {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [windowName, setWindowName] = useState("Dashboard");

  const setWindow = (name) => {
    sessionStorage.setItem("window", name);
    setWindowName(name);
  };

  useEffect(() => {
    setWindowName(sessionStorage.getItem("window"));
    if (sessionStorage.getItem("deleted")) {
      setNotify({
        isOpen: true,
        message: "Member deleted",
        type: "success",
      });
      sessionStorage.removeItem("deleted");
    }
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("LoggedIn");
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar
          position="fixed"
          open={open}
          style={{
            boxShadow: "none",
            backgroundColor: "var(--dashboard-bg)",
          }}
        >
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="topBarLeft">
              <Tooltip title={open ? "Collapse" : "Expand"}>
                <IconButton
                  color="black"
                  aria-label="open drawer"
                  onClick={open ? handleDrawerClose : handleDrawerOpen}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <p className="pageName">{windowName}</p>
            </div>
            <div>
              <div className={open ? "hideIcons" : "showIcons"}>
                <Button variant="outlined" color="error" onClick={handleLogout}>
                  LOGOUT
                </Button>
              </div>
            </div>
          </Toolbar>
          <Divider
            variant="middle"
            sx={{
              height: "1.2px",
              backgroundColor: "var(--gray-dark)",
              marginBottom: "10px",
            }}
          />
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader
            sx={{
              margin: "10px 0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={open ? logo : logo}
              alt="Logo"
              className="logo"
              onClick={() => {
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            />
          </DrawerHeader>
          <Divider
            variant="middle"
            sx={{
              height: "1.2px",
              backgroundColor: "var(--gray-dark)",
              marginBottom: "10px",
            }}
          />
          <List>
            {nav.map((item, index) => (
              <ListItem
                key={item.name}
                disablePadding
                sx={{
                  display: "block",
                  padding: "5px 0px",
                }}
                onClick={() => {
                  setWindow(item.name);
                }}
              >
                <NavLink
                  to={item.path}
                  key={item._id}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Tooltip title={!open && item.name}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 2 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>

                      <ListItemText
                        primary={item.name}
                        sx={{
                          opacity: open ? 1 : 0,
                          fontWeight: "800",
                          color: "var(--gray)",
                        }}
                      />
                    </ListItemButton>
                  </Tooltip>
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexWrap: "wrap",
            justifyContent: "flex-start",
            flexGrow: 1,
            p: 3,
            backgroundColor: "var(--dashboard-bg)",
            minHeight: "100vh",
            paddingTop: "15px",
            overflowX: "hidden",
          }}
        >
          <DrawerHeader />

          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/reviews" element={<Reviews />} />
            <Route exact path="/hallInventory" element={<HallInventory />} />
            <Route exact path="/cafeInventory" element={<CafeInventory />} />
            <Route exact path="/discounts" element={<Discounts />} />
            <Route exact path="/suppliers" element={<Suppliers />} />
            <Route exact path="/addCafe" element={<AddCafe />} />
            <Route exact path="/orderGraph" element={<OrdersGraph />} />
            <Route
              exact
              path="/BookingsAnalysis"
              element={<BookingsAnalysis />}
            />
            <Route
              exact
              path="/CafeInventoryChart"
              element={<CafeInventoryChart />}
            />
          </Routes>
        </Box>
      </Box>
    </>
  );
}
