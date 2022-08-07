const Employee = require("../lib/Employee.js");

class Manager extends Employee {
	constructor(name, id, email, officeNumber) {
		super(name, id, email);

		this.officeNumber = getOffice();
	}

	getOffice() {
		return this.officeNumber;
	}

	getRole() {
		return Manager;
	} //overridden to return 'Manager'
}
