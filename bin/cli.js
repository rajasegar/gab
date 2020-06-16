#!/usr/bin/env node

'use strict';

const inquirer = require('inquirer');
const templateWorkflow = require('../src/templateWorkflow');
const customWorkflow = require('../src/customWorkflow');

const workflowModePrompt = {
  type: 'list',
  name: 'mode',
  message: 'How do you want to setup a workflow?',
  choices: ['Choose from Templates', 'Setup a Custom Workflow'],
};

function main() {
  inquirer.prompt(workflowModePrompt).then((answers) => {
    console.log(answers);
    if (answers.mode === 'Choose from Templates') {
      templateWorkflow();
    } else {
      customWorkflow();
    }
    /*
    const workflow = `
    name: ${answers.name}
    on:
      ${answers.on}

    jobs:
      ${answers.jobId}:
        name: ${answers.jobName}
        runs-on: ${answers.runsOn}
        steps:


    `;

    console.log(workflow);
    */
  });
}

main();
