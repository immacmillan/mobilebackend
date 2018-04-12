'use strict';
let Habit = require('models/Habit'),
    User = require('models/User').model('User');
const CONST = require('components/CONST.js');

module.exports = function reset(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('/forgot');
        }
        res.render('reset', {
          user: req.user
        });
      });
}