#!/usr/bin/env node
const chalk = require('chalk');
const Listr = require('listr');

const moduleCommands = require('./commands/libsCommands').moduleCommands;
const dockerCommands = require('./commands/dockerCommands').dockerCommands;
const argv = require('./helpers/argv');
const helper = require('./helpers/helpers');

helper.showLogo();

// remove folders, npm install, npm build, npm start
const modules = new Listr(moduleCommands);

// check if user uses correct command

try {
    task = helper.checkArguments(argv);
} catch (error) {
    console.log(chalk.white.bgRed(error.message));
    process.exit();
}

console.log(task);

modules
    .run()
    .then(() =>
        console.log(
            chalk.black.bgGreen(
                '\n All folders were removed, installed, app was build and run. \n'
            )
        )
    )
    .catch(err => console.log(err));
