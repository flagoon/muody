const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');

const validCommands = ['d', 'i', 'b', 'x'];

exports.showLogo = function() {
    clear();
    console.warn(
        chalk.yellow(figlet.textSync('Muody', { horizontalLayout: 'full' }))
    );
};

exports.checkArguments = arguments => {
    const { module } = arguments;
    const commands = [];

    // check if user put invalid arguments

    // module['_'] constains commands, then it's module['d'], module['b']
    if (module['_'].length) {
        throw new Error(
            `You used commands that I don't know about. Try muody -h for correct list!`
        );
    }

    const commandArray = Array.from(Object.keys(module));

    commandArray.forEach(command => {
        if (validCommands.indexOf(command) > -1) {
            commands.push(command);
        }
    });

    if (commands.length === 0) {
        throw new Error(
            `You are missing valid arguments, try muody -h for more info.`
        );
    }
};
