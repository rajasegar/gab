'use strict';

const inquirer = require('inquirer');

const starterPrompt = {
  type: 'list',
  name: 'category',
  messages: 'Which type of workflow you need?',
  choices: ['Continuous Integration', 'Automation', 'SVG Icons'],
};

module.exports = function () {
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
            let _name = d.name.replace('.yml', '');
            _name = _name.charAt(0).toUpperCase() + _name.slice(1);
            return _name;
          });

        const choosePrompt = {
          type: 'list',
          name: 'workflow',
          message: ' Choose workflow',
          choices,
        };

        inquirer.prompt(choosePrompt).then((answers) => {
          console.log(answers);
        });
      });
  });
};
