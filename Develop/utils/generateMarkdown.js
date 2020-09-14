// function to generate markdown for README
function generateMarkdown(data) {
  // Create blank strings
  let collaborate = "";
  let credit = "";
  let credits = "";
  let arrayPerson = "";
  let list = "";
  let file = "";

  // Edit data input to work with the string
  let license = data.license.replace(" ", "%20");
  let install = "```\n" + data.install + "\n```\n";
  let test = "```\n" + data.test + "\n```\n";

  // Write a function to add collaborators
  if (data.collaborate) {
    for (let i = 0; i < data.collaborators.length; i++) {
      let person = `* [${data.collaborators[i].collabName}](https://github.com/${data.collaborators[i].collabUsername})\n`;
      arrayPerson += person;
    }
    credit = "## Credit";
    credits = "\n* [Credits](#credit)";
    collaborate = `List of Collabarators\n`;
    collaborate = "".concat(collaborate, arrayPerson);
  }

  // Add the type of files to the Usage
  if (data.demo === "list") {
    for (let i = 0; i < data.usageList.length; i++) {
      let listUsage = `${[i + 1]}. ${data.usageList[i].step}\n`;
      list += listUsage;
    }
  }

  if (data.demo === "picture/video") {
    for (let i = 0; i < data.fileList.length; i++) {
      let fileUsage = `![Demo](./assets/images/${data.fileList[i].file})\n`;
      file += fileUsage;
    }
  }

  if (data.demo === "both") {
    for (let i = 0; i < data.usageList.length; i++) {
      let listUsage = `${[i + 1]}. ${data.usageList[i].step}\n`;
      list += listUsage;
    }
    for (let i = 0; i < data.fileList.length; i++) {
      let fileUsage = `![Demo](./assets/images/${data.fileList[i].file})\n`;
      file += fileUsage;
    }
  }

  return `
# ${data.title}
![License Badge](https://img.shields.io/badge/License-${license}-blue) ![Code Badge](https://img.shields.io/badge/JavaScript-100%25-green)
## Description
${data.description}
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Test](#test)${credits}
* [License](#license)
* [Questions](#questions)
## Installation
To install necessary dependencies, run the following command:
${install}
## Usage
Instructions to use the program are shown below
${list}
${file}
## Test
To run tests, run the following command:
${test}
${credit}
${collaborate}
## Contributing
[${data.name}](https://github.com/${data.username})
## License
Licensed under the ${license} license.
## Questions
If you have any additional questions about the applictaion, you can contact through [email](mailto:${data.email}). 
You can see more of my work on [GitHub](https://github.com/${data.username}).
`;
}

module.exports = generateMarkdown;
