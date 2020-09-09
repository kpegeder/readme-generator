// function to generate markdown for README
function generateMarkdown(data) {
  let j = [];
  for (let i = 0; i < 3; i++) {
    j.push(i);
  }
  console.log(j);
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
## Usage
## Credits
## License
${data.license}
## Badges
## Contributing
## Test

`;
}

module.exports = generateMarkdown;
