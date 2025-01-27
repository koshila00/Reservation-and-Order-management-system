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
  supplierName: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Name should only contain letters")
    .required("Supplier name is required"),
  supplierEmail: yup.string().email().required("Email Required!"),
});

export default function Suppliers() {
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
          "http://localhost:8099/api/v1/suppliyer/getAllSuppliers",
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
        "http://localhost:8099/api/v1/suppliyer/createSupplier",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("Supplier added successfully", "success");
      setLayout(undefined);
      setOpen(false);
      resetForm();

      // Fetch the updated list of cafe items
      const updatedItems = await axios.get(
        "http://localhost:8099/api/v1/suppliyer/getAllSuppliers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCafeItems(updatedItems.data.data);
    } catch (error) {
      showAlert("Error adding supplier", "danger");
      setLayout(undefined);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (discountId) => {
    try {
      setLayout("fullscreen");

      await axios.delete(
        `http://localhost:8099/api/v1/suppliyer/deleteSupplier/${discountId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("Supplier deleted successfully", "success");
      setLayout(undefined);

      // Fetch the updated list of cafe items
      const updatedItems = await axios.get(
        "http://localhost:8099/api/v1/suppliyer/getAllSuppliers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCafeItems(updatedItems.data.data);
    } catch (error) {
      showAlert("Error deleting supplier", "danger");
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
          Add Supplier
        </Button>
      </div>
      <Paper sx={{ width: "70%", overflow: "hidden", mr: "auto", ml: "auto" }}>
        <TableContainer sx={{ maxHeight: "75vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Supplier Name</TableCell>
                <TableCell align="center">Supplier Email</TableCell>
                <TableCell align="right">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cafeItems.map((row) => (
                <TableRow
                  key={row.supplierId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography noWrap>{row.supplierName}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{row.supplierEmail}</TableCell>
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
                        onClick={() => handleDelete(row.supplierId)}
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
          <DialogTitle>Add New Supplier</DialogTitle>
          <Formik
            initialValues={{
              supplierName: "",
              supplierEmail: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Supplier Name</FormLabel>
                    <Field name="supplierName" as={Input} required />
                    <ErrorMessage
                      name="supplierName"
                      component="div"
                      style={{ color: "red", fontSize: "0.8rem" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Supplier Email</FormLabel>
                    <Field
                      name="supplierEmail"
                      as={Input}
                      type="email"
                      required
                    />
                    <ErrorMessage
                      name="supplierEmail"
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
