#!/usr/bin/env node
const chalk = require('chalk');
const helper = require('./helpers/helpers');

helper.showLogo();
helper
    .gitPull('master')
    .then(res => console.warn(res.stdout))
    .catch(err => console.log(chalk.white.bgRed(err.stderr)));
