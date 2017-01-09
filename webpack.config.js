const config = {
    entry: './src/App.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    devtool: "#source-map",
    watch: true
};

module.exports = config;
