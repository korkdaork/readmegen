const inquirer = require("inquirer");
const fs = require("fs");
const util = requirre("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the project name?"
        },
        {
            type: "input",
            name: "description",
            message: "What is the project about (a brief description)?"
        },
        {
            type: "input",
            name: "install",
            message: "Does the project needs installations? If so, what needs to be installed?"
        },
        {
            type: "input",
            name: "started",
            message: "What is needed to get started?"
        },
        {
            type: "input",
            name: "credit",
            message: "Who worked on the project?"
        },
        {
            type: "input",
            name: "message",
            message: "Any brief message you want to leave at the end of the readme file?"
        },

    ]);
};

function generateTXT(answers) {
    return `
    #${answers.name}
    ${answers.description}
    ##Installation:
    ${answers.install}
    ##Getting Started
    ${answers.started}
    ##Credits and Collaboration:
    ${answers.credit}
    ##A Quick Message:
    ${answers.message}
    `;
}

async function init() {
    console.log("Greetings");
    try {
        const answers = await promptUser();

        const txt = generateTXT(answers);

        await writeFileAsync("test.md", txt);
    } catch (err) {
        console.log(err);
    }
};

init();