const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./generateMarkdown");

function verifyInput(name) {
  return name !== "";
}

// array of questions for user
const questions = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
    validate: verifyInput
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",
    validate: verifyInput
  },
  {
    type: "input",
    message: "What is your GitHub username?",
    name: "username",
    validate: verifyInput
  },
  {
    type: "input",
    message: "What is the project's name?",
    name: "title",
    validate: verifyInput
  },
  {
    type: "input",
    message: "Please write a description about your project",
    name: "description",
    validate: verifyInput
  },
  {
    type: "input",
    message: "What command should be run to install dependencies?",
    name: "install",
    default: "npm i"
  },
  {
    type: "list",
    message: "How do you want to explain usage?",
    name: "demo",
    choices: ["list", "picture/video", "both"]
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
    type: "confirm",
    message: "Did you collaborate with anyone?",
    name: "collaborate",
    default: false
  }
];

const listQuestion = [
  {
    type: "input",
    message: "What is the step?",
    name: "step",
    validate: verifyInput
  },
  {
    type: "confirm",
    message: "Do you want to add another step?",
    name: "listConfirm"
  }
];

const fileQuestion = [
  {
    type: "input",
    message: "What is the picure/video file name and type? (ex demo.png)",
    name: "file"
  },
  {
    type: "confirm",
    message: "Do you want to add another file?",
    name: "fileConfirm"
  }
];

const collaborateQuestion = [
  {
    type: "input",
    message: "Name of collaborate",
    name: "collabName",
    validate: verifyInput
  },
  {
    type: "input",
    message: "GitHub username",
    name: "collabUsername",
    validate: verifyInput
  },
  {
    type: "confirm",
    message: "Do you want to add another collaborator?",
    name: "collabConfirm",
    default: false
  }
];

// Adding collaborators if any
async function promptUser() {
  const arrayAnsCollab = [];
  const arrayFile = [];
  const arrayList = [];

  let answers = await inquirer.prompt(questions);
  let check = answers.collaborate;

  while (check) {
    let collabAns = await inquirer.prompt(collaborateQuestion);
    check = collabAns.collabConfirm;
    arrayAnsCollab.push(collabAns);
  }

  switch (answers.demo) {
    case "list":
      let confirm = true;
      while (confirm) {
        let listAns = await inquirer.prompt(listQuestion);
        confirm = listAns.listConfirm;
        arrayList.push(listAns);
      }
      break;
    case "picture/video":
      let verify = true;
      while (verify) {
        let fileAns = await inquirer.prompt(fileQuestion);
        verify = fileAns.fileConfirm;
        arrayFile.push(fileAns);
      }
      break;
    case "both":
      let confirmList = true;
      while (confirmList) {
        let listAns = await inquirer.prompt(listQuestion);
        confirmList = listAns.confirmList;
        arrayList.push(listAns);
      }

      let verifyFile = true;
      while (verifyFile) {
        let fileAns = await inquirer.prompt(fileQuestion);
        verifyFile = fileAns.verifyFile;
        arrayFile.push(fileAns);
      }
      break;
  }

  answers.collaborators = arrayAnsCollab;
  answers.usageList = arrayList;
  answers.fileList = arrayFile;
  console.log(answers);
  return answers;
}

// function to initialize program
async function init() {
  try {
    console.log("All questions require an answer.");

    const answers = await promptUser();

    const write = generateMarkdown(answers);
    console.log(answers);
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
