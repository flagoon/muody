#!/usr/bin/env node
const chalk = require('chalk');
const Listr = require('listr');

const gitCommands = require('./gitCommands');
const moduleCommands = require('./modulesCommands').moduleCommands;
const dockerCommands = require('./dockerCommands/').dockerCommands;
const argv = require('./helpers/argv');
const helper = require('./helpers/helpers');

helper.showLogo();

const git = new Listr([
    {
        title: 'Fetching from repo.',
        task: () => gitCommands.gitFetchRepo(),
    },
    {
        title: 'Checkout to correct branch.',
        skip: async () => {
            const isSameBranch = await gitCommands.gitCheckBranchName('tvar');
            if (isSameBranch) {
                return 'Alread on correct branch.';
            }
            return false;
        },
        task: async () => {
            const isUncommitedChanges = await gitCommands.gitCheckUncommited();

            if (isUncommitedChanges === true) {
                throw new Error(
                    'You need to commit the changes to checkout to other branch!'
                );
            }

            return gitCommands.gitCheckoutToBranch('readme');
        },
    },
    {
        title: 'Pulling from branch.',
        task: () => gitCommands.gitPullFromBranch('readme'),
    },
]);

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

