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
var mailer = require('./src/mailer.js');
var url = require('url');
var qs = require('querystring');
var myURI = 'mongodb://admin:admin@ds035750.mongolab.com:35750/mydl';
var mongoose = require('mongoose');
var mailMGO = 'maxence.godeneche@gmail.com';
var subject ='test d\'envoi de mail';
mongoose.connect(myURI);


/****
*
* SERVEUR & DB
*
*/

http.listen(8054, function(){
  console.log('listening on *:%s',8054);
});

var db = mongoose.connection;
mailer.send('Merci pour votre inscription ✔','cindy.bernardo.19@gmail.com','test12345666');
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function (callback) {
	var time = new Date();
	var timenow = time.today().toString()+" "+time.timeNow().toString();
  	console.log("MyDL Server started at "+timenow);
  	
});
/****
*
* ROUTES
*
*/

//C'est ici qu'on prends l'authentification
app.post('/auth', function(req, res){
	handleLoginRequest(req,function(auth){
		//console.log("callback= "+auth);
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
			userClass.isEmailUsed(email,function(result){
				if(user){
					var newPassword = utils.passwordGenerate();
					mailer.send('Réinitialisation de mot de passe',email,"Voici votre nouveau mot de passe : "+newPassword)
				}
			});

			
		});
	
	}
}





