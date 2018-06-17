'use strict';
let Habit = require('models/Habit'),
    User = require('models/User').model('User');
const CONST = require('components/CONST.js');

module.exports = function reset(req, res, next) {
    var token = req.body.token;
    const newpass = req.body.password;
    console.log(req);
    console.log(token);
    console.log(newpass);
    return User.findOne({ 'resetPasswordToken': token 
    })
    .exec((error, user) => {
        console.log(user);
        if (error) return console.log(error);
        if (!user) return console.log('Password reset token is invalid or has expired');
        if (user) {
            user.password = req.body.password;
            user.save();
            console.log('Password sucessfully updated');
            return res.status(CONST.HTTP_STATUS_CODE.OK).send(user);
        }
        else {
            return res.statusStatus(CONST.HTTP_STATUS_CODE.NOT_FOUND);
        } 
    })
};
