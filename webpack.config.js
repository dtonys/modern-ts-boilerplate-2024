module.exports = (mode) => {
    if (mode.development === true) {
        return require('./webpack.dev.config.js');
    }
    if (mode.production === true) {
        return require('./webpack.production.config.js');
    }
};
