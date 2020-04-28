var path = require('path')
var webpack = require('webpack')

module.exports = {
    mode: "development",
    entry: "./src/WorldWind.js",
    devtool: "source-map",
    output: {
        path: path.join(__dirname, './build'),
        filename: 'worldwind.min.js',
        library: 'WorldWind',
        libraryTarget: 'var'
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
            { // Rule to convert images to inline
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            }
        ]
    }
}
