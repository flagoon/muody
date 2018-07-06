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

exports.gitPull = branch => execa('git', ['pull', 'origin', branch]);

exports.gitCheckout = branch => execa('git', ['checkout', branch]);
