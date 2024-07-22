const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }
  
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  }

  // Parse the request body
  const { items, quantities, addInfo } = JSON.parse(event.body);

  let itemDetails = `<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                        <thead>
                          <tr>
                            <th style="background-color: #f2f2f2;">Item</th>
                            <th style="background-color: #f2f2f2;">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>`;
  
  items.forEach((item, index) => {
    itemDetails += `<tr>
                      <td>${item}</td>
                      <td>${quantities[index]}</td>
                    </tr>`;
  });

  itemDetails += ` </tbody>
                 </table>`;

  // HTML content for the email
  let emailBody = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Spare Parts Request</h2>
      <p>Dear Team,</p>
      <p>Please find below the spare parts request:</p>
      ${itemDetails}
      <p><strong>Additional Info:</strong></p>
      <p>${addInfo}</p>
      <p>Best regards,</p>
      <p>Odiedo</p>
    </div>
  `;



  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'odiedopaul@gmail.com', 
      pass: 'oeor ibwd ewpn erqq'     
    }
  });

  // Email options
  let mailOptions = {
    from: 'odiedopaul@gmail.com',    
    to: 'odiedopaul@gmail.com',                      // Email address to send to
    subject: 'Spare part Request',               // Subject line
    html: emailBody
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email', error }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  }
};
