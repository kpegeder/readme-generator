const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./generateMarkdown");

// array of questions for user
const questions = [
  {
    type: "input",
    message: "What is the project's name?",
    name: "title"
  },
  {
    type: "input",
    message: "Please write a description about your project",
    name: "description"
  },
  {
    type: "input",
    message: "What command should be run to install dependencies?",
    name: "install",
    default: "npm i"
  },
  {
    type: "list",
    message: "What type of license to use?",
    name: "license",
    choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
  },
  {
    type: "input",
    message: "What command should be used to run tests?",
    name: "test",
    default: "npm test"
  },
  {
    type: "input",
    message: "What is your name?",
    name: "name",
    validate: function validateName(name) {
      console.log("\nPlease enter your name to continue");
      return name !== "";
    }
  },
  {
    type: "input",
    message: "What is your GitHub username?",
    name: "username"
  },
  {
    type: "list",
    message: "Did you collaborate with anyone?",
    name: "numberPeople",
    choices: ["0", "1", "2", "3", "4", "5"]
  },
  {
    type: "input",
    message:
      "If you collaborated with anyone, please create a list with a comma to separate collaborators.",
    name: "collaborate"
  },
  {
    type: "input",
    message:
      "Put the demo picture or video file in an assest/images folder, what is the file name and extension? (ex demo.jpg)",
    name: "demo"
  }
];

function promptUser() {
  return inquirer.prompt(questions);
}

// function to write README file
function writeToFile(fileName, data) {
  // const write = generateMarkdown(data);
  console.log(filename, data);
  return fs.writeFile(filename, JSON.stringify(data, null, "\t"), (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("Success!");
  });
}

// function to initialize program
async function init() {
  try {
    const answers = await promptUser();

    const write = generateMarkdown(answers);

    await fs.writeFile("README.md", write, (err) => {
      if (err) {
        return console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

// function call to initialize program
init();
