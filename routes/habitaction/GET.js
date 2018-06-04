'use strict';
let Habit = require('models/Habit');
let User = require('models/User');
const CONST = require('components/CONST.js');
/**
 * Example route handler for Express
 * This returns a list of Habits
 */

module.exports = function getHabits(req, res, next) {
    let founduser = req.user._id;
    return Habit.find({ 'habitBy': founduser})
                .select('title habitBy habitCategory updatedAt targetEnd startDate streakCounter longestStreakCounter updateCounter date reminder activeHabit id')
                .populate('habitBy', 'firstname lastname email _id')
                .then((habits) => {
                    return res.json(habits);
                })
                .catch((err) => {
                    return next(err);
                });
            };