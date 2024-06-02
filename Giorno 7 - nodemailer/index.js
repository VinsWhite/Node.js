const nodemailer = require('nodemailer');
const { port, host, username, password, mail } = require('./config');

// To start sending emails with Nodemailer, all you need to is:

/* 1. Create a transporter object
   2. Configure the mailoptions object
   3. Deliver a message with sendMail() */

// create a transporter
const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: false,
    auth: {
        user: username,
        pass: password
    }
})

// mailoptions object
const mailoptions = {
    from: 'ciao',
    to: mail,
    subject: 'example',
    text: 'wow'
}

// send the email

transporter.sendMail(mailoptions, function (error, info) {
    if(error) {
        console.log('Error', error)
    } else {
        console.log('Email sent: ', info.response)
    }
})