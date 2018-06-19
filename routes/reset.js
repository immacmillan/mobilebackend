'use strict';
let Habit = require('models/Habit'),
    async = require('async'),
    flash = require('express-flash'),
    User = require('models/User'),
    crypto = require('crypto'),
    nodemailer = require('nodemailer'),
    passport = require('passport');
User = require('models/User').model('User');
const CONST = require('components/CONST.js');

module.exports = function reset(req, res, next) {
    async.waterfall([
        function (done) {
            var token = req.body.token;
            const newpass = req.body.password;
            // console.log(req);
            console.log(token);
            console.log(newpass);
            User.findOne({
                'resetPasswordToken': token
            }, function (error, user) {
                console.log(user);
                if (error) return next(error);
                if (!user) return next({
                    status: CONST.HTTP_STATUS_CODE.UNAUTHORIZED,
                    error: {
                        success: false,
                        message: CONST.SIGNALS.BAD_EMAIL,
                    }
                });

                user.password = req.body.password;
                user.save(function (err) {
                    done(err, user);
                });
                console.log('Password sucessfully updated');
                //                        return res.status(CONST.HTTP_STATUS_CODE.OK).send(user);
            });
        },
        function (user, done) {
            console.log('didtheygethere');
            var smtpTransport = nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: 'apikey',
                    pass: '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'
                }
            });
            // var pwreseturl = `https://goals.digitalstudio.io/resetmypw/${token}`;
            // var jumptoapp = some link that can take you to the app... R2
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@Incline.com',
                subject: 'Congratulations! You\'re on your way to achieving your goals.',
                text:
                    '',
                html:
                    `<div style="font-size:14pt; width:60%; height: 80%;" align="center"><img src="cid:ForgotPwBackground@habit.com" height="270" width="650"/></div>  <br>  <br> 
                    <div style="font-size:17pt; width:60%; height: 80%;" align="center"><strong>Sweet Success!</strong></div> <br>            
                    <div style="font-size:14pt; width:60%; height: 80%;" align="center"></div>
                    <div align="center">&nbsp;</div>
                    <div style="font-size:14pt; width:60%; height: 80%; margin-right: auto;" align="center">Your password has been reset.<br><br> Now what are you waiting for?<br><br> Get Back on Track with Incline...<br> and thanks for being a part of our community</div> <br> <br>
                    <div style="font-size:10pt; width:60%; height: 80%; margin-right: auto;" align="center"><em>Note: This message was sent from an unmonitored email address. Please do not reply to this email.</em></div>`,
                // An array of attachments
                attachments: [
                    // File Stream attachment
                    {
                        filename: 'ForgotPwBackground',
                        path: __dirname + '/assets/ForgotPwBackground.png',
                        cid: 'ForgotPwBackground@habit.com' // should be as unique as possible
                    }
                ]
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                console.log('mailsent');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        // res.redirect('/forgot');
        return res.send({ success: true, message: CONST.SIGNALS.GOOD_EMAIL });
    });
}

// var token = req.body.token;
// const newpass = req.body.password;
// console.log(req);
// console.log(token);
// console.log(newpass);
// return User.findOne({
//     'resetPasswordToken': token
// })
//     .exec((error, user) => {
//         console.log(user);
//         if (error) return console.log(error);
//         if (!user) return console.log('Password reset token is invalid or has expired');
//         if (user) {
//             user.password = req.body.password;
//             user.save();
//             console.log('Password sucessfully updated');
//             return res.status(CONST.HTTP_STATUS_CODE.OK).send(user);
//         }
//         else {
//             return res.statusStatus(CONST.HTTP_STATUS_CODE.NOT_FOUND);
//         }
//     })
// };
