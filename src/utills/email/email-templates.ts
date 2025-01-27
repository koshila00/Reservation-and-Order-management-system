const UserRegisteredEmail = (data: any) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Welcome to Syasra</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              padding: 20px;
          }
          .container {
              background-color: #ffffff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
              color: #333333;
          }
          p {
              font-size: 16px;
              color: #555555;
          }
          a {
              color: #007bff;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Welcome to Syasra , ${data.fullName}!</h1>
          <p>Dear ${data.fullName},</p>
          <p>Congratulations! You have successfully registered with Syasra.</p>
          <p>Thank you for joining our community. We're thrilled to have you and can't wait to serve you with our delightful offerings.</p>
          <p>Feel free to explore our menu, order your favorite items, and enjoy special promotions exclusive to our members.</p>
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          <p>We hope you enjoy your time with us!</p>
          <p>Best regards,</p>
          <p>Syasra Team</p>
      </div>
  </body>
  </html>
    `;
};

const QuotationEmail = (data: any) => {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Quotation Received</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            font-size: 16px;
            color: #555555;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>New Quotation Received</h1>
        <p>Dear Team,</p>
        <p>A new quotation has been received from ${data.supplierName} (${
    data.supplierEmail
  }) for ${data.qty} units of item ID ${data.item}.</p>
        <p>Please review the details:</p>
        <ul>
            <li><strong>Supplier Name:</strong> ${data.supplierName}</li>
            <li><strong>Supplier Email:</strong> ${data.supplierEmail}</li>
            <li><strong>Quantity:</strong> ${data.qty}</li>
            <li><strong>Item ID:</strong> ${data.item}</li>
            <li><strong>Created Date:</strong> ${new Date().toLocaleDateString()}</li>
        </ul>
        <p>Thank you for your attention to this matter.</p>
        <p>Best regards,</p>
        <p>Quotation Management Team</p>
    </div>
</body>
</html>
    `;
};

// const OrderCreatedEmail = (data: any) => {
//   return `
//   <!DOCTYPE html>
//   <html>
//   <head>
//       <meta charset="UTF-8">
//       <title>Order Confirmation - Syasra</title>
//       <style>
//           body {
//               font-family: Arial, sans-serif;
//               background-color: #f5f5f5;
//               padding: 20px;
//           }
//           .container {
//               background-color: #ffffff;
//               padding: 20px;
//               border-radius: 5px;
//               box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//           }
//           h1 {
//               color: #333333;
//           }
//           p {
//               font-size: 16px;
//               color: #555555;
//           }
//           .order-details {
//               margin: 20px 0;
//           }
//           .order-details th, .order-details td {
//               padding: 10px;
//               text-align: left;
//           }
//           .order-details th {
//               background-color: #f0f0f0;
//           }
//           a {
//               color: #007bff;
//               text-decoration: none;
//           }
//       </style>
//   </head>
//   <body>
//       <div class="container">
//           <h1>Order Confirmation</h1>
//           <p>Dear ${data.fullName},</p>
//           <p>Thank you for your order!</p>
//           <p>Your order <strong>ID: ${
//             data.orderId
//           }</strong> has been successfully created on <strong>${new Date(
//     data.orderDate
//   ).toLocaleDateString()}</strong>.</p>
//           <p>We hope you enjoy your purchase! If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
//           <p>Best regards,</p>
//           <p>Syasra Team</p>
//       </div>
//   </body>
//   </html>
//   `;
// };
const OrderCreatedEmail = (data: any) => {
  const itemsHtml = data.items
    .map(
      (item: any) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
      </tr>`
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Order Confirmation - Syasra</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              padding: 20px;
          }
          .container {
              background-color: #ffffff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
              color: #333333;
          }
          p {
              font-size: 16px;
              color: #555555;
          }
          .order-details {
              margin: 20px 0;
          }
          .order-details th, .order-details td {
              padding: 10px;
              text-align: left;
          }
          .order-details th {
              background-color: #f0f0f0;
          }
          a {
              color: #007bff;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Order Confirmation</h1>
          <p>Dear ${data.fullName},</p>
          <p>Thank you for your order!</p>
          <p>Your order <strong>ID: ${
            data.orderId
          }</strong> has been successfully created on <strong>${new Date(
    data.orderDate
  ).toLocaleDateString()}</strong>.</p>
          <p>Here are the details of your order:</p>
          <table class="order-details" border="1" cellspacing="0" cellpadding="0">
              <thead>
                  <tr>
                      <th>Item Name</th>
                      <th>Quantity</th>
                  </tr>
              </thead>
              <tbody>
                  ${itemsHtml}
              </tbody>
          </table>
          <h3>Order Total=${data.orderTotal}</h3>
          <p>We hope you enjoy your purchase! If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          <p>Best regards,</p>
          <p>Syasra Team</p>
      </div>
  </body>
  </html>
  `;
};

const HallBookingSuccessEmail = (data: any) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Hall Booking Confirmation - Syasra</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              padding: 20px;
          }
          .container {
              background-color: #ffffff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
              color: #333333;
          }
          p {
              font-size: 16px;
              color: #555555;
          }
          .booking-details {
              margin: 20px 0;
          }
          .booking-details th, .booking-details td {
              padding: 10px;
              text-align: left;
          }
          .booking-details th {
              background-color: #f0f0f0;
          }
          a {
              color: #007bff;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Hall Booking Confirmation</h1>
          <p>Dear ${data.fullName},</p>
          <p>Thank you for your booking!</p>
          <p>Your hall booking <strong>ID: ${
            data.bookingId
          }</strong> has been successfully created on <strong>${new Date(
    data.bookingDate
  ).toLocaleDateString()}</strong>.</p>
          <p>We hope you enjoy your event! If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          <p>Best regards,</p>
          <p>Syasra Team</p>
      </div>
  </body>
  </html>
  `;
};

export default {
  UserRegisteredEmail,
  QuotationEmail,
  OrderCreatedEmail,
  HallBookingSuccessEmail,
};
