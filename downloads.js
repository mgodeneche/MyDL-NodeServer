var mongoose = require('mongoose');
//console.log('downloads.js');


var downloadSchema = mongoose.Schema({
    owner: String,
    fileName : String,
    created : String,
    finished : String,
    running : Boolean,
});

var Download = mongoose.model('Download', downloadSchema);

exports.create = function(owner,fileName,created,finished,running){
	return new Download({
		owner: owner,
		fileName : fileName,
	    created : created,
	    finished : finished,
	    running : running,
	});
};

exports.save = function(Download){
	Download.save();
};

exports.isFinished = function(id){
	//Si DL trouvé ET finished != null = finished
};

exports.findAll = function(){
	Download.find(function (err, downloads) {
  		if (err) return console.error(err);
  			console.log(downloads);
});
}