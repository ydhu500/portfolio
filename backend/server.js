require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle the form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // 1. Set up your email transporter (e.g., using Gmail)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:process.env.EMAIL_USER, 
            pass:process.env.EMAIL_PASS// Not your actual password, an App Password
        }
    });

    // 2. Define the email content
    const mailOptions = {
        from: email,
        to:process.env.EMAIL_USER, // Where you want to receive the message
        subject: `New Contact Form Submission from ${name}`,
        text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // 3. Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Something went wrong.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Thank you! Your message has been sent.');
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});