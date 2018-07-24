const execa = require('execa');

// stop all containers
const stopAllContainers = async () => {
    const containers = await getAllIdFromDockerContainers();

    for (const container of containers) {
        await execa('docker', ['stop', container]);
    }
};
// remove all containers
const removeAllContainers = async () => {
    const containers = await getAllIdFromDockerContainers();

    for (const container of containers) {
        await execa('docker', ['rm', container]);
    }
};
// remove all images
const removeAllImages = async () => {
    const images = await getAllIdFromDockerImages();

    for (const image of images) {
        await execa('docker', ['rmi', image]);
    }
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
};
