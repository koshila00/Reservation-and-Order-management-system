import React from "react";
import { useFormikContext } from "formik";
import { Button } from "@mui/material";

const SubmitButton = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configBtn = {
    ...otherProps,
    variant: "contained",
    onClick: handleSubmit,
  };

  return (
    <Button
      {...configBtn}
      sx={{
        fontWeight: "600",
        padding: "8px 20px",
        borderRadius: "5px",
        backgroundColor: "var(--dark-blue)",
        color: "var(--white)",
        "&:last-child td, &:last-child th": { border: 0 },
        "&:hover": {
          backgroundColor: "var(--white)",
          color: "var(--light-blue)",
          borderRadius: "5px",
          border: "0px solid var(--white)",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
