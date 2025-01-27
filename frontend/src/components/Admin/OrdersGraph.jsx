import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './OrderDataTable.css';
import { Table, Container } from 'react-bootstrap';
import { Bar } from "react-chartjs-2";
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
import { format, parseISO, getYear, getMonth, getWeek } from "date-fns";
import { useNavigate } from 'react-router-dom';
import html2canvas from "html2canvas";
import Button from "@mui/joy/Button";
import jsPDF from "jspdf";
import letterHead from "../../images/letterhead.jpg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrdersGraph = () => {
  const [graphType, setGraphType] = useState("weekly");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [availableYears, setAvailableYears] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [availableWeeks, setAvailableWeeks] = useState([]);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const chartRef = useRef();
  const tableRef = useRef();
  const navigate = useNavigate();

  const handleDownload = async () => {
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
        pdf.save("order_report.pdf");
      };
    };
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8099/api/v1/cafeorder/getAllCafeOrders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const years = [
        ...new Set(orders.map((order) => getYear(parseISO(order.createdDate)))),
      ];
      setAvailableYears(years.sort((a, b) => a - b));
      setSelectedYear(years[years.length - 1]); // Set most recent year as default
    }
  }, [orders]);

  useEffect(() => {
    if (selectedYear) {
      const months = [
        ...new Set(
          orders
            .filter(
              (order) => getYear(parseISO(order.createdDate)) === selectedYear
            )
            .map((order) => getMonth(parseISO(order.createdDate)))
        ),
      ];
      setAvailableMonths(months.sort((a, b) => a - b));
      setSelectedMonth(months[0]); // Set first month as default
    }
  }, [selectedYear, orders]);

  useEffect(() => {
    if (selectedYear && selectedMonth !== null) {
      const weeks = [
        ...new Set(
          orders
            .filter((order) => {
              const date = parseISO(order.createdDate);
              return (
                getYear(date) === selectedYear &&
                getMonth(date) === selectedMonth
              );
            })
            .map((order) => getWeek(parseISO(order.createdDate)))
        ),
      ];
      setAvailableWeeks(weeks.sort((a, b) => a - b));
      setSelectedWeek(weeks[0]); // Set first week as default
    }
  }, [selectedYear, selectedMonth, orders]);

  useEffect(() => {
    processData();
  }, [graphType, selectedYear, selectedMonth, selectedWeek, orders]);

  const processData = () => {
    let filteredOrders = orders;
    let labels = [];
    let totals = [];
    let counts = [];

    if (selectedYear) {
      filteredOrders = filteredOrders.filter(
        (order) => getYear(parseISO(order.createdDate)) === selectedYear
      );
    }

    if (graphType === "monthly" && selectedMonth !== null) {
      filteredOrders = filteredOrders.filter(
        (order) => getMonth(parseISO(order.createdDate)) === selectedMonth
      );
    }

    if (graphType === "weekly" && selectedWeek !== null) {
      filteredOrders = filteredOrders.filter(
        (order) => getWeek(parseISO(order.createdDate)) === selectedWeek
      );
    }

    switch (graphType) {
      case "yearly":
        labels = availableYears.map((year) => year.toString());
        availableYears.forEach((year) => {
          const yearOrders = filteredOrders.filter(
            (order) => getYear(parseISO(order.createdDate)) === year
          );
          totals.push(
            yearOrders.reduce((sum, order) => sum + order.cafeOrderTotal, 0)
          );
          counts.push(yearOrders.length);
        });
        break;
      case "monthly":
        labels = availableMonths.map((month) =>
          format(new Date(selectedYear, month), "MMM")
        );
        availableMonths.forEach((month) => {
          const monthOrders = filteredOrders.filter(
            (order) => getMonth(parseISO(order.createdDate)) === month
          );
          totals.push(
            monthOrders.reduce((sum, order) => sum + order.cafeOrderTotal, 0)
          );
          counts.push(monthOrders.length);
        });
        break;
      case "weekly":
        labels = availableWeeks.map((week) => `Week ${week}`);
        availableWeeks.forEach((week) => {
          const weekOrders = filteredOrders.filter(
            (order) => getWeek(parseISO(order.createdDate)) === week
          );
          totals.push(
            weekOrders.reduce((sum, order) => sum + order.cafeOrderTotal, 0)
          );
          counts.push(weekOrders.length);
        });
        break;
    }

    setChartData({
      labels,
      datasets: [
        {
          label: "Total Amount of Cafe Orders (Rs.)",
          data: totals,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          label: "Number of Orders",
          data: counts,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        },
      ],
    });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${graphType.charAt(0).toUpperCase() + graphType.slice(1)
          } Order Statistics`,
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
          text: "Week Number",
        },
      },
    },
  };

  const handleViewTable = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div>
        <h3>Cafe Order Chart</h3>
        <Button
          variant="soft"
          color="neutral"
          sx={{ backgroundColor: "var(--dark-blue)", color: "white", mr: 2 }}
          onClick={handleDownload}
        >
          Download Report
        </Button>
        <Button
          variant="soft"
          color="neutral"
          sx={{ backgroundColor: "var(--dark-blue)", color: "white", mr: 2 }}
          onClick={handleViewTable}
        >
          View Order Data Table
        </Button>
        <select
          value={graphType}
          onChange={(e) => setGraphType(e.target.value)}
        >
          <option value="weekly">Week</option>
          <option value="monthly">Month</option>
          <option value="yearly">Year</option>
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {graphType !== "yearly" && (
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {format(new Date(selectedYear, month), "MMMM")}
              </option>
            ))}
          </select>
        )}

        {graphType === "weekly" && (
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
          >
            {availableWeeks.map((week) => (
              <option key={week} value={week}>
                Week {week}
              </option>
            ))}
          </select>
        )}
      </div>

      <div ref={chartRef}>
        <Bar options={options} data={chartData} />
      </div>

      <Container ref={tableRef} className="mt-4">
        <h3 className="mb-4 text-primary">{graphType.charAt(0).toUpperCase() + graphType.slice(1)} Order Data Table</h3>
        <Table striped bordered hover responsive variant="dark" className="table-custom">
          <thead>
            <tr>
              <th>{graphType.charAt(0).toUpperCase() + graphType.slice(1)}</th>
              <th>Number of Orders</th>
              <th>Total Amount of Cafe Orders (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {chartData.labels.map((label, index) => (
              <tr key={index}>
                <td>{label}</td>
                <td>{chartData.datasets[1].data[index]}</td>
                <td>{chartData.datasets[0].data[index]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Button
        variant="soft"
        color="neutral"
        sx={{ backgroundColor: "var(--dark-blue)", color: "white", mr: 2 }}
        onClick={handleDownload}
      >
        Download Report
      </Button>

    </div>
  );
};

export default OrdersGraph;
