const execa = require('execa');

const gitCheckBranchName = (branch = null) =>
    execa('git', ['rev-parse', '--abbrev-ref', 'HEAD']).then(res => {
        if (res.stdout === branch) {
            return true;
        }
        return false;
    });

const gitCheckUncommited = () =>
    execa('git', ['status', '--porcelain']).then(res => {
        if (res.stdout) {
            return true;
        }
        return false;
    });

module.exports = {
    gitCheckBranchName,
    gitCheckUncommited,
};
