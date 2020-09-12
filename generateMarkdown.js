// function to generate markdown for README
function generateMarkdown(data) {
  let collaborate = "";
  let credit = "";
  let arrayPerson = "";
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
    collaborate = `List of Collabarators\n`;
    collaborate = "".concat(collaborate, arrayPerson);
  }

  return `
# ${data.title}
![License Badge](https://img.shields.io/badge/License-${license}-blue) ![Code Badge](https://img.shields.io/badge/JavaScript-100%-green)
## Description
${data.description}
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Test](#test)
* [Credits](#credit)
* [License](#license)
* [Questions](#questions)
## Installation
To install necessary dependencies, run the following command:
${install}
## Usage
Instructions to use the program are shown below
![Demo](./assets/images/${data.demo})
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
You can see more of my work on [GitHub](https://github.com/${data.username})
`;
}

module.exports = generateMarkdown;
