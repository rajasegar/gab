'use strict';

const inquirer = require('inquirer');
const writeActionFile = require('./writeActionFile');

const starterPrompt = {
  type: 'list',
  name: 'category',
  messages: 'Which type of workflow you need?',
  choices: ['Continuous Integration', 'Automation', 'SVG Icons'],
};

module.exports = function () {
  inquirer.prompt(starterPrompt).then((answers) => {
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
        const choices = response.data
          .filter((d) => d.type !== 'dir')
          .map((d) => {
            let _name = d.name.replace('.yml', '');
            _name = _name.charAt(0).toUpperCase() + _name.slice(1);
            return _name;
          });

        const choosePrompt = {
          type: 'list',
          name: 'workflow',
          message: 'Choose workflow',
          choices,
        };

        inquirer.prompt(choosePrompt).then((answers) => {
          let { workflow } = answers;
          let ymlName = workflow.charAt(0).toLowerCase() + workflow.slice(1);
          ymlName = `${ymlName}.yml`;

          const ymlFile = response.data.find((y) => y.name === ymlName);

          octokit.repos
            .getContent({
              owner: 'actions',
              repo: 'starter-workflows',
              path: `${path}/${ymlName}`,
            })
            .then((response) => {
              const ymlData = Buffer.from(response.data.content, 'base64');
              console.log(ymlData.toString());

              writeActionFile(ymlName, ymlData);
            });
        });
      });
  });
};
