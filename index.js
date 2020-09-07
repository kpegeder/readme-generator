const inquirer = require("inquirer");
const fs = require("fs");

// array of questions for user
const questions = [
  {
    type: "input",
    message: "What is the title of the README?",
    name: "title"
  },
  {
    type: "input",
    message: "What is the description of the app?",
    name: "description"
  }
];

// function to write README file
// function writeToFile(fileName, data) {}

// function to initialize program
function init() {
  inquirer.prompt(questions).then(function (data) {
    fs.writeFile("README.md", JSON.stringify(data, null, "\t"), (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("Success!");
    });
  });
}

// function call to initialize program
init();
