exports.module = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .describe('b', 'npm run build')
    .describe('d', 'stop all dockers, then remove all containers')
    .describe('i', 'install libraries from package.json')
    .describe('x', 'remove all docker containers and images')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright flagoon 2018').argv;
