import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

const DateTextField = ({
  value: propValue,
  onErrorChanged,
  onDateChanged,
  hint,
  hintColor = "black", // Default hint color is black
  helperText,
  validationRules = [],
  textColor = "grey"
}) => {
  const [inputValue, setInputValue] = useState(propValue || "");
  const [errorText, setErrorText] = useState(null);

  useEffect(() => {
    validateInput(inputValue);
  }, [inputValue]);

  useEffect(() => {
    setInputValue(propValue || "");
  }, [propValue]);

  const validateInput = (value) => {
    let error = null;
    for (const rule of validationRules) {
      error = rule(value);
      if (error) break;
    }
    setErrorText(error);
    onErrorChanged(error);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setInputValue(selectedDate);
    onDateChanged(selectedDate);
  };

  return (
    <div>
      {hint && <div style={{ color: hintColor }}>{hint}</div>}
      <TextField
        type="date"
        value={inputValue}
        onChange={handleDateChange}
        variant="outlined"
        fullWidth
        style={{ marginTop: 8 }}
        InputLabelProps={{ shrink: true }} 
      />
      {errorText && <div style={{ color: "red" }}>{errorText}</div>}
      {helperText && <div style={{ color: "black" }}>{helperText}</div>}
    </div>
  );
};

export default DateTextField;