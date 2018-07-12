#!/usr/bin/env node
const chalk = require('chalk');
const Listr = require('listr');

const gitCommands = require('./gitCommands');
const helper = require('./helpers/helpers');
const argv = require('./helpers/argv');

helper.showLogo();

helper.checkArguments(argv);
// check if user uses correct command
try {
    helper.checkArguments(argv);
} catch (error) {
    console.log(chalk.white.bgRed(error.message));
    process.exit();
}

const tasks = new Listr([
    {
        title: 'Fetching from repo.',
        task: () => gitCommands.gitFetchRepo(),
    },
    {
        title: 'Checkout to correct branch.',
        skip: async () => {
            const isSameBranch = await gitCommands.gitCheckBranchName('tvar');
            return 'Alread on correct branch.';
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

tasks.run().catch(err => {
    console.log(chalk.white.bgRed(err.message));
});
