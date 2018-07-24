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
    .command('libs', 'Remove node_modules and install them again.')
    .alias('b', 'branch')
    .describe('b', 'choose a branch to checkout and work on.')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright flagoon 2018').argv;
