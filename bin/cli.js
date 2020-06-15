#!/usr/bin/env node

'use strict';

const inquirer = require('inquirer');

const workflowModePrompt = {
  type: 'list',
  name: 'mode',
  message: 'How do you want to setup a workflow?',
  choices: ['Choose from Templates', 'Setup a Custom Workflow'],
};

const starterPrompt = {
  type: 'list',
  name: 'category',
  messages: 'Which type of workflow you need?',
  choices: ['Continuous Integration', 'Automation', 'SVG Icons'],
};

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

function main() {
  inquirer.prompt(workflowModePrompt).then((answers) => {
    console.log(answers);
    if (answers.mode === 'Choose from Templates') {
      inquirer.prompt(starterPrompt).then((answers) => {
        console.log(answers);
        require('dotenv').config();
        const { Octokit } = require('@octokit/rest');
        const octokit = new Octokit({ auth: process.env.GH_PAT });
        const pathNamesHash = {
          'Continuous Integration': 'ci',
          Automation: 'automation',
          'SVG Icons': 'icons',
        };
        const path = pathNamesHash[answers.category];

        octokit.repos
          .getContent({
            owner: 'actions',
            repo: 'starter-workflows',
            path,
          })
          .then((response) => {
            //console.log(response.data);
            const choices = response.data
              .filter((d) => d.type !== 'dir')
              .map((d) => {
                return d.name.replace('.yml', '');
              });

            const choosePrompt = {
              type: 'list',
              name: 'worflow',
              message: ' Choose workflow',
              choices,
            };

            inquirer.prompt(choosePrompt).then((answers) => {
              console.log(answers);
            });
          });
      });
    } else {
      inquirer.prompt(commandsPrompt).then((answers) => {
        console.log(answers);
      });
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
