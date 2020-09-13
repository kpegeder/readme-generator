const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");

// Make sure a response is made
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
  // Create array for possible answers
  const arrayAnsCollab = [];
  const arrayFile = [];
  const arrayList = [];

  // Get answers from the questions
  let answers = await inquirer.prompt(questions);

  // See if you worked with anyone
  let check = answers.collaborate;

  while (check) {
    let collabAns = await inquirer.prompt(collaborateQuestion);
    check = collabAns.collabConfirm;
    arrayAnsCollab.push(collabAns);
  }

  // Based on the demo question switch between cases
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
      let verifyFile = true;

      while (confirmList) {
        let listAns = await inquirer.prompt(listQuestion);
        confirmList = listAns.listConfirm;
        arrayList.push(listAns);
      }

      while (verifyFile) {
        let fileAns = await inquirer.prompt(fileQuestion);
        verifyFile = fileAns.fileConfirm;
        arrayFile.push(fileAns);
      }
      break;
  }

  // Add array to answer object
  answers.collaborators = arrayAnsCollab;
  answers.usageList = arrayList;
  answers.fileList = arrayFile;
  return answers;
}

// function to initialize program
async function init() {
  try {
    console.log("All questions require an answer.");

    const answers = await promptUser();

    const write = generateMarkdown(answers);

    const title = answers.title.split(" ").join("");

    const path = `../${title}.md`;

    await fs.writeFile(path, write, (err) => {
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
