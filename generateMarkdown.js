// function to generate markdown for README
function generateMarkdown(data) {
  let collaborate;
  let license = data.license;
  let install = "```\n" + data.install + "\n```\n";
  let test = "```\n" + data.test + "\n```\n";
  let list = data.collaborate.split(",");

  switch (data.numberPeople) {
    case "0":
      collaborate = "Worked on the project alone";
      break;
    case "1":
      collaborate = "List of Collabarators\n* " + list[0];
      break;
    case "2":
      collaborate = "List of Collabarators\n* " + list[0] + "\n*" + list[1];
      break;
    case "3":
      collaborate =
        "List of Collabarators\n* " +
        list[0] +
        "\n*" +
        list[1] +
        "\n*" +
        list[2];
      break;
    case "4":
      collaborate =
        "List of Collabarators\n* " +
        list[0] +
        "\n*" +
        list[1] +
        "\n* " +
        list[2] +
        "\n*" +
        list[3];
      break;
    case "5":
      collaborate =
        "List of Collabarators\n* " +
        list[0] +
        "\n*" +
        list[1] +
        "\n*" +
        list[2] +
        "\n*" +
        list[3] +
        "\n*" +
        list[4];
      break;
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
* [Credits](#credits)
* [License](#license)
## Installation
To install necessary dependencies, run the following command:
${install}
## Usage
Instructions to use the program are shown below
![Demo](./assets/images/${data.demo})
## Test
To run tests, run the following command:
${test}
## Credit
${collaborate}
## Contributing
[${data.name}](https://github.com/${data.username})
## License
Licensed under the ${license} license.
`;
}

module.exports = generateMarkdown;
