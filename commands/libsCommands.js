const argv = require('../helpers/argv');
const execa = require('execa');
const Listr = require('listr');
const getRunningContainers = require('./dockerCommands').getRunningContainers;
const stopContainers = require('./dockerCommands').stopAllContainers;

const folders = require('../config');

const enabledCommands = {
    install: argv.module['i'],
    docker: argv.module['d'],
    build: argv.module['b'],
};

const moduleCommands = [
    {
        title: 'Installing modules',
        enabled: () => enabledCommands.install,
        task: async ctx => {
            ctx.removeDist = true;
            await execa('npm', ['i']);
        },
    },
    {
        title: 'Stop running containers',
        enabled: () => enabledCommands.docker,
        task: async (ctx, task) => {
            const containers = await getRunningContainers();
            if (containers === null) {
                task.skip(`No containers to stop!`);
            } else {
                return stopContainers();
            }
        },
    },
    {
        title: 'Starting the docker',
        enabled: () => enabledCommands.docker,
        task: () => execa('npm', ['start']),
    },
    {
        title: 'Building the app',
        enabled: () => enabledCommands.build,
        task: () =>
            new Listr([
                {
                    title: 'Removing dist folder.',
                    task: async () => await execa('rm', ['-rf', 'dist']),
                },
                {
                    title: 'Building the package.',
                    task: async ctx => {
                        ctx.removeDist = false;
                        await execa('npm', ['run', 'build']);
                    }, //,
                },
            ]),
    },
    {
        title: 'Remove dist folder.',
        enabled: ctx => ctx.removeDist,
        task: () => execa('rm', ['-rf', 'dist']),
    },
];

const extractFolderName = folder => folder.split('/').pop();

folders.forEach(folder => {
    const folderName = extractFolderName(folder);
    const task = {
        title: `Removing ${folderName}`,
        enabled: () => enabledCommands.install,
        task: () => execa('rm', ['-rf', folder]),
    };
    moduleCommands.unshift(task);
});

module.exports = {
    moduleCommands,
};
