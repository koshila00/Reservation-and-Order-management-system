import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/joy/Box";
import { useAlert } from "../AlertProvider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function AddCafe() {
  const [cafeItems, setCafeItems] = useState([]);
  const { showAlert } = useAlert();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCafeItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8099/api/v1/cafeitem/getAllCafeItems",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCafeItems(response.data.data);
      } catch (error) {
        showAlert("Error fetching details", "danger");
      }
    };

    fetchCafeItems();
  }, [token]);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "75vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell align="right">Item Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cafeItems.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Avatar src={row.cafeItemImage} />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography noWrap fontWeight="lg">
                          {row.cafeItemName}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{row.cafeItemPrice}</TableCell>
                  <TableCell align="right">{row.cafeItemQty}</TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "right",
                      }}
                    >
                      <Button size="sm" variant="plain" color="primary">
                        Send Quotation
                      </Button>

                      <Button size="sm" variant="soft" color="danger">
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
