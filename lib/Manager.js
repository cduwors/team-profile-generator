const Employee = require("../lib/Employee.js");

class Manager extends Employee {
	constructor(name, id, email, officeNumber) {
		super(name, id, email);

		this.name = name;
		this.id = id;
		this.email = email;
		this.officeNumber = getOfficeNumber(name);
	}

	getOfficeNumber() {
		// return this.testValue;
		return this.officeNumber;
	}

	getRole() {
		return "Manager";
	} //overridden to return 'Manager'
}
