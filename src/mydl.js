var http = require('http');
var userClass = require('./users.js');
var downloadClass = require('./downloads.js');
var utils = require('./utils.js');
var url = require('url');
var http = require('http');
var qs = require('querystring');
const PORT=8054; 
var myURI = 'mongodb://admin:admin@ds035750.mongolab.com:35750/mydl';
var mongoose = require('mongoose');
mongoose.connect(myURI);

//Create a server
var server = http.createServer(handleRequest);
//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function (callback) {
	var time = new Date();
	var timenow = time.today().toString()+" "+time.timeNow().toString();
  	console.log("Server started at "+timenow);
  	
});

var result;

function handleRequest(request, response) {
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
		
		// Get datas, parse them and create user with it
        request.on('end', function () {
			var data = JSON.parse(body);
			var login = data.login;
			var password = data.password;
			var email = data.email;
			
			myUser = userClass.create(login,email,password);

			console.log ("password : "+password);
			console.log ("email : "+email);
			
			// authenticate with user
			var auth = authenticate(myUser, onAuthenticate);
			console.log(auth);
        });
    }if(request.method == 'GET'){
		console.log("Trying to get GET");
	}else{
		console.log("Nothing.");
	}
}

function authenticate(myUser, exploitResult){
	userClass.authenticate(myUser,function(result);
}

function onAuthenticate(err, result){
	console.log(result);
}

