#!/usr/bin/env node
const argv = require('yargs').argv;
const chalk = require('chalk');
const gitCommands = require('./gitCommands/handleBranch');
const helper = require('./helpers/helpers');

// It retrieve branch name from command line.
const branch = gitCommands.handleBranch(argv['b']);

helper.showLogo();

helper
    .gitPull(branch)
    .then(res => console.log(chalk.green(res.stdout)))
    .catch(err => console.log(chalk.white.bgRed(err.stderr)));

// helper
//     .gitCheckout(branch)
//     .then(res => console.log(chalk.green(res.stdout)))
//     .catch(err => console.log(chalk.white.bgRed(err.stderr)));
