function handleBranch(branch) {
    return branch ? (branch !== true ? branch : 'master') : 'master';
}

module.exports = {
    handleBranch,
};
