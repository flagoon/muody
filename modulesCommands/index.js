const execa = require('execa');

const folders = require('../folderToDelete');

const moduleCommands = [
    {
        title: 'Installing modules',
        // task: () => execa('npm', ['i']),
        task: () => execa('mkdir', ['modules1']),
    },
    {
        title: 'Building the package',
        // task: () => execa('npm', ['run', 'build']),
        task: () => execa('mkdir', ['modules2']),
    },
    {
        title: 'Starting the docker',
        // task: () => execa('npm', ['start']),
        task: () => execa('mkdir', ['modules3']),
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
