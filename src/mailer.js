/****
*
* MAILER
*
*/
var fs = require('fs');
var Handlebars = require('handlebars');
var nodemailer = require('nodemailer');
var utils = require('./utils.js');
var userClass = require('./users.js');
var encryptedPass = utils.decrypt('d4bf60231d2b4d6ac4');
var teamEmail = 'My-DL Team ✔ <mydl.contact@gmail.com>';
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mydl.contact@gmail.com',
        pass: encryptedPass
    }
});


// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails
function sendMail(subject,target,text){

    fs.readFile('./ressources/hero.html', function (err, html) {
    if (err) {
        throw err; 
    }   
    userClass.findByEmail(target,function(user){
        var template = Handlebars.compile(htmlToString(html));
        var data = {    "username": user.username, 
                        "headComment": text
                        
                    };

        var templateHTML = template(data);
        //console.log(templateHTML);
        var mailOptions = {
            from: teamEmail, // sender address
            to: target, // list of receivers
            subject: subject, // Subject line
            //text: '', // plaintext body
            html: templateHTML  // html body

            };
                  // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);

                });
        });
    }); 


}
function htmlToString(data){
    var output = " \" ";
    output+=data;
    output+= " \" ";
    return output;
}

exports.newPasswordMail = function(target,newPassword){
    var subject = "Réinitialisation de mot de passe";
    var text = "Vous avez égaré votre mot de passe ? Aucun problème ! En voilà un autre : "+newPassword
    sendMail(subject,target,text);
}

exports.registerMail = function(target,link){
    var subject = "Confirmation de votre inscription";
    var text = "Toute la team My-DL vous souhaite la bienvenue ! Pour vérifier votre compte veuillez cliquer sur le lien suiviant : "+link
    sendMail(subject,target,link);
}

