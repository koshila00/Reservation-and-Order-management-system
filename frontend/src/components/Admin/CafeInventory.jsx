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
import ModalOverflow from "@mui/joy/ModalOverflow";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/joy/CircularProgress";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as Yup from "yup";

// Styled component for hidden input
const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const validationSchema = yup.object({
  cafeItemName: yup.string().required("Item name is required"),
  cafeItemDescription: yup.string().required("Description is required"),
  cafeItemPrice: yup
    .number()
    .required("Price is required")
    .positive()
    .integer(),
  cafeItemQty: yup
    .number()
    .required("Quantity is required")
    .positive()
    .integer(),
  cafeItemImage: yup
    .mixed()
    .required("An image is required")
    .test("fileSize", "The file is too large", (value) => {
      return value && value.size <= 2000000; // 2MB
    })
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value && ["image/jpeg", "image/jpg", "image/png"].includes(value.type)
      );
    }),
});

const validationSchemaQuotation = Yup.object().shape({
  cafeInventoryId: Yup.string().required("Item Name is required"),
  qty: Yup.number()
    .required("Quantity is required")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer")
    .moreThan(0, "Quantity must be greater than 0"),
  supplierId: Yup.string().required("Supplier is required"),
});

export default function CafeInventory() {
  const [layout, setLayout] = useState(undefined);
  const [scroll, setScroll] = useState(true);
  const [open, setOpen] = useState(false);
  const [quotationOpen, setQuotaionOpen] = useState(false);
  const [cafeItems, setCafeItems] = useState([]);
  const [cafeSuppliers, setCafeSuppliers] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState({});
  const { showAlert } = useAlert();
  const token = localStorage.getItem("token");

  const [quotation, setQuotation] = useState({
    cafeInventoryId: "",
    qty: "",
    supplierId: "",
    type: 1
  });

  const handleChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;
      setQuotation({ ...quotation, [name]: value });
    }
  };

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
    fetchCafeItems();
  }, [token]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const {
      cafeItemName,
      cafeItemDescription,
      cafeItemPrice,
      cafeItemQty,
      cafeItemImage,
    } = values;

    const form = new FormData();
    form.append("cafeItemName", cafeItemName);
    form.append("cafeItemDescription", cafeItemDescription);
    form.append("cafeItemPrice", cafeItemPrice);
    form.append("cafeItemQty", cafeItemQty);
    form.append("cafeItemImage", cafeItemImage);

    try {
      setLayout("fullscreen");
      const response = await axios.post(
        "http://localhost:8099/api/v1/cafeitem/createCafeItem",
        form,
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
        "http://localhost:8099/api/v1/cafeitem/getAllCafeItems",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCafeItems(updatedItems.data.data);
    } catch (error) {
      showAlert("Error adding item", "danger");
      setLayout(undefined);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (cafeItemId) => {
    try {
      setLayout("fullscreen");

      const response = await axios.delete(
        `http://localhost:8099/api/v1/cafeitem/deleteCafeItem/${cafeItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("Item deleted successfully", "success");
      setLayout(undefined);

      // Fetch the updated list of cafe items
      const updatedItems = await axios.get(
        "http://localhost:8099/api/v1/cafeitem/getAllCafeItems",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCafeItems(updatedItems.data.data);
    } catch (error) {
      showAlert("Error deleting item", "danger");
      console.log(error);
      setLayout(undefined);
    }
  };

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
                  key={row.cafeItemId}
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
                      <Button
                        size="sm"
                        variant="soft"
                        color="danger"
                        onClick={() => handleDelete(row.cafeItemId)}
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
          <DialogTitle>Add New Item to Cafe</DialogTitle>
          <Formik
            initialValues={{
              cafeItemName: "",
              cafeItemDescription: "",
              cafeItemPrice: "",
              cafeItemQty: "",
              cafeItemImage: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Item Name</FormLabel>
                    <Field name="cafeItemName" as={Input} required />
                    <ErrorMessage
                      name="cafeItemName"
                      component="div"
                      style={{ color: "red", fontSize: "0.8rem" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Field
                      name="cafeItemDescription"
                      as={Textarea}
                      variant="outlined"
                      required
                    />
                    <ErrorMessage
                      name="cafeItemDescription"
                      component="div"
                      style={{ color: "red", fontSize: "0.8rem" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Price</FormLabel>
                    <Field
                      name="cafeItemPrice"
                      as={Input}
                      required
                      type="number"
                    />
                    <ErrorMessage
                      name="cafeItemPrice"
                      component="div"
                      style={{ color: "red", fontSize: "0.8rem" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Set Quantity</FormLabel>
                    <Field
                      name="cafeItemQty"
                      as={Input}
                      required
                      type="number"
                    />
                    <ErrorMessage
                      name="cafeItemQty"
                      component="div"
                      style={{ color: "red", fontSize: "0.8rem" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Upload a file</FormLabel>
                    <Button
                      component="label"
                      role={undefined}
                      tabIndex={-1}
                      variant="outlined"
                      color="neutral"
                      startDecorator={
                        <SvgIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                            />
                          </svg>
                        </SvgIcon>
                      }
                    >
                      Upload a file
                      <VisuallyHiddenInput
                        type="file"
                        name="cafeItemImage"
                        onChange={(event) => {
                          setFieldValue("cafeItemImage", event.target.files[0]);
                        }}
                      />
                    </Button>
                    <ErrorMessage
                      name="cafeItemImage"
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
                    type: 1,
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
              }

              setSubmitting(false);
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Item Name</FormLabel>
                    <Field
                      name="cafeInventoryId"
                      as={Select}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        backgroundColor: "white",
                        height: "35px",
                      }}
                      onChange={(e) =>
                        setFieldValue("cafeInventoryId", e.target.value)
                      }
                    >
                      {cafeItems.map((row) => (
                        <MenuItem key={row.cafeItemId} value={row.cafeItemId}>
                          {row.cafeItemName}
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
                    <Field name="qty" as={Input} type="number" required />
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
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{
                        backgroundColor: "white",
                        height: "35px",
                      }}
                      onChange={(e) =>
                        setFieldValue("supplierId", e.target.value)
                      }
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
                    {isSubmitting ? "Submitting..." : "Send Quotation"}
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
