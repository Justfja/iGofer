var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/hire');

var db = mongoose.connection;

// Hire Schema
var HireSchema = mongoose.Schema({
	firstName: {
		type: String,
		index: true
	},
	surname: {
		type: String,
		index: true
	},
	email: {
		type: String
	},
	location: {
		type: String
	},
	serviceneeded: {
		type: String
	},
	description: {
		type: String
	},
	phonenumber: {
		type: Number
	},
	date: {
		type: Date
	},
	time: {
		type: Date
	},
	profileimage:{
		type: String
	}
});

var Hire = module.exports = mongoose.model('Hire', HireSchema);

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.createHire = function(newHire, callback){
	newHire.save(callback);
}
