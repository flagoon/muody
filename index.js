#!/usr/bin/env node
const chalk = require('chalk');
const Listr = require('listr');

const moduleCommands = require('./modulesCommands').moduleCommands;
const dockerCommands = require('./dockerCommands/').dockerCommands;
const argv = require('./helpers/argv');
const helper = require('./helpers/helpers');

helper.showLogo();

// remove folders, npm install, npm build, npm start
const modules = new Listr(moduleCommands);

// remove all Docker containers, remove all Docker images, start docker :)
const docker = new Listr(dockerCommands);

// check if user uses correct command
try {
    task = helper.checkArguments(argv);
} catch (error) {
    console.log(chalk.white.bgRed(error.message));
    process.exit();
}

switch (task) {
    case 'libs':
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
        break;
    case 'docker':
        docker
            .run()
            .then(() =>
                console.log(
                    chalk.black.bgGreen(
                        `\n All containers and images are removed or didn't exists in the first place. You can pull your own images now. \n`
                    )
                )
            )
            .catch(err => console.log(err));
        break;
    default:
        console.log('Something went wrong.');
}
