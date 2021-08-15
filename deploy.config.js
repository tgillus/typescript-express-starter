const stages = {
  development: {
    defaultBranch: 'main',
  },
};

module.exports = {
  stageName: function () {
    return process.env.STAGE || 'development';
  },
  branch: function () {
    return process.env.BRANCH || stages[this.stageName()].defaultBranch;
  },
};
