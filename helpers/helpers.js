const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');

const validCommands = ['start', 'docker', 'libs'];

exports.showLogo = function() {
    clear();
    console.warn(
        chalk.yellow(figlet.textSync('Muody', { horizontalLayout: 'full' }))
    );
};

exports.checkArguments = arguments => {
    const { module } = arguments;
    if (!itContainsCommand(module['_'], validCommands) > 0) {
        throw new Error(
            `It's missing correct commnad. Try muody -h for correct list!`
        );
    }
};

// to consider, what if user use wrong command. Throw? Ignore?
const itContainsCommand = (userCommands, validCommands) => {
    let valueHit = 0;
    validCommands.forEach(command => {
        if (userCommands.includes(command)) {
            valueHit += 1;
        }
    });
    return valueHit;
};
