/** 
 @author Parth Shah
 @studentID 301171805
 @date October 7, 2021
 @description Personal Portfolio website- Authentication
**/

let mongoose = require('mongoose');

//create a model class
let businessModel = mongoose.Schema({
    name : String,
	number: Number,
	email: String
}, {
    collection: "contact"
});

module.exports = mongoose.model('contact', businessModel);
// 'business'