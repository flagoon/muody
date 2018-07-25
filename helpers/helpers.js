const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');

const validCommands = ['docker', 'libs', 'cdocker'];

exports.showLogo = function() {
    clear();
    console.warn(
        chalk.yellow(figlet.textSync('Muody', { horizontalLayout: 'full' }))
    );
};

exports.checkArguments = arguments => {
    const { module } = arguments;

    // check if user put invalid arguments
    if (!module['_'].every(argv => validCommands.includes(argv))) {
        throw new Error(
            `You used commands that I don't know about. Try muody -h for correct list!`
        );
    }

    // check number of arguments
    switch (module['_'].length) {
        case 0:
            throw new Error(`You are missing some arguments.`);
        case 1:
            break;
        default:
            throw new Error(
                `As for now "muody-cli" doesn't support multiple arguments.`
            );
    }

    return module['_'][0];
};
