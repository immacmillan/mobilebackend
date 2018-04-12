'use strict';
let Habit = require('models/Habit');
let User = require('models/User');
const CONST = require('components/CONST.js');
/**
 * Example route handler for Express
 * This returns a list of Habits
 */
module.exports = function getHabits(req, res, next) {
    return Habit.find()
                .select('title description habitBy habitcategory habittype date')
                .populate('habitBy', 'firstname lastname email _id')
                .then((habits) => {
                    return res.json(habits);
                })
                .catch((err) => {
                    return next(err);
                });
            };
            