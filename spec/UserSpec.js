var userClass = require('../src/users.js');
var utils = require('../src/utils.js');
describe("Tests à propos des Users", function() {
 
	var usernameTest = "usernameTest";
	var emailTest = "emailTest";
	var passwordTest ="passwordTest";
	var myUser = userClass.create('usernameTest','emailTest','passwordTest');

	/**********
	*   TDD   *
	**********/
	it("L'User crée n'est pas null", function() {
		expect(myUser).not.toBe(null);
	});
	it("L'User possède un username non null", function() {
		var username = myUser.username;
		expect(username).not.toBe(null);
	});
	it("L'username est un string", function() {
		var usernameType = typeof myUser.username;

		expect(usernameType).toEqual("string");
	});
	it("L'username du User est conforme", function() {
		var username = myUser.username;
		expect(username).toEqual(usernameTest);
	});
	it("L'User possède un email non null", function() {
		var email = myUser.email;
		expect(email).not.toBe(null);
	});
	it("L'email du User est conforme", function() {
		var email = myUser.email;
		expect(email).toEqual(emailTest);
	});
	it("L'User possède un password non null", function() {
		var password = myUser.password;
		expect(password).not.toBe(null);
	});
	it("Le password du User n'est pas en clair", function() {
		var password = myUser.password;
		expect(password).not.toEqual(passwordTest);
	});
	it("Le password du User est correctement crypté", function() {
		var password = myUser.password;
		expect(password).toEqual(utils.encrypt(password));
	});
	//TODO: User BDD (CRUD)




});