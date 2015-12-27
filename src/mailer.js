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
exports.send = function(subject,target,text){

    fs.readFile('./ressources/hero.html', function (err, html) {
    if (err) {
        throw err; 
    }   
    userClass.findByEmail(target,function(user){
        var template = Handlebars.compile(htmlToString(html));
        var data = {    "username": user.username, 
                        "headComment": "Bonjour ! Besoin d'un nouveau mot de passe ?",
                        
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

