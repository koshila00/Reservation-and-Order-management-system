import React, { useState, useEffect, useRef } from "react";
import './OrderDataTable.css';
import { Table, Container } from 'react-bootstrap';
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import Button from "@mui/joy/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  parseISO,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  eachWeekOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  format,
} from "date-fns";
import letterHead from "../../images/letterhead.jpg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const BookingsAnalysis = () => {
  const [chartData, setChartData] = useState([]);
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("weekly");
  const token = localStorage.getItem("token");
  const chartRef = useRef();
  const tableRef = useRef();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8099/api/v1/hallbooking/getAllHallBookings",
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

  useEffect(() => {
    if (data.length > 0) {
      processData();
    }
  }, [data, chartType]);

  const processData = () => {
    const groupByPeriod = (startFn, endFn, eachIntervalFn, formatStr) => {
      const periods = eachIntervalFn({
        start: startFn(new Date(data[0].hallBookingDate)),
        end: new Date(),
      });

      const groupedData = periods.map((period) => {
        const periodStr = format(period, formatStr);
        const total = data
          .filter((booking) => {
            const date = parseISO(booking.hallBookingDate);
            return date >= period && date <= endFn(period);
          })
          .reduce((sum, booking) => sum + booking.hallBookingTotal, 0);
        return { x: periodStr, y: total };
      });

      return groupedData;
    };

    let chartData = [];
    switch (chartType) {
      case "weekly":
        chartData = groupByPeriod(
          startOfWeek,
          endOfWeek,
          eachWeekOfInterval,
          "yyyy-MM-dd"
        );
        break;
      case "monthly":
        chartData = groupByPeriod(
          startOfMonth,
          endOfMonth,
          eachMonthOfInterval,
          "yyyy-MM"
        );
        break;
      case "yearly":
        chartData = groupByPeriod(
          startOfYear,
          endOfYear,
          eachYearOfInterval,
          "yyyy"
        );
        break;
      default:
        break;
    }

    setChartData(chartData);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Hall Booking Totals (${chartType.charAt(0).toUpperCase() + chartType.slice(1)
          })`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Amount (Rs.)",
        },
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Week, Month or Year",
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
    pdf.text("Hall Reservation Analytic Report", pageWidth / 2, yPosition, { align: "center" });
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
        pdf.save("hall_booking_report.pdf");
      };
    };
  };


  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleViewTable = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div>
        <h3>Hall Booking Chart</h3>
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
        <label htmlFor="chartType">Select Chart Type: </label>
        <select
          id="chartType"
          value={chartType}
          onChange={handleChartTypeChange}
        >
          <option value="weekly">Week</option>
          <option value="monthly">Month</option>
          <option value="yearly">Year</option>
        </select>
      </div>

      <div ref={chartRef}>
        <Line
          options={chartOptions}
          data={{
            datasets: [
              {
                label: ` ${chartType.charAt(0).toUpperCase() + chartType.slice(1)
                  } Total Amount`,
                data: chartData,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          }}
        />
      </div>

      <Container ref={tableRef} className="mt-4">
        <h3 className="mb-4 text-primary">Hall Booking Data Table</h3>
        <Table striped bordered hover responsive variant="dark" className="table-custom">
          <thead>
            <tr>
              <th>{chartType.charAt(0).toUpperCase() + chartType.slice(1)}</th>
              <th>Total Amount of Hall Bookings (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((dataPoint, index) => (
              <tr key={index}>
                <td>{dataPoint.x}</td>
                <td>{dataPoint.y}</td>
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

export default BookingsAnalysis;
