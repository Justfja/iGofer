var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/member');

var db = mongoose.connection;

var MemberBase = mongoose.Schema({
// Join MemberBase Schema
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
	time{
		type: Date
	},
	profileimage:{
		type: String
	}
});

var Member = module.exports = mongoose.model('Member', MemberSchema);

module.exports.getUserById = function(id, callback){
	Member.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	Member.findOne(query, callback);
}

module.exports.comparePassword = function(memberPassword, hash, callback){
	bcrypt.compare(memberPassword, hash, function(err, isMatch) {
    	callback(null, isMatch);
	});
}

module.exports.createmember = function(member, callback){
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(member.password, salt, function(err, hash) {
   			member.password = hash;
   			member.save(callback);
    	});
	});
}
