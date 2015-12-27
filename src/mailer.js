/****
*
* MAILER
*
*/
var fs = require('fs');
var nodemailer = require('nodemailer');
var utils = require('./utils.js');
var encryptedPass = utils.decrypt('d4bf60231d2b4d6ac4');
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
exports.send = function(subject,to,text){

    fs.readFile('./ressources/hero.html', function (err, html) {
    if (err) {
        throw err; 
    }   
    var templateHTML = html ;
    var mailOptions = {
        from: 'My-DL Team ✔ <mydl.contact@gmail.com>', // sender address
        to: to, // list of receivers
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


}

