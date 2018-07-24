const execa = require('execa');

// name for placeholder dockers.
// TODO: needs to be in other file.
const mockedDockers = ['hello-world', 'alpine', 'busybox'];

// comands to create dockers
const createDockers = [];
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

// TODO: needs to be in other file!
const createDockerTask = dockerName => {
    return {
        title: `Adding ${dockerName}`,
        skip: () => false,
        task: () => execa('docker', ['run', dockerName]),
    };
};

// fill createDockers table with data.
// TODO: needs to be in other file!
mockedDockers.forEach(dockerName => {
    const command = createDockerTask(dockerName);

    createDockers.push(command);
});

module.exports = {
    dockerCommands,
    createDockers,
};
