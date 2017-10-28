var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('contact', {
        title: 'Contact',
    });
});

// Send email
router.post('/send', function (req, res, next) {
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 'Your Email Goes Here',
            pass: 'password'
        }
    });
    var mailOptions = {
        from: '"Scot Pfleghaar" <email>',
        to: 'support@solutions.solution',
        subject: 'Hello From Repair.com',
        text: 'You have a submission from... Name: ' + req.body.name + ' Email:' + req.body.email + ' Message:' + req.body.message,
        html: '<p>You have a submission from... </p> <ul><li>Name: ' + req.body.name + '</li><li> Email:' + req.body.email + '</li><li> Message:' + req.body.message + '</li></ul>',
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log('Message Sent: ' + info.response);
            res.redirect('/');
        }
    });
});

module.exports = router;