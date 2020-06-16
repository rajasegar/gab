'use strict';

const inquirer = require('inquirer');

const commandsPrompt = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of the workflow?',
  },
  {
    type: 'list',
    name: 'on',
    message: 'When do you want to run the workflow?',
    choices: ['push', 'pull_request'],
  },
  {
    type: 'input',
    name: 'jobId',
    message: 'What is the id of your job?',
  },
  {
    type: 'input',
    name: 'jobName',
    message: 'What is the name of your job?',
  },
  {
    type: 'list',
    name: 'runsOn',
    message: 'Which type of machine you want your job to run on?',
    choices: [
      'ubuntu-latest',
      'ubuntu-18.04',
      'ubuntu-20.04',
      'ubuntu-16.04',
      'macos-latest',
      'macos-10.15',
      'windows-latest',
      'windows-2019',
    ],
  },
];

module.exports = function () {
  inquirer.prompt(commandsPrompt).then((answers) => {
    console.log(answers);
  });
};
