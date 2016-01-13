/****
 *
 * VARIABLES
 *
 */

var crypto = require('crypto');
var http = require('http');



Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

    
exports.encrypt = function(text){
	var algorithm = 'aes-256-ctr';
	var password = 'mgcb21a14';
	var cipher = crypto.createCipher(algorithm,password);
	var crypted = cipher.update(text,'utf8','hex');
	crypted += cipher.final('hex');
	return crypted;
}
exports.decrypt =function(text){
  	var algorithm = 'aes-256-ctr';
  	var password = 'mgcb21a14';
	var decipher = crypto.createDecipher(algorithm,password);;
	var dec = decipher.update(text,'hex','utf8');
	dec += decipher.final('utf8');
	return dec
}

exports.passwordGenerate = function(){
	var randomstring = Math.random().toString(36).slice(-10);
	console.log(randomstring);
	return randomstring;
}
exports.linkGenerate = function(){
	var randomstring = Math.random().toString(36).slice(-20);
	console.log(randomstring);
	return randomstring;
}

exports.getServerURL = function(httpServer) {
	var ip = httpServer.address().address;
	var port = httpServer.address().port;
	return 'http://'+ip+':'+port;
}