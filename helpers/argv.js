exports.module = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command(
        'start',
        'Makes sure that application is updated, built and run correctly.'
    )
    .command(
        'docker',
        'Stop all running containers, remove them and remove images.'
    )
    .alias('b', 'build')
    .describe('b', 'build an app.')
    .alias('i', 'install')
    .describe('i', 'remove avid libs in node_modules and install them again.')
    .alias('d', 'docker')
    .describe('d', 'start dockers.')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright flagoon 2018').argv;
