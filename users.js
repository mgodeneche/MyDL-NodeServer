var mongoose = require('mongoose');
var utils = require('./utils.js');
//console.log('users.js');

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password : String,
});

var User = mongoose.model('User', userSchema);

exports.create = function(username,email,password){
	return new User({
	username : username,
	email : email,
	password : utils.encrypt(password),
	});
};

exports.save = function(User){
	User.save();
}

exports.findAll = function(){
	User.find(function (err, users) {
  		if (err) return console.error(err);
  			console.log(users);
	});
}

exports.authenticate = function(user,fn){
	User.findOne({
		'username':user.username,
		'password':user.password,
	},'username', function (err, dbuser) {
  			if (err) return handleError(err);
  			console.log();
  		  	fn(Boolean(dbuser));
  		  	
	});
	
}

