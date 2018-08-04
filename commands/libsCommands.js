const execa = require('execa');
const getRunningContainers = require('./dockerCommands').getRunningContainers;
const stopContainers = require('./dockerCommands').stopAllContainers;

const folders = require('../config');

const moduleCommands = [
    {
        title: 'Installing modules',
        task: () => execa('npm', ['i']),
    },
    {
        title: 'Stop running containers',
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
        task: () => execa('npm', ['start']),
    },
    {
        title: 'Building the package',
        task: () => execa('npm', ['run', 'build']),
    },
];

const extractFolderName = folder => folder.split('/').pop();

folders.forEach(folder => {
    const folderName = extractFolderName(folder);
    const task = {
        title: `Removing ${folderName}`,
        task: () => execa('rm', ['-rf', folder]),
    };
    moduleCommands.unshift(task);
});

module.exports = {
    moduleCommands,
};
