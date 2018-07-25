const execa = require('execa');

const folders = require('../config');

const moduleCommands = [
    {
        title: 'Installing modules',
        task: () => execa('npm', ['i']),
    },
    {
        title: 'Building the package',
        task: () => execa('npm', ['run', 'build']),
    },
    {
        title: 'Starting the docker',
        task: () => execa('npm', ['start']),
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
