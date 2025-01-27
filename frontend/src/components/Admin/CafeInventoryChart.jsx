import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Table, Container } from 'react-bootstrap';
import './OrderDataTable.css';
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Button from "@mui/joy/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import letterHead from "../../images/letterhead.jpg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CafeInventoryChart = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const chartRef = useRef();
  const tableRef = useRef();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8099/api/v1/cafeitem/getAllCafeItems",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [token]);

  const chartData = {
    labels: data.map((item) => item.cafeItemName),
    datasets: [
      {
        label: "Item Quantity",
        data: data.map((item) => item.cafeItemQty),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Cafe Inventory",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantity (Number of Item)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Item Name",
        },
      },
    },
  };

  const generatePDF = async () => {
    const chartElement = chartRef.current;
    const tableElement = tableRef.current;

    // Generate canvas for chart and table
    const chartCanvas = await html2canvas(chartElement);
    const chartImgData = chartCanvas.toDataURL("image/png");

    const tableCanvas = await html2canvas(tableElement);
    const tableImgData = tableCanvas.toDataURL("image/png");

    const pdf = new jsPDF();

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth - 20; // Margin for image
    const imgHeight = pageHeight - 20; // Margin for image

    let yPosition = 10; // Start position for the content

    // Add letterhead image
    const letterHeadHeight = 60;
    pdf.addImage(letterHead, "JPEG", 10, yPosition, pageWidth - 20, letterHeadHeight);
    yPosition += letterHeadHeight + 10; // Adjust for letterhead height and margin

    // Add title
    pdf.setFontSize(16);
    pdf.text("Cafe Order Report", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 20; // Adjust for title and margin

    // Add chart image
    const chartImg = new Image();
    chartImg.src = chartImgData;
    chartImg.onload = () => {
      const chartHeight = (chartImg.height * imgWidth) / chartImg.width;
      if (yPosition + chartHeight > pageHeight - 10) {
        pdf.addPage(); // Add a new page if chart does not fit
        yPosition = 10; // Reset yPosition for new page
      }
      pdf.addImage(chartImgData, "PNG", 10, yPosition, imgWidth, chartHeight);
      yPosition += chartHeight + 10; // Adjust for chart height and margin

      // Add table image
      const tableImg = new Image();
      tableImg.src = tableImgData;
      tableImg.onload = () => {
        const tableHeight = (tableImg.height * imgWidth) / tableImg.width;
        if (yPosition + tableHeight > pageHeight - 10) {
          pdf.addPage(); // Add a new page if table does not fit
          yPosition = 10; // Reset yPosition for new page
        }
        pdf.addImage(tableImgData, "PNG", 10, yPosition, imgWidth, tableHeight);

        // Save PDF
        pdf.save("cafe_inventort_report.pdf");
      };
    };
  };

  const handleViewTable = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <h3>Cafe Inventory Chart</h3>
      <Button
        variant="soft"
        color="neutral"
        sx={{ backgroundColor: "var(--dark-blue)", color: "white", mr: 2 }}
        onClick={generatePDF}
      >
        Download Report
      </Button>
      <Button
        variant="soft"
        color="neutral"
        sx={{ backgroundColor: "var(--dark-blue)", color: "white", mr: 2 }}
        onClick={handleViewTable}
      >
        View Data Table
      </Button>

      <div ref={chartRef}>
        <Bar data={chartData} options={options} />
      </div>
      <Container ref={tableRef} className="mt-4">
        <h3 className="mb-4 text-primary">Cafe Inventory Table</h3>
        <Table striped bordered hover responsive variant="dark" className="table-custom">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.cafeItemName}</td>
                <td>{item.cafeItemQty}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Button
        variant="soft"
        color="neutral"
        sx={{ backgroundColor: "var(--dark-blue)", color: "white", mr: 2 }}
        onClick={generatePDF}
      >
        Download Report
      </Button>

    </div>
  );
};

export default CafeInventoryChart;
