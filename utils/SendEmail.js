

const nodemailer = require('nodemailer')


const SendEmail = async (option) => {
    const transporter = nodemailer.createTransport({
        // host: 'smtp.gmail.com',
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const emailOptions = {
        from: 'FlixWave Support<resetpassword@flixwave.com>',
        to: option.email,
        subject: option.subject,
        text: option.message
    }

    try {
        await transporter.sendMail(emailOptions);
        console.log('Email sent successfully')
    } catch (error) {
        console.log(error)
    }
}

export default SendEmail;