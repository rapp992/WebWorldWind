var path = require('path')
var webpack = require('webpack')

module.exports = {
    mode: "development",
    entry: "./src/WorldWind.js",
    devtool: "source-map",
    output: {
        path: path.join(__dirname, './build'),
        filename: 'worldwind.min.js',
    },
    plugins: [
        new webpack.IgnorePlugin(/vertx/),
    ],
    module: {
        rules: [
            { // Rule to babel transpile js to IE compatible js
                test: /\.js$/,
                include: [path.join(__dirname, "src")],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            plugins: ["@babel/plugin-proposal-export-default-from"],
                        } //babel-loader options
                    }
                ]
            },
        ]
    }
}
