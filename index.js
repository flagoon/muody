#!/usr/bin/env node
const chalk = require('chalk');
const Listr = require('listr');

const gitCommands = require('./gitCommands');
const moduleCommands = require('./modulesCommands').moduleCommands;
const dockerCommands = require('./dockerCommands/').dockerCommands;
const argv = require('./helpers/argv');
const helper = require('./helpers/helpers');

helper.showLogo();

// checkout to branch and pull changes. THIS NEEDS TO BE REMADE.
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

const createTestDockers = new Listr(createDockers);

// check if user uses correct command
try {
    task = helper.checkArguments(argv);
} catch (error) {
    console.log(chalk.white.bgRed(error.message));
    process.exit();
}

switch (task) {
    case 'libs':
        modules.run().catch(err => console.log(err));
        break;
    case 'docker':
        docker.run().catch(err => console.log(err));
        break;
    case 'start':
        try {
            git.run();
            modules.run();
        } catch (err) {
            console.log(err);
        }
    case 'cdocker':
        createTestDockers
            .run()
            .then(() =>
                console.log(
                    chalk.black.bgGreen(
                        `\n Placeholder docker were created. \n`
                    )
                )
            )
            .catch(err => console.log(err.message));
        break;
    default:
        console.log('Something went wrong.');
}
