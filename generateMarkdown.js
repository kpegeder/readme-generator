// function to generate markdown for README
function generateMarkdown(data) {
  let license = data.license;
  let install = "```\n" + data.install + "\n```\n";
  let test = "```\n" + data.test + "\n```\n";

  return `
# ${data.title}
## Description
${data.description}
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
## Installation
To install necessary dependencies, run the following command:
${install}
## Usage
## Test
To run tests, run the following command:
${test}
## Credits
## License
![License Badge](https://img.shields.io/badge/License-${license}-blue)
## Badges
## Contributing
`;
}

module.exports = generateMarkdown;
