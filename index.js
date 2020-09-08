const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./generateMarkdown");

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
  },
  {
    type: "input",
    message: "What is the table of content?",
    name: "content"
  },
  {
    type: "checkbox",
    message: "What type of license to use?",
    name: "license",
    choices: ["MIT", "Public Domain", "LGPL", "GPL"]
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
