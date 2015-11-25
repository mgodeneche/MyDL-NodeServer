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

exports.save = function(User,callback){
	User.save();
	callback(User.email);

}

exports.findAll = function(){
	User.find(function (err, users) {
  		if (err) return console.error(err);
  			console.log(users);
	});
}

exports.authenticate = function(user,callback){
    var result = "false";
    var query = User.where(
    { 
        email : user.email,
        password : user.password

    });
    query.findOne(function(err,user){
        if(err){return handleError(err);}
        if(user){
            result = "true";
        }
        console.log("authenticated= "+result)
        callback(result);
    });
}





