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

const dockerCommands = [
    {
        title: 'Stop the containers.',
        task: (ctx, task) =>
            stopAllContainers().catch(() => {
                // we trying to remove containers, when there are no containers, error is thrown.
                ctx.containersAvailable = false; // we assing 'false' to ctx object, to use it in other tests.
                task.skip('There are no containers to stop!'); // we skipping this task, with reason.
            }),
    },
    {
        title: 'Remove all containers.',
        enabled: ctx => ctx.containersAvailable !== false, // ctx.containersAvaiable is set in previous task. If it's false, then this task won't be available.
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
