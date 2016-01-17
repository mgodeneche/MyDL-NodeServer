 /****
*
* VARIABLES
*
*/

var app = require('express')();
var mailer = require('express-mailer');
var http = require('http').Server(app);
var userClass = require('./src/users.js');
var utils = require('./src/utils.js');
var mailer = require('./src/mailer.js');
var url = require('url');
var myURI = 'mongodb://admin:admin@ds035750.mongolab.com:35750/mydl';
var mongoose = require('mongoose');
mongoose.connect(myURI);


/****
*
* SERVEUR & DB
*
*/

var httpServer = http.listen(8054, function(){

  console.log('Listening on *:%s',8054);
});

var db = mongoose.connection;
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
	handleRegisterRequest(req,function(userCreated,error){
		if(userCreated===true || error != true){
			res.send(201);
		}else{
			res.send(418);
		}
	});
 	console.log("register !");
});

//C'est ici qu'on prends le reset de mot de passe
app.post('/reset', function(req, res){
	handleResetRequest(req);
  	console.log('reset ! '); 
});

app.get('/activation', function(req, res){
	handleActivationRequest(req);
  	console.log('activation ! ');
  	res.send(200);  
});


app.post('/downloadAdd',function(req,res){
	console.log('on ajoute un DL');
})
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


function handleRegisterRequest(request,callback){
	if (request.method == 'POST') {
    	console.log("Register hit");
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
			userClass.isEmailUsed(email,function(user){
				if(user){
					var error = true;
					console.log('Il existe déja un utilisateur avec l\'adresse email suivante :'+user.email);
					callback(user,error);
				}
			});
			userClass.save(myUser,function(myUser){
				var activationLink = utils.getServerURL()+linkGenerate();
				mailer.registerMail(myUser.email,activationLink)
			});

		});
		callback(myUser);
	}
}

function handleActivationRequest(request){
	if (request.method == 'GET') {
    	//console.log("Trying to get POST");
        var code = request.param('activationCode');
        var email = request.param('email');
		request.on('end', function () {
			userClass.isEmailUsed(email,function(result){
				if(user && (user.activated === code)){
					user.activated = 'yes';

				}
			});
        //console.log(code);
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
					mailer.newPasswordMail(email,newPassword);
					user.password = utils.encrypt(newPassword);
					userClass.save(user,function(user){console.log(user)});
				}
			});

			
		});
	
	}

}









