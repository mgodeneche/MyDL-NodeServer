var http = require('http');
var userClass = require('./users.js');
var downloadClass = require('./downloads.js');
var utils = require('./utils.js');
var url = require('url');
const PORT=8080; 

//********
//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
    console.log(request.method);
    var url = require('url');
	var url_parts = url.parse(request.url, true);
	var query = url_parts.query;
	console.log(query);
	console.log(request);
}

//Create a server
var server = http.createServer(handleRequest);
//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});





var myURI = 'mongodb://admin:admin@ds035750.mongolab.com:35750/mydl';
var mongoose = require('mongoose');
mongoose.connect(myURI);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	var time = new Date();
	var timenow = time.today().toString()+" "+time.timeNow().toString();
  	console.log("Hello bitch !"+timenow);
  	
});

var myUser = userClass.create('xxazeddax','azezaeazeazeaz','mazeazeazezaeaze');
//myUser.save();
var authent  = userClass.authenticate(myUser,function(result){
	if(result){
		console.log("logged");
	}else{
		console.log("Fuck you damn hacker");
	}
	return Boolean(result);
});
