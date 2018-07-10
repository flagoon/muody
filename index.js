#!/usr/bin/env node
// const argv = require('yargs').argv;
const chalk = require('chalk');
const execa = require('execa');
const Listr = require('listr');

const gitCommands = require('./gitCommands');
const helper = require('./helpers/helpers');

// It retrieve branch name from command line.
// const branch = gitCommands.handleBranch(argv['b']);

helper.showLogo();

const tasks = new Listr([
    {
        title: 'Git pull on correct branch.',
        task: () => {
            return new Listr([
                {
                    title: 'Checkout to correct branch.',
                    skip: async () => {
                        const isSameBranch = await gitCommands.gitCheckBranchName(
                            'tvazr'
                        );
                        return isSameBranch;
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
            ]);
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
