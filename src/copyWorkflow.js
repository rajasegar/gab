'use strict';

const inquirer = require('inquirer');
const writeActionFile = require('./writeActionFile');

const starterPrompt = {
  type: 'input',
  name: 'repo',
  messages: 'Enter repo info (user/repo):',
};

module.exports = function () {
  inquirer.prompt(starterPrompt).then((answers) => {
    const [owner, repo] = answers.repo.split('/');
    require('dotenv').config();
    const { Octokit } = require('@octokit/rest');
    const octokit = new Octokit({ auth: process.env.GH_PAT });

    octokit.repos
      .getContent({
        owner,
        repo,
        path: '.github/workflows',
      })
      .then((response) => {
        const choosePrompt = {
          type: 'checkbox',
          name: 'workflows',
          message: 'Choose workflow',
          choices: response.data,
        };

        inquirer.prompt(choosePrompt).then((answers) => {
          let { workflows } = answers;

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
        });
      });
  });
};
