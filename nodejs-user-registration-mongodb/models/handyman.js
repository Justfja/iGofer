var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/handyman');

var db = mongoose.connection;

// Handyman Schema
var HandymanSchema = mongoose.Schema({
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
	phonenumber: {
		type: Number
	},
  localgovtarea: {
    type: String
  },
  address: {
		type: String
	},
  password: {
		type: String
	}
});


var Handyman = module.exports = mongoose.model('Handyman', HandySchema);

module.exports.getUserById = function(id, callback){
	Handyman.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	Handyman.findOne(query, callback);
}

module.exports.comparePassword = function(handyPassword, hash, callback){
	bcrypt.compare(handyPassword, hash, function(err, isMatch) {
    	callback(null, isMatch);
	});
}

module.exports.createhandyman = function(handyman, callback){
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(handyman.password, salt, function(err, hash) {
   		handyman.password = hash;
   		handyman.save(callback);
    	});
	});
}
