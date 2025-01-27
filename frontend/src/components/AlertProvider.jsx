import React, { createContext, useContext, useState } from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

const alertIcons = {
  success: <CheckCircleIcon />,
  warning: <WarningIcon />,
  danger: <ReportIcon />,
  neutral: <InfoIcon />,
};

const alertDisplayNames = {
  success: "Success",
  warning: "Warning",
  danger: "Error",
  neutral: "Info",
};

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "neutral") => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 5000); // Alert will disappear after 5 seconds
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Box
          sx={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 100000,
          }}
        >
          <Alert
            sx={{ alignItems: "flex-start" }}
            startDecorator={alertIcons[alert.type]}
            variant="soft"
            color={alert.type}
            endDecorator={
              <IconButton
                variant="soft"
                color={alert.type}
                onClick={() => setAlert(null)}
              >
                <CloseRoundedIcon />
              </IconButton>
            }
          >
            <div>
              <div>{alertDisplayNames[alert.type]}</div>
              <Typography level="body-sm" color={alert.type}>
                {alert.message}
              </Typography>
            </div>
          </Alert>
        </Box>
      )}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
