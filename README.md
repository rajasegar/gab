# github-actions-builder

[Build and Deploy](https://github.com/rajasegar/gab/workflows/Build%20and%20Deploy/badge.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](http://img.shields.io/npm/v/github-actions-builder.svg?style=flat)](https://npmjs.org/package/github-actions-builder "View this project on npm")

A CLI tool to build github actions workflows from the terminal.

## install

```
npm install github-actions-builder
```

## usage

```
gab
```

There are 3 modes of choosing workflow:
* Choose from Starter Templates
* Copy existing workflow
* Setup a Custom Workflow

### Choose from Starter Templates
This will help you to choose the pre-defined templates from 
[actions/starter-workflows](https://github.com/actions/starter-workflows) based
on categories like `Automation`, `CI`, etc.,

![choose-workflow-demo](choose-demo.gif)

### Copy existing workflow
This will help you to copy existing workflows from various repositories either yours or
others. All you need to do is to give the repo info in the form of:
`<user-name>/<repo-name>` and choose the workflow you want to copy.

![copy-workflow-demo](copy-demo.gif)

### Setup a Custom Workflow [BETA]
This will ask a series of questions to setup your workflow.
This is still a Work-In-Progress, it will not give exhaustive options to setup your workflow.

![custom-workflow-demo](custom-demo.gif)

