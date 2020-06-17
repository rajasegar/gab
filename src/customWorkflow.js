'use strict';

const inquirer = require('inquirer');
const writeActionFile = require('./writeActionFile');

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
    choices: ['push', 'pull_request', 'schedule'],
  },
  {
    type: 'checkbox',
    name: 'branches',
    message: 'Which branch you want to run the workflow?',
    choices: ['master', 'develop', 'other'],
  },
];

const jobsPrompt = [
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

const stepsPrompt = [
  {
    type: 'list',
    name: 'uses',
    message: 'uses:',
    choices: [
      'actions/checkout@v2',
      'actions/setup-node@v1',
      'actions/setup-ruby@v1',
      'actions/setup-dotnet@v1',
      'actions/setup-haskell@v1.1',
      'actions/setup-python@v2',
      'actions/setup-java@v1',
      'actions/setup-go@v2',
    ],
  },
  {
    type: 'input',
    name: 'stepName',
    message: 'name:',
  },
  {
    type: 'run',
    name: 'stepRun',
    message: 'run:',
  },
];

module.exports = function () {
  inquirer.prompt(commandsPrompt).then((answers) => {
    const { name, on, branches } = answers;

    inquirer.prompt(jobsPrompt).then((jobAnswers) => {
      const { jobId, jobName, runsOn } = jobAnswers;

      inquirer.prompt(stepsPrompt).then((stepAnswers) => {
        const { uses, stepName, stepRun } = stepAnswers;

        const workflow = `
    name: ${name}
    on:
      ${on}
        branches:
        - [${branches}]

    jobs:
      ${jobId}:
        name: ${jobName}
        runs-on: ${runsOn}
        steps:
        - uses: ${uses}
        - name: ${stepName}
        - run: ${stepRun}


    `;

        console.log(workflow);
        const fileName = `{answers.name}.yml`;

        writeActionFile(fileName, workflow);
      });
    });
  });
};
