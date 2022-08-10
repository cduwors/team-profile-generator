const fs = require("fs");
const path = require("path");
const { prompt } = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const DIST_DIR = path.resolve(__dirname, "dist");
const distPath = path.join(DIST_DIR, "team.html");
const companyTeam = [];

function enterTeam() {
	//Create a manager entry
	function promptManager() {
		console.log(`Let's build a team! We'll start with the manager:`);
		return prompt([
			{
				type: "input",
				name: "teamManager",
				message: "What is the Team Manager's name? (Required)",
				validate: (answer) => {
					if (answer) {
						return true;
					} else {
						console.log("Please enter the Team Manager's name.");
						return false;
					}
				},
			},
			{
				type: "input",
				name: "id",
				message: "What is the employee's id? (Required)",
				validate: (answer) => {
					if (answer) {
						return true;
					} else {
						console.log("Please type the employee's id.");
						return false;
					}
				},
			},
			{
				type: "input",
				name: "email",
				message: "What is the employee's email? (Required)",
				validate: (answer) => {
					if (answer) {
						return true;
					} else {
						console.log("Please type the employee's email.");
						return false;
					}
				},
			},
			{
				type: "input",
				name: "officeNumber",
				message: "What is the Manager's office number? (Required)",
				validate: (answer) => {
					if (answer) {
						return true;
					} else {
						console.log("Please type the Manager's office number.");
						return false;
					}
				},
			},
		]).then((answers) => {
			console.log(answers);
			const manager = new Manager(
				answers.teamManager,
				answers.id,
				answers.email,
				answers.officeNumber
			);
			companyTeam.push(manager);
			teamMember();
		});
	}
	//choose Engineer or Intern employee
	function teamMember() {
		console.log(`Great! Let's add a team member!`);
		return prompt([
			{
				type: "list",
				name: "employeeType",
				message: "What team member would you like to add?",
				choices: ["Engineer", "Intern", "Finished adding team members"],
			},
		]).then((userChoice) => {
			switch (userChoice.employeeType) {
				case "Engineer":
					promptEngineer();
					break;
				case "Intern":
					promptIntern();
					break;
				default:
					buildTeam();
			}
		});
	}

	//Create an engineer object
	function promptEngineer() {
		console.log(`Let's add an Engineer to your team!`);
		return prompt([
			{
				type: "input",
				name: "engineerName",
				message: "What is the Engineer's name? (Required)",
				validate: (answer) => {
					if (answer) {
						return true;
					} else {
						console.log("Please enter the Employee's name.");
						return false;
					}
				},
			},
			{
				type: "input",
				name: "engineerId",
				message: "What is the Engineer's ID? (Required)",
				validate: (answer) => {
					if (answer) {
						return true;
					} else {
						console.log("Please type the Engineer's ID.");
						return false;
					}
				},
			},
			{
				type: "input",
				name: "engineerEmail",
				message: "What is the Engineer's email? (Required)",
				validate: (answer) => {
					if (answer) {
						return true;
					} else {
						console.log("Please type the Engineer's email.");
						return false;
					}
				},
			},
			{
				type: "input",
				name: "engineerGithub",
				message: "What is the Engineer's gitHub username? (Required)",
				validate: (answer) => {
					if (answer) {
						return true;
					} else {
						console.log("Please type the Engineer's gitHub username.");
						return false;
					}
				},
			},
			{
				type: "confirm",
				name: "confirmAddEmployee",
				message: "Would you like to enter another Employee?",
				default: false,
			},
		]).then((answers) => {
			console.log(answers);
			const engineer = new Engineer(
				answers.engineerName,
				answers.engineerId,
				answers.engineerEmail,
				answers.engineerGithub
			);
			companyTeam.push(engineer);
			if (answers.confirmAddEmployee) {
				teamMember();
			} else {
				buildTeam();
			}
		});
	}

	//create Intern object
	function promptIntern() {
		console.log(`Let's add an Intern to your team!`);
		return prompt([
			{
				type: "input",
				name: "internName",
				message: "What is the Intern's name? (Required)",
				validate: (answer) => {
					if (answer) {
						return true;
					} else {
						console.log("Please enter the Intern's name.");
						return false;
					}
				},
			},
			{
				type: "input",
				name: "internId",
				message: "What is the Intern's ID? (Required)",
				validate: (answer) => {
					if (answer) {
						return true;
					} else {
						console.log("Please type the Intern's ID.");
						return false;
					}
				},
			},
			{
				type: "input",
				name: "internEmail",
				message: "What is the Intern's email? (Required)",
				validate: (answer) => {
					if (answer) {
						return true;
					} else {
						console.log("Please type the Intern's email.");
						return false;
					}
				},
			},
			{
				type: "input",
				name: "internSchool",
				message: "What is the Intern's school? (Required)",
				validate: (answer) => {
					if (answer) {
						return true;
					} else {
						console.log("Please type the Intern's school.");
						return false;
					}
				},
			},
			{
				type: "confirm",
				name: "confirmAddEmployee",
				message: "Would you like to enter another Employee?",
				default: false,
			},
		]).then((answers) => {
			console.log(answers);
			const intern = new Intern(
				answers.internName,
				answers.internId,
				answers.internEmail,
				answers.internSchool
			);
			companyTeam.push(intern);
			if (answers.confirmAddEmployee) {
				teamMember();
			} else {
				buildTeam();
			}
		});
	}

	function buildTeam() {
		console.log("Ready to generate page!");
		// creating output directory if doesn't already exist
		if (!fs.existsSync(DIST_DIR)) {
			fs.mkdirSync(DIST_DIR);
		}
		// fs.writeFileSync(distPath, "utf-8");
		fs.writeFileSync(
			distPath,
			`

			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta http-equiv="X-UA-Compatible" content="ie=edge" />
					<link
						rel="stylesheet"
						href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
						integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
						crossorigin="anonymous"
					/>
					<title>Team Generator</title>
				</head>
			
				<body>
					<header>
						<div class="container bg-danger text-center p-2">
							<h1 class="page-title text-white justify-content-center">My Team</h1>
						</div>
					</header>
					<main class="container row d-flex px-5 m-5">
		  `
			// for loop to append all team members as cards
		);
		for (let i = 0; i < companyTeam.length; i++) {
			let data = companyTeam[i];
			if (data.getRole() === "Manager") {
				fs.appendFileSync(
					distPath,
					`
					<section>
					<div class="card d-flex shadow p-2 m-2">
						<div class="card-header bg-primary">
							<h2 class="card-title text-white">${data.teamManager}</h2>
							<h3 class="card-title text-white">${data.getRole()}</h3>
						</div>
						<div class="card-body bg-light">
							<ul class="list-group list-group-flush">
								<li class="list-group-item">ID: ${data.id}</li>
								<li class="list-group-item">
									Email:
									<a href="${data.email}"
										>${data.email}</a
									>
								</li>
								<li class="list-group-item">Office Number: ${data.officeNumber}</li>
							</ul>
						</div>
					</div>
				</section>
			  `
				);
			} else if (data.getRole() === "Engineer") {
				fs.appendFileSync(
					distPath,
					`
					<section>
					<div class="card d-flex shadow p-2 m-2">
						<div class="card-header bg-primary">
							<h2 class="card-title text-white">${data.engineerName}</h2>
							<h3 class="card-title text-white">${data.getRole()}</h3>
						</div>
						<div class="card-body bg-light">
							<ul class="list-group list-group-flush">
								<li class="list-group-item">ID: ${data.engineerId}</li>
								<li class="list-group-item">
									Email:
									<a href="${data.engineerEmail}"
										>${data.engineerEmail}</a
									>
								</li>
								<li class="list-group-item">Github: <a href="mailto:https://www.github.com/${
									data.engineerGithub
								}>"${data.engineerGithub}>/a></li>
							</ul>
						</div>
					</div>
				</section>
			`
				);
			} else {
				fs.appendFileSync(
					distPath,
					//enter intern html
					`
					<section>
					<div class="card d-flex shadow p-2 m-2">
						<div class="card-header bg-primary">
							<h2 class="card-title text-white">${data.internName}</h2>
							<h3 class="card-title text-white">${data.getRole()}</h3>
						</div>
						<div class="card-body bg-light">
							<ul class="list-group list-group-flush">
								<li class="list-group-item">ID: ${data.internId}</li>
								<li class="list-group-item">
									Email:
									<a href="${data.internEmail}"
										>${data.internEmail}</a
									>
								</li>
								<li class="list-group-item">School: ${data.internSchool}</li>
							</ul>
						</div>
					</div>
				`
				);
			}
		}
		// one last append to close the html
		fs.appendFileSync(
			distPath,
			`</main>
	  		</body>
	  		</html>`
		);
	}
	promptManager();
}
enterTeam();
