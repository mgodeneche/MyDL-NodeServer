 /****
*
* VARIABLES
*
*/

var app = require('express')();
var mailer = require('express-mailer');
var http = require('http').Server(app);
var userClass = require('./src/users.js');
var downloadClass = require('./src/downloads.js');
var utils = require('./src/utils.js');
var url = require('url');
var qs = require('querystring');
var myURI = 'mongodb://admin:admin@ds035750.mongolab.com:35750/mydl';
var mongoose = require('mongoose');
mongoose.connect(myURI);

/****
*
* MAILER
*
*/
mailer.extend(app, {
  from: 'no-reply@mydl.com',
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: 'gmail.user@gmail.com',
    pass: 'userpass'
  }
});

/****
*
* SERVEUR & DB
*
*/

http.listen(8054, function(){
  console.log('listening on *:%s',8054);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function (callback) {
	var time = new Date();
	var timenow = time.today().toString()+" "+time.timeNow().toString();
  	console.log("Server started at "+timenow);
  	
});
/****
*
* ROUTES
*
*/

//C'est ici qu'on prends l'authentification
app.post('/auth', function(req, res){
	handleLoginRequest(req,function(auth){
		console.log("callback= "+auth);
		res.send(auth);
	});
	
	
});


//C'est ici qu'on prends l'enregisrement
app.post('/register', function(req, res){
	handleRegisterRequest(req);
 	console.log("register !");

 
});

//C'est ici qu'on prends le reset de mot de passe
app.post('/reset', function(req, res){
	handleResetRequest(req);
  	console.log('reset ! ');

  
});

app.get('/activation', function(req, res){
  console.log('activation ! ');

  
});
/****
*
* METIER
*
*/

function handleLoginRequest(request,callback) {
    if (request.method == 'POST') {
    	//console.log("Trying to get POST");
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

			console.log ("email : "+email);
			console.log ("password : "+password);
			
			
			// authenticate with user
			var auth = userClass.authenticate(myUser,function(result){
				//console.log("handleLoginRequest.result = "+result);
				callback(result);
					});
			
             });
    }
}


function handleRegisterRequest(request){
	if (request.method == 'POST') {
    	//console.log("Trying to get POST");
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
			//CALLBACK DE LA MORT, pas testé.
			userClass.save(myUser,function(myUser){
				//MAILTO email;
			});

		});
	}
}

function handleResetRequest(request){
	if (request.method == 'POST') {
    	//console.log("Trying to get POST");
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
		
		// Get datas, parse them and create user with it
        request.on('end', function () {
			var data = JSON.parse(body);
			var email = data.email;
			var newPassword = utils.passwordGenerate();
			//mailto email 
		});
	
	}
}
/*
function mailTo(dest,subject){
	app.mailer.send('email', { // LE TEMPLATE N'EST PAS ENCORE CREE , FONCTION BUGGEE
	    to: dest, // REQUIRED. This can be a comma delimited string just like a normal email to field.  
	    subject: subject, // REQUIRED. 
	  }, function (err) {
	    if (err) {
	      // handle error 
	      console.log(err);
	      res.send('There was an error sending the email');
	      return;
	    }
	    res.send('Email Sent');
	  });
}
*/


