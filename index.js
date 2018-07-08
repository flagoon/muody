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
        title: 'Git pull on correct branch.',
        task: () =>
            new Listr([
                {
                    title: 'Checkout to correct branch.',
                    skip: () => {
                        gitCommands.gitCheckBranchName('tvar').then(res => {
                            console.warn(`+++${res}+++`);
                            if (res) {
                                return 'On correct branch';
                            }
                        });
                    },
                    task: () => {
                        gitCommands.gitCheckUncommited().then(res => {
                            console.warn(`---${res}---`);
                            if (res) {
                                throw new Error(
                                    'There are uncommited changes!'
                                );
                            }
                            return execa('git', ['checkout', 'readme'])
                                .then(res => {
                                    console.warn(res);
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        });
                    },
                },
                {
                    title: 'All correct!',
                    task: () => {},
                },
            ]),
    },
]);

command.run().catch(err => {
    console.error(err);
});
