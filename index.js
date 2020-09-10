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
    message: "What is the table of content?",
    name: "content"
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
