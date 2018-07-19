const execa = require('execa');

const dockerCommands = [
    {
        title: 'Removing docker containers',
        task: () => execa('docker', ['rm', '`docker ps -qa`']),
    },
    {
        title: 'Removing docker images',
        task: () => execa('docker', ['rmi', '`docker images -qa`']),
    },
];

module.exports = {
    dockerCommands,
};
