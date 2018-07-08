const execa = require('execa');

const gitCheckBranchName = (branch = null) =>
    execa('git', ['rev-parse', '--abbrev-ref', 'HEAD']).then(res => {
        if (res.stdout === 'tvar') {
            return true;
        }
        return false;
    });

const gitCheckUncommited = () =>
    execa('git', ['status', '--porcelain']).then(res => {
        console.log(res);
        if (res.stdout) {
            return false;
        }
        return true;
    });

module.exports = {
    gitCheckBranchName,
    gitCheckUncommited,
};
