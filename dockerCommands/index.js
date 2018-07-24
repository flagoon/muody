const execa = require('execa');

// name for placeholder dockers.
// TODO: needs to be in other file.
const mockedDockers = ['hello-world', 'alpine', 'busybox'];

// comands to create dockers
const createDockers = [];

// stop all containers
const stopAllContainers = async () => {
    const containers = await getAllIdFromDockerContainers();
    await containers.forEach(container => {
        execa('docker', ['stop', container]);
    });
};
// remove all containers
const removeAllContainers = async () => {
    const containers = await getAllIdFromDockerContainers();
    containers.forEach(container => {
        execa('docker', ['rm', container]);
    });
};
// remove all images
const removeAllImages = async () => {
    const images = await getAllIdFromDockerImages();
    images.forEach(image => {
        execa('docker', ['rmi', image]);
    });
};

// TODO: skipping login needs refactor!
const dockerCommands = [
    {
        title: 'Stop the containers.',
        skip: async () => {
            const isContainers = await getAllIdFromDockerContainers();
            if (isContainers === null) {
                return 'There are no containers available!';
            }
        },
        task: () => stopAllContainers(),
    },
    {
        title: 'Remove all containers.',
        skip: async () => {
            const isContainers = await getAllIdFromDockerContainers();
            if (isContainers === null) {
                return 'There are no containers available!';
            }
        },
        task: () => removeAllContainers(),
    },
    {
        title: 'Remove all images.',
        skip: async () => {
            const isImages = await getAllIdFromDockerImages();
            if (isImages === null) {
                return 'There are no images available!';
            }
        },
        task: () => removeAllImages(),
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

// retrieve list of available docker containers.
const getAllIdFromDockerContainers = async () => {
    const listOfContainers = await execa('docker', ['ps', '-qa']);
    if (listOfContainers.stdout === '') {
        return null;
    }

    return listOfContainers.stdout.split('\n');
};

// retrieve list of available docker images.
const getAllIdFromDockerImages = async () => {
    const listOfImages = await execa('docker', ['images', '-qa']);
    if (listOfImages.stdout === '') {
        return null;
    }

    return listOfImages.stdout.split('\n');
};

module.exports = {
    dockerCommands,
    createDockers,
};
