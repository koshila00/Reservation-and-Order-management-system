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
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import Textarea from "@mui/joy/Textarea";
import Switch from "@mui/joy/Switch";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ModalClose from "@mui/joy/ModalClose";
import ModalOverflow from "@mui/joy/ModalOverflow";
import CircularProgress from "@mui/joy/CircularProgress";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  discountName: yup.string().required("Discount name is required"),
  discountPercentage: yup
    .number()
    .required("Discount percentage is required")
    .min(1, "Discount percentage must be at least 1")
    .max(100, "Discount percentage must be at most 100"),
});

export default function Discounts() {
  const [layout, setLayout] = useState(undefined);
  const [scroll, setScroll] = useState(true);
  const [open, setOpen] = useState(false);
  const [cafeItems, setCafeItems] = useState([]);
  const { showAlert } = useAlert();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCafeItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8099/api/v1/discount/getAllDiscounts",
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

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setLayout("fullscreen");
      await axios.post(
        "http://localhost:8099/api/v1/discount/createDiscount",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("Discount added successfully", "success");
      setLayout(undefined);
      setOpen(false);
      resetForm();

      // Fetch the updated list of cafe items
      const updatedItems = await axios.get(
        "http://localhost:8099/api/v1/discount/getAllDiscounts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCafeItems(updatedItems.data.data);
    } catch (error) {
      showAlert("Error adding Discount", "danger");
      setLayout(undefined);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (discountId) => {
    try {
      setLayout("fullscreen");

      await axios.delete(
        `http://localhost:8099/api/v1/discount/deleteDiscount/${discountId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("Discount deleted successfully", "success");
      setLayout(undefined);

      // Fetch the updated list of cafe items
      const updatedItems = await axios.get(
        "http://localhost:8099/api/v1/discount/getAllDiscounts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCafeItems(updatedItems.data.data);
    } catch (error) {
      showAlert("Error deleting Discount", "danger");
      console.log(error);
      setLayout(undefined);
    }
  };

  return (
    <>
      <div className="mb-2" style={{ textAlign: "right" }}>
        <Button
          variant="soft"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
          sx={{ backgroundColor: "var(--dark-blue)", color: "white" }}
        >
          Add Discount
        </Button>
      </div>
      <Paper sx={{ width: "70%", overflow: "hidden", mr: "auto", ml: "auto" }}>
        <TableContainer sx={{ maxHeight: "75vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Discount Name</TableCell>
                <TableCell align="center">Discount Percentage</TableCell>
                <TableCell align="right">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cafeItems.map((row) => (
                <TableRow
                  key={row.discountId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography noWrap>{row.discountName}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{row.discountPercentage}</TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "right",
                      }}
                    >
                      <Button
                        size="sm"
                        variant="soft"
                        color="danger"
                        onClick={() => handleDelete(row.discountId)}
                      >
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

      {/* Add */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{
            overflowY: "auto",
          }}
        >
          <DialogTitle>Add New Discount</DialogTitle>
          <Formik
            initialValues={{
              discountName: "",
              discountPercentage: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Discount Name</FormLabel>
                    <Field name="discountName" as={Input} required />
                    <ErrorMessage
                      name="discountName"
                      component="div"
                      style={{ color: "red", fontSize: "0.8rem" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Discount Percentage</FormLabel>
                    <Field
                      name="discountPercentage"
                      as={Input}
                      type="number"
                      required
                    />
                    <ErrorMessage
                      name="discountPercentage"
                      component="div"
                      style={{ color: "red", fontSize: "0.8rem" }}
                    />
                  </FormControl>

                  <Button
                    sx={{ backgroundColor: "var(--dark-blue)", color: "white" }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </ModalDialog>
      </Modal>

      {/* Loader */}
      <Modal open={!!layout}>
        <ModalOverflow>
          <ModalDialog
            aria-labelledby="modal-dialog-overflow"
            layout={layout}
            sx={{ backgroundColor: "transparent" }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                flexWrap: "wrap",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <CircularProgress size="lg" color="warning" />
            </Box>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </>
  );
}
