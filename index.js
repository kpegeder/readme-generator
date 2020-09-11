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
    type: "confirm",
    message: "Did you collaborate with anyone?",
    name: "collaborate"
  },
  {
    type: "input",
    message:
      "Put the demo picture or video file in an assest/images folder,\n  what is the file name and extension? (ex demo.jpg)",
    name: "demo"
  }
];

const collaborateQuestion = [
  {
    type: "input",
    message: "Name of collaborate",
    name: "collaborateName"
  },
  {
    type: "input",
    message: "GitHub username",
    name: "collabUsername"
  },
  {
    type: "confirm",
    message: "Do you want to add another collaborator?",
    name: "collabConfirm"
  }
];

// Adding collaborators if any
async function promptUser() {
  const arrayAnswers = [];
  let answers = await inquirer.prompt(questions);
  let check = answers.collaborate;

  while (check) {
    let collabAns = await inquirer.prompt(collaborateQuestion);
    check = collabAns.collabConfirm;
    arrayAnswers.push(collabAns);
  }
  answers.collaborators = arrayAnswers;
  console.log(typeof answers.license);

  return answers;
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
      console.log("Success!");
    });
  } catch (err) {
    console.log(err);
  }
}

// function call to initialize program
init();
