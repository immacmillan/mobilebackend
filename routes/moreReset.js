'use strict';
let Habit = require('models/Habit'),
  async = require('async'),
  flash = require('express-flash'),
  User = require('models/User'),
  crypto = require('crypto'),
  nodemailer = require('nodemailer'),
  passport = require('passport');
const CONST = require('components/CONST.js');

module.exports = function moreReset(req, res, next) {
  var user = req.user;
  console.log(user);
  
  user.password = req.body.password2;
  console.log(req);
  user.save((err) => {
		if (err) {
			res.status(CONST.HTTP_STATUS_CODE.SERVER_ERROR).send(err);
		} else {
			res.status(CONST.HTTP_STATUS_CODE.OK).send({message:'Failed to update user PW'}).end();
		}
  });
} 
// user.save(function (err) {
  //   if (err) { next(err) }
  //   else {
  //     res.sendStatus(CONST.HTTP_STATUS_CODE.OK);
  //   }
  // }