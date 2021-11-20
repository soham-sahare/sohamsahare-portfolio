const express = require('express');
const app = express();
const formidable = require('express-formidable');

var nodemailer = require('nodemailer');

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

const PORT = process.env.PORT || 3000;

const dotenv = require("dotenv")
dotenv.config()

app.use(express.static('public'));
app.use(formidable());

app.set('views', './views');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

app.get('/projects', (req, res) => {
    res.sendFile(__dirname + '/views/projects.html')
});

app.get('/resume', (req, res) => {
    res.sendFile(__dirname + '/views/resume.html')
});

app.post('/contact', (req, res) => {

    let name = req.fields.yourname
    let email = req.fields.youremail
    let subject = req.fields.yoursubject
    let message = req.fields.yourmessage

    console.log(name, email, subject, message);

    if (subject.length == 0) {
        subject = "Contact - Soham Sahare"
    }

    var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: 'soham.sahare@vit.edu.in',
        to: email,
        cc: 'sohamsahare123@gmail.com',
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    console.log(JSON.stringify(req.fields));
});

app.post('/message', (req, res) => {
    var email = req.body.email
    var message = req.body.message
    
    var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: 'soham.sahare@vit.edu.in',
        to: email,
        cc: 'sohamsahare123@gmail.com',
        subject: "Thank you for contacting.",
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

app.listen(PORT, () =>
    console.info(`App listening on port ${PORT}`)
)
