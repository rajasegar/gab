#!/usr/bin/env node

'use strict';

const inquirer = require('inquirer');
const templateWorkflow = require('../src/templateWorkflow');
const customWorkflow = require('../src/customWorkflow');
const copyWorkflow = require('../src/copyWorkflow');

const workflowModePrompt = {
  type: 'list',
  name: 'mode',
  message: 'How do you want to setup a workflow?',
  choices: [
    'Choose from Starter Templates',
    'Copy existing workflow',
    'Setup a Custom Workflow',
  ],
};

function main() {
  inquirer.prompt(workflowModePrompt).then((answers) => {
    if (answers.mode === 'Choose from Starter Templates') {
      templateWorkflow();
    } else if (answers.mode === 'Copy existing workflow') {
      copyWorkflow();
    } else {
      customWorkflow();
    }
  });
}

main();
