import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, template, data) => {
    // Implementation for sending email
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            // Accept self-signed or invalid certificates
            rejectUnauthorized: false,
        },

    });
    try {
        await transporter.verify();
        console.log(" Email Server is ready to take our messages");
    } catch (err) {
        console.error("Email Service Verification failed:", err);
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: data.content
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to " + email);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }


};

export default sendEmail;