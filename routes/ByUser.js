'use strict';
let Habit = require('models/Habit');
let User = require('models/User');
const CONST = require('components/CONST.js');
var reversePopulate = require('mongoose-reverse-populate');
            
/**
 * This returns a list of Habits for User queried
 * 
 * not currently routed in index
 */
module.exports = function getUserHabits(req, res, next) {

    var currentuser = req.user._id;
    return User.find({'_id':currentuser})
                .select('userhabits firstname lastname email')
                .populate('userhabits')
                .then((userswithhabits) => {
                    return res.json(userswithhabits);
                })
                .catch((err) => {
                    return next(err);
                });
            };