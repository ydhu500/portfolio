require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // 1. Import CORS

const app = express();

// 2. Give your GitHub Pages link permission to send data here
app.use(cors({
    origin: 'https://ydhu500.github.io'
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
        to: process.env.EMAIL_USER, 
        subject: `New Portfolio Message from ${name}`,
        text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Nodemailer Error: ", error);
            return res.status(500).send('Something went wrong.');
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send('Thank you! Your message has been sent.');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});