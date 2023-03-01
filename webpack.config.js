// const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


const production = process.env.NODE_ENV === 'production';


module.exports = {
    entry: {myAppName: path.resolve(__dirname, "./src/index.js")},
    output: {
        filename: "main-[hash:8].js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".js", ".jsx", ".scss"],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            title: "Webpack & React",
            favicon: "./public/favicon.ico"
        }),

        new CleanWebpackPlugin(),
        // new webpack.HotModuleReplacementPlugin(),

    ],

    module: {
        rules: [

            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },

            {
                test: /\.(scss|css)$/,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]--[hash:base64:5]',
                                exportLocalsConvention: 'camelCase'
                            }
                        },
                    },

                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [__dirname, 'src'],
                                webpackImporter: false
                            },

                        },
                    },
                ],
            },

            {
                test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images'
                },
            },

            {
                test: /\.(woff(2)|ttf|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts'
                },
            }


        ],
    },

    devServer: {
        port: 3001,
        hot: true,
        open: true,
        historyApiFallback: true
    },
    mode: production ? 'production' : 'development'
};