let path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

let conf = {
    entry: './static/index.js',

    output: {
        path: path.join(__dirname, './dist'),
        //filename: '[name].[hash].js',
        filename: '[name].js',
        publicPath: '',
    },

    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        port: 8181
    },

    stats: {
        errors: true,
        errorDetails: true,
        builtAt: true,
        assets: false,
        modules: false,
        children: false,
    },
    optimization: {
        minimize: false,
        /*minimizer: [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { 
                        discardComments: { 
                            removeAll: true 
                        } 
                    }],
                },
            }),
        ],*/
    },
    module: {
        rules: [
            
            //js
            {
                test: /\.(js|jsx)$/,
                exclude: '/node_modules/',
                loader: 'babel-loader',
            },
            //sass
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'},
                    {loader: 'sass-loader'},
                ],
            },
            //image
            {
				test: /\.(png|jpg|jpeg|svg|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
                            name: './img/[name].[ext]'
						}
					}
				]
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new HtmlWebPackPlugin({
            template: './templates/index.html',
            filename: './index.html',
            inject: false,
        }),
        new MiniCssExtractPlugin({
            //filename: "[name].[hash].css",
            filename: "[name].css",
        }),
        /*new ReplaceHashInFileWebpackPlugin([{
            dir: './appsowa/templates',
            files: [
                'index.html',
                'pages/myworks.html'
            ],
            rules: [
                {
                    search: /main.[a-zA-Z0-9]*\.js/,
                    replace: 'main.[hash].js'
                },
                {
                    search: /main.[a-zA-Z0-9]*\.css/,
                    replace: 'main.[hash].css'
                },
                {
                    search: /critical.[a-zA-Z0-9]*\.css/,
                    replace: 'critical.[hash].css'
                }
            ]
        }]),*/
    ]
};

module.exports = (env, options) => {
    let production = options.mode === 'production';

    conf.devtool = production 
                    ? false
                    : false;
    return conf;
}