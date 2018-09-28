const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugin = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin({
        template: path.join(__dirname, 'temp.html')
    }),
    new VueClientPlugin()
]

const devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
        errors: true
    },
    historyApiFallback: {
        index: '/index.html'
    },
    hot: true
}

let config

if (isDev) {
   config = merge(baseConfig, {
       devtool: '#cheap-module-eval-source-map',
       module: {
           rules: [
               {
                   test: /\.styl/,
                   use: [
                       'style-loader',
                       'css-loader',
                       {
                           loader: 'postcss-loader',
                           options: {
                               sourceMap: true,
                           }
                       },
                       'stylus-loader'
                   ]
               }
           ]
       },
       devServer,
       plugins: defaultPlugin.concat([
           new webpack.HotModuleReplacementPlugin(),
           new webpack.NoEmitOnErrorsPlugin()
       ])
   })
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../src/client-entry.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js',
            publicPath: '/dist/' // 在production的情况下, 就不能在用base的publicPath了, 资源都在本地,需要处理本地的资源
        },
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: ExtractPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        plugins: defaultPlugin.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ])
    })
}


module.exports = config
