const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    // Where webpack looks to start building the bundle
    entry: {
        index: path.resolve(__dirname, '../src/index.js')
    },

    // Where webpack outputs the assets and bundles
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: './',
        filename: 'js/[name].[contenthash].bundle.js',
      
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

        // Extracts CSS into separate files
        // Note: style-loader is for development, MiniCssExtractPlugin is for production
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',
            chunkFilename: '[id].css',
        }),
        
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

            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: false,
                            modules: true,
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    
    // Set the mode to development or production
    mode: 'production',
    
    // Control how source maps are generated
    devtool: false,

    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), "..."],
        // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
        // instead of having their own. This also helps with long-term caching, since the chunks will only
        // change when actual code changes, not the webpack runtime.
        runtimeChunk: {
            name: 'runtime',
        },
    },
    
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      },

}