#!/usr/bin/env node
const argv = require('yargs').argv;
const chalk = require('chalk');
const gitCommands = require('./gitCommands/handleBranch');
const helper = require('./helpers/helpers');

const branch = gitCommands.handleBranch(argv['b']);

console.log(branch);

// helper.showLogo();
// helper
//     .gitPull(branch)
//     .then(res => console.log(chalk.green(res.stdout)))
//     .catch(err => console.log(chalk.white.bgRed(err.stderr)));
