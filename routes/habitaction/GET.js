'use strict';
let Habit = require('models/Habit');
let User = require('models/User');
const CONST = require('components/CONST.js');
/**
 * Example route handler for Express
 * This returns a list of Habits
 */

module.exports = function getHabits(req, res, next) {
    let props = 'title habitBy habitCategory updatedAt targetEnd startDate streakCounter longestStreakCounter updateCounter reminder activeHabit id customId';    
    let founduser = req.user._id;
    if (req.params.id) {
        return Habit.find({
            '_id' : req.params.id
        })
        .select(props)
        .populate('habitBy','firstname lastname email _id')
        .then((habits) => {
            return res.json(habits);
        })
        .catch((err) => {
            return next(err);
        });
    } else {
        return Habit.find({
                'habitBy': founduser
            })
            .select(props)
            .populate('habitBy', 'firstname lastname email _id')
            .then((habits) => {
                return res.json(habits);
            })
            .catch((err) => {
                return next(err);
            });
    }
};