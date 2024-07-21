const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  // Parse the request body
  const { email, subject, message } = JSON.parse(event.body);

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
    to: email,                      // Email address to send to
    subject: subject,               // Subject line
    text: message                   // Plain text body
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email', error })
    };
  }
};
