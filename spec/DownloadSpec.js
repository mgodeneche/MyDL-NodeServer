var downloadClass = require('../src/downloads.js');

describe("Tests à propos des Downloads", function() {

 	var owner = 'TestOwner';
 	var filenameTest = 'filename_test';
 	var time = new Date();
	var created = "22/03/2004 22:49:31"
	var finished = null;
	running = true;
	var MyDownload = downloadClass.create(owner,filenameTest,created,finished,running);

	it("le DL a un owner",function(){ 
		expect(MyDownload.owner).not.toBe(null);
	});
	it("L'owner est un string",function(){
		expect(typeof MyDownload.owner).toEqual("string");
	});
	it("L'owner est correct",function(){
		expect(MyDownload.owner).toEqual(owner);
	});
	it("le DL a un nom de fichier",function(){
		expect(MyDownload.fileName).not.toBe(null);
	});
	it("Le nom de fichier est un string",function(){
		expect(typeof MyDownload.fileName).toEqual("string");
	});
	it("Le nom de fichier correspond à celui entré en constructeur",function(){
		expect(MyDownload.fileName).toEqual(filenameTest);
	});
	it("La création n'est pas nulle",function(){
		expect(MyDownload.created).not.toBe(null);
	});
	it("La création est un string",function(){
		expect(typeof MyDownload.created).toEqual("string");
	});
	it("running n'est pas null",function(){
		expect(MyDownload.running).not.toBe(null);
	});
	it("running est un booleen",function(){
		expect(typeof MyDownload.running).toEqual("boolean");
	});

});