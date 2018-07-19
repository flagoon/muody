const execa = require('execa');

const folders = require('../folderToDelete');

const moduleCommands = [
    {
        title: 'Installing modules',
        task: () => execa('npm', ['i']),
    },
    {
        title: 'Building the package',
        // task: () => execa('npm', ['run', 'build']),
        task: () =>
            execa('mkdir', ['./node_modules/avid-nux-pulse-components']),
    },
    {
        title: 'Starting the docker',
        // task: () => execa('npm', ['start']),
        task: () => execa('mkdir', ['dist']),
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
