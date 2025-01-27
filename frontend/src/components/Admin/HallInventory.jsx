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
import Button from "@mui/joy/Button";
import IconButton from "@mui/material/IconButton";
import { useAlert } from "../AlertProvider";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/joy/Typography";
import RemoveIcon from "@mui/icons-material/Remove";
import CircularProgress from "@mui/joy/CircularProgress";
import Modal from "@mui/joy/Modal";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/joy/Stack";
import DialogTitle from "@mui/joy/DialogTitle";
import Add from "@mui/icons-material/Add";
import ModalDialog from "@mui/joy/ModalDialog";
import Input from "@mui/joy/Input";
import ModalOverflow from "@mui/joy/ModalOverflow";
import MenuItem from "@mui/material/MenuItem";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import Textarea from "@mui/joy/Textarea";
import Select from "@mui/material/Select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  hallItemName: yup.string().required("Item name is required"),
  hallItemDescription: yup.string().required("Description is required"),
  hallItemPrice: yup
    .number()
    .required("Price is required")
    .positive()
    .integer(),
  hallItemQty: yup
    .number()
    .required("Quantity is required")
    .positive()
    .integer(),
});

const validationSchemaQuotation = yup.object().shape({
  cafeInventoryId: yup.string().required("Item Name is required"),
  qty: yup
    .number()
    .required("Quantity is required")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer")
    .moreThan(0, "Quantity must be greater than 0"),
  supplierId: yup.string().required("Supplier is required"),
});

export default function HallInventory() {
  const [hallItems, setHallItems] = useState([]);
  const [layout, setLayout] = useState(undefined);
  const [open, setOpen] = useState(false);
  const { showAlert } = useAlert();
  const token = localStorage.getItem("token");
  const [cafeSuppliers, setCafeSuppliers] = useState([]);
  const [quotationOpen, setQuotaionOpen] = useState(false);

  const [quotation, setQuotation] = useState({
    cafeInventoryId: "",
    qty: "",
    supplierId: "",
    type: 2
  });

  const handleChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;
      setQuotation({ ...quotation, [name]: value });
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { hallItemName, hallItemDescription, hallItemPrice, hallItemQty } =
      values;

    try {
      setLayout("fullscreen");
      const response = await axios.post(
        "http://localhost:8099/api/v1/hallinventory/createHallInventoryItem",
        {
          hallItemName: hallItemName,
          hallItemDescription: hallItemDescription,
          hallItemPrice: hallItemPrice,
          hallItemQty: hallItemQty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("Item added successfully", "success");
      setLayout(undefined);
      setOpen(false);
      resetForm();

      // Fetch the updated list of cafe items
      const updatedItems = await axios.get(
        "http://localhost:8099/api/v1/hallinventory/getAllHallInventoryItems",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHallItems(updatedItems.data.data);
    } catch (error) {
      showAlert("Error adding item", "danger");
      setLayout(undefined);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchHallItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8099/api/v1/hallinventory/getAllHallInventoryItems",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHallItems(response.data.data);
      } catch (error) {
        showAlert("Error fetching details", "danger");
      }
    };

    const fetchAllSuppliers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8099/api/v1/suppliyer/getAllSuppliers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCafeSuppliers(response.data.data);
      } catch (error) {
        showAlert("Error fetching details", "danger");
      }
    };

    fetchAllSuppliers();
    fetchHallItems();
  }, []);

  const handleSendQuotation = async () => {
    const { cafeInventoryId, qty, supplierId, type } = quotation;

    if (!cafeInventoryId || !qty || !supplierId) {
      showAlert("Please fill in all fields", "warning");
      return;
    }

    try {
      setLayout("fullscreen");

      const response = await axios.post(
        "http://localhost:8099/api/v1/quotation/createQuotation",
        {
          ...quotation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showAlert("Quotation sent successfully", "success");
      setLayout(undefined);
      setQuotaionOpen(false);
    } catch (error) {
      showAlert("Error sending quotation", "danger");
      console.error("Error sending quotation:", error);
      setLayout(undefined);
    }
  };

  const handleDelete = async (hallItemId) => {
    try {
      setLayout("fullscreen");

      const response = await axios.delete(
        `http://localhost:8099/api/v1/hallinventory/deleteHallInventoryItem/${hallItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("Item deleted successfully", "success");
      setLayout(undefined);

      // Fetch the updated list of hall items
      const updatedItems = await axios.get(
        "http://localhost:8099/api/v1/hallinventory/getAllHallInventoryItems",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHallItems(updatedItems.data.data);
    } catch (error) {
      showAlert("Error deleting item", "danger");
      console.log(error);
      setLayout(undefined);
    }
  };

  const incrementQuantity = async (hallItemId) => {
    try {
      setLayout("fullscreen");

      const response = await axios.post(
        `http://localhost:8099/api/v1/hallinventory/increase-one/${hallItemId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("Quantity increased successfully", "success");

      // Fetch the updated list of hall items
      const updatedItems = await axios.get(
        "http://localhost:8099/api/v1/hallinventory/getAllHallInventoryItems",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHallItems(updatedItems.data.data);

      setLayout(undefined);
    } catch (error) {
      showAlert("Error increasing quantity", "danger");
      console.log(error);
      setLayout(undefined);
    }
  };

  const decrementQuantity = async (hallItemId) => {
    try {
      setLayout("fullscreen");

      const response = await axios.post(
        `http://localhost:8099/api/v1/hallinventory/reduce-one/${hallItemId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("Quantity reduced successfully", "success");

      // Fetch the updated list of hall items
      const updatedItems = await axios.get(
        "http://localhost:8099/api/v1/hallinventory/getAllHallInventoryItems",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHallItems(updatedItems.data.data);

      setLayout(undefined);
    } catch (error) {
      showAlert("Error reducing quantity", "danger");
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
          startDecorator={<SendIcon />}
          onClick={() => setQuotaionOpen(true)}
          sx={{ backgroundColor: "var(--dark-blue)", color: "white", mr: 2 }}
        >
          Send Quotation
        </Button>
        <Button
          variant="soft"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
          sx={{ backgroundColor: "var(--dark-blue)", color: "white" }}
        >
          Add Item
        </Button>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell align="left">Item Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hallItems.map((row) => (
                <TableRow
                  key={row.hallInventoryItemId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.hallInventoryItemName}</TableCell>
                  <TableCell align="left">
                    {row.hallInventoryItemPrice}
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ mt: "auto", mb: "auto" }}>
                      <IconButton
                        sx={{
                          backgroundColor: "lightgray",
                          padding: "5px",
                          marginRight: "10px",
                        }}
                        onClick={() =>
                          decrementQuantity(row.hallInventoryItemId)
                        }
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography level="body-md">
                        {row.hallInventoryItemQty}
                      </Typography>
                      <IconButton
                        sx={{
                          backgroundColor: "lightgray",
                          padding: "5px",
                          marginLeft: "10px",
                        }}
                        onClick={() =>
                          incrementQuantity(row.hallInventoryItemId)
                        }
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Typography>
                  </TableCell>
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
                        onClick={() => handleDelete(row.hallInventoryItemId)}
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
      {/* Add Item Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{
            overflowY: "auto",
          }}
        >
          <DialogTitle>Add New Item to Hall</DialogTitle>
          <Formik
            initialValues={{
              hallItemName: "",
              hallItemDescription: "",
              hallItemPrice: "",
              hallItemQty: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Item Name</FormLabel>
                    <Field name="hallItemName" as={Input} required />
                    <ErrorMessage
                      name="hallItemName"
                      component="div"
                      style={{ color: "red", fontSize: "0.8rem" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Field
                      name="hallItemDescription"
                      as={Textarea}
                      variant="outlined"
                      required
                    />
                    <ErrorMessage
                      name="hallItemDescription"
                      component="div"
                      style={{ color: "red", fontSize: "0.8rem" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Price</FormLabel>
                    <Field
                      name="hallItemPrice"
                      as={Input}
                      required
                      type="number"
                    />
                    <ErrorMessage
                      name="hallItemPrice"
                      component="div"
                      style={{ color: "red", fontSize: "0.8rem" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Set Quantity</FormLabel>
                    <Field
                      name="hallItemQty"
                      as={Input}
                      required
                      type="number"
                    />
                    <ErrorMessage
                      name="hallItemQty"
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

      {/* Send Quotation Modal */}
      <Modal open={quotationOpen} onClose={() => setQuotaionOpen(false)}>
        <ModalDialog
          sx={{
            overflowY: "auto",
          }}
        >
          <DialogTitle>Send Quotation</DialogTitle>
          <Formik
            initialValues={{
              cafeInventoryId: "",
              qty: "",
              supplierId: "",
            }}
            validationSchema={validationSchemaQuotation}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const { cafeInventoryId, qty, supplierId } = values;

              if (!cafeInventoryId || !qty || !supplierId) {
                showAlert("Please fill in all fields", "warning");
                setSubmitting(false);
                return;
              }

              try {
                setLayout("fullscreen");

                const response = await axios.post(
                  "http://localhost:8099/api/v1/quotation/createQuotation",
                  {
                    cafeInventoryId,
                    qty,
                    supplierId,
                    type: 2,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                showAlert("Quotation sent successfully", "success");
                setLayout(undefined);
                setQuotaionOpen(false);
                resetForm();
              } catch (error) {
                showAlert("Error sending quotation", "danger");
                console.error("Error sending quotation:", error);
                setLayout(undefined);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Item Name</FormLabel>
                    <Field
                      name="cafeInventoryId"
                      as={Select}
                      sx={{
                        backgroundColor: "white",
                        height: "35px",
                      }}
                    >
                      {hallItems.map((row) => (
                        <MenuItem
                          key={row.hallInventoryItemId}
                          value={row.hallInventoryItemId}
                        >
                          {row.hallInventoryItemName}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="cafeInventoryId"
                      component="div"
                      style={{ color: "red", fontSize: "0.8rem" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Quantity</FormLabel>
                    <Field name="qty" as={Input} required type="number" />
                    <ErrorMessage
                      name="qty"
                      component="div"
                      style={{ color: "red", fontSize: "0.8rem" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Supplier</FormLabel>
                    <Field
                      name="supplierId"
                      as={Select}
                      sx={{
                        backgroundColor: "white",
                        height: "35px",
                      }}
                    >
                      {cafeSuppliers.map((supplier) => (
                        <MenuItem
                          key={supplier.supplierId}
                          value={supplier.supplierId}
                        >
                          {supplier.supplierName}
                        </MenuItem>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="supplierId"
                      component="div"
                      style={{ color: "red", fontSize: "0.8rem" }}
                    />
                  </FormControl>
                  <Button
                    sx={{ backgroundColor: "var(--dark-blue)", color: "white" }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Quotation"}
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
