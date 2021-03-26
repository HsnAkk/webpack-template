const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // Where webpack looks to start building the bundle
    entry: {
        index: path.resolve(__dirname, '../src/index.js')
    },

    // Where webpack outputs the assets and bundles
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    
    // Customize the webpack build process
    plugins: [
        // Generates an HTML file
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            favicon: path.resolve(__dirname, '../src/images/favicon.png'),
            template: path.resolve(__dirname, '../src/template.html'),           // template html file
            filename: 'index.html',                                             // output file
        }),

        // Removes/cleans build folders and unused assets when rebuilding
        new CleanWebpackPlugin(),

        // Only update what has changed on hot reload
        new webpack.HotModuleReplacementPlugin(),

        // Copies files from target to destination folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    to: 'assets',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
    ],
    
    // Determine how modules within the project are treated
    module: {
        rules: [
            // JavaScript: Use Babel to transpile JavaScript files
            { test: /\.js$/, use: ['babel-loader'] },

            // Images: Copy image files to build folder
            { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

            // Fonts and SVGs: Inline files
            { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },

            // Styles: Inject CSS into the head with source maps
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1, modules: true }},
                    {loader: 'sass-loader', options: {sourceMap: true}},
                ],
            },
        ],
    },
    
    // Set the mode to development or production
    mode: 'development',
    
    // Spin up a server for quick development
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, '../dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },

    // Control how source maps are generated
    devtool: 'inline-source-map',

}