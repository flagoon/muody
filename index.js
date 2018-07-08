#!/usr/bin/env node
const argv = require('yargs').argv;
const chalk = require('chalk');
const execa = require('execa');
const Listr = require('listr');

const gitCommands = require('./gitCommands');
const helper = require('./helpers/helpers');

// It retrieve branch name from command line.
// const branch = gitCommands.handleBranch(argv['b']);

helper.showLogo();

const command = new Listr([
    {
        title: 'Checking the branch',
        task: () =>
            gitCommands
                .gitCheckUncommited()
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err.message)),
    },
]);

command.run();

// helper
//     .gitCheckout(branch)
//     .then(res => console.log(chalk.green(res.stdout)))
//     .catch(err => console.log(chalk.white.bgRed(err.stderr)));
