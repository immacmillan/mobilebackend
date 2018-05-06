'use strict';
let Habit = require('models/Habit'),
    async = require('async'),
    flash = require('express-flash'),
    User = require('models/User'),
    crypto = require('crypto'),
    nodemailer = require('nodemailer'),
    passport = require('passport');
const CONST = require('components/CONST.js');

module.exports = function moreReset(req, res) {
  async.waterfall([
   function updateUser(req, res, next) {
        return User.findOneAndUpdate({
            resetPasswordToken: req.body.resetPasswordToken
        }, {
            password: req.body.password
        }).exec().then(function(results) {
            if (results) {
                return res.status(CONST.HTTP_STATUS_CODE.OK).send(results);
            } else {
                return res.sendStatus(CONST.HTTP_STATUS_CODE.NOT_FOUND);
            }
        }).catch(next);
    },
    function(user, done) {
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
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.send({success: true})
  });
}
