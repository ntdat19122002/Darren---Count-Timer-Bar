// webpack.config.dev.js
'use strict'

const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')
const webpack = require('webpack')

module.exports = (env) => {
  console.log('Environment: ', env.NODE_ENV)
  const mode = env.NODE_ENV

  return {
    mode,
    entry: ['./shopify/Banner/app.js'],
    output: {
      path: path.resolve(__dirname, './public/js'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-vue-jsx']
            }
          }
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
      })
    ]
  }
}
