require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

// This handles standard HTML form data submissions perfectly
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Secure cloud configuration for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Sends the message directly to your own inbox
        subject: `New Portfolio Message from ${name}`,
        text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending email:", error);
            // This sends a clear, clean message right back to the browser screen
            return res.status(500).send('<h1>Oops! Something went wrong on the server side.</h1>');
        }
        console.log('Email sent successfully: ' + info.response);
        // Success screen!
        res.status(200).send('<h1>Thank you! Your message has been sent successfully.</h1>');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});