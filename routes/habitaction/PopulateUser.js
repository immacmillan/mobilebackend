'use strict';
let Habit = require('models/Habit');
let User = require('models/User');
const CONST = require('components/CONST.js');

/**
 * This makes sure Habits are being 
 * added to users as they are created
 */
module.exports = function populateUser(req, res, next) {
	User.findOne({'id':req.params.id},(err,foundUser)=>{
        if(!err){
             var newHabit = new Habit({

				title: foundUser.title,
				description: foundUser.description,
				date: foundUser.date

                });

             newHabit.save((err, o)=>{
                if(!err){
                User.findByIdAndUpdate(req.session.user._id,
                {$push: {"habits": o._id}},
                {safe: true, new : true})
                .populate('habits')
                .exec((err, model) => {
                 console.log(model); //This will have the habits array filled in
				});
			
			}else return(err);
		}); 
	}else return(err);
})};