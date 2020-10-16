'use strict';

const inquirer = require('inquirer');
const writeActionFile = require('./writeActionFile');

const starterPrompt = [
  {
    type: 'input',
    name: 'owner',
    message: 'Enter github user id:',
  },
  {
    type: 'input',
    name: 'repo',
    message: 'Enter the repository name:',
  },
];

module.exports = async function () {
  let answers = await inquirer.prompt(starterPrompt);
  const { owner, repo } = answers;
  require('dotenv').config();
  const { Octokit } = require('@octokit/rest');
  const octokit = new Octokit({ auth: process.env.GH_PAT });

  const response = await octokit.repos.getContent({
    owner,
    repo,
    path: '.github/workflows',
  });
  const choosePrompt = {
    type: 'checkbox',
    name: 'workflows',
    message: 'Choose workflow',
    choices: response.data,
  };

  answers = await inquirer.prompt(choosePrompt);
  const { workflows } = answers;

  workflows.forEach((workflow) => {
    octokit.repos
      .getContent({
        owner,
        repo,
        path: `.github/workflows/${workflow}`,
      })
      .then((response) => {
        const ymlData = Buffer.from(response.data.content, 'base64');
        console.log(ymlData.toString());

        writeActionFile(workflow, ymlData);
      });
  });
};
