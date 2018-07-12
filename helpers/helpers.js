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
    console.log(arguments);
const itContainsCommand = (userCommands, validCommnads) => {
    let valueHit = 0;
    validCommands.forEach(command => {
        if (userCommands.includes(command)) {
            valueHit += 1;
        }
    });
    return valueHit;
};
