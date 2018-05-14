'use strict';
let Habit = require('models/Habit'),
    async = require('async'),
    flash = require('express-flash'),
    User = require('models/User'),
    crypto = require('crypto'),
    nodemailer = require('nodemailer'),
    passport = require('passport');

const CONST = require('components/CONST.js');


module.exports = function forgotPost(req, res, next){
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          // return res.redirect('/forgot');
          res.send({success: false})
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 'apikey',
          pass: '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'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Habit App Password Reset',
        text: 
          'http://localhost:8100/#/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        html:
        '<div style="font-size:14pt; width:80%; height: 100%;" align="center"><img src="cid:test-image2@example.com"/></div>' + '<br>' + '<br>' +
        '<div style="font-size:17pt; width:80%; height: 100%;" align="center"><strong>Forgot your password?</strong></div>'+ 
        '<div style="font-size:14pt; width:80%; height: 100%;" align="center">We can help with that!</div>'+ 
        '<div align="center">&nbsp;</div>'+
        '<div style="font-size:14pt; width:80%; height: 100%;" align="center"><strong>Please visit the following link to reset your password: </strong></div>'+
        '<div style="font-size:14pt; width:80%; height: 100%;"align="center"><strong>'+'http://localhost:8100/#/reset/'+token + '\n\n'+'<br>' + '</strong></div>' +
          '<div align="center">&nbsp;</div>'+
        '<div align="center">&nbsp;</div>'+
        '<div style="font-size:12pt; width:80%; height: 100%;" align="center">For security reasons, this link will expire in one hour. If this link is no longer valid, please request a new password again. If you believe this email was sent to you in error, please ignore this message.</div>'+
        '<div align="center">&nbsp;</div>'+
        '<div align="center">&nbsp;</div>'+
        '<div style="font-size:14pt; width:80%; height: 100%; text-align: center;"><em>Note: This message was sent from an unmonitored email address. Please do not reply to this email.</em></div>',
        // An array of attachments
        attachments: [
          // File Stream attachment
          {
              filename: 'test-image2',
              path: __dirname + '/assets/test-image2.jpg',
              cid: 'test-image2@example.com' // should be as unique as possible
          }
        ]
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
}