'use strict';
let Habit = require('models/Habit');
let User = require('models/User');
const CONST = require('components/CONST.js');
/**
 * Example route handler for Express
 * This returns a list of Habits
 */
module.exports = function getHabitsBy(req, res, next) {
    var founduser = req.params.id;

    return Habit.find({ 'habitBy': founduser})
                .select('title description habitBy habitcategory habittype date')
                .populate('habitBy', 'firstname lastname email _id')
                .limit(10)
                .then((habits) => {
                    return res.json(habits);
                })
                .catch((err) => {
                    return next(err);
                });
            };
            