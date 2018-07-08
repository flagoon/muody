const clear = require('clear');
const chalk = require('chalk');
const execa = require('execa');
const figlet = require('figlet');

exports.showLogo = function() {
    clear();
    console.warn(
        chalk.yellow(figlet.textSync('Muody', { horizontalLayout: 'full' }))
    );
};
