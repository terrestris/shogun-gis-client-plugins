const path = require('path');

const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules\/(?!@terrestris)/,
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.d\.ts$/,
      loader: 'ignore-loader'
    }, {
      test: /\.less|\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }]
    }, {
      test: /\.(jpe?g|png|gif|ico|pdf|eot|svg|ttf|woff(2)?)$/,
      type: 'asset/resource'
    }]
  },
  resolve: {
    alias: {
      fs: false,
      path: false
    },
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  plugins: [
    new webpack.DefinePlugin({
      DEV_MODE: JSON.stringify(process.env.WEBPACK_SERVE === 'true' || process.env.WEBPACK_WATCH === 'true')
    }),
    new ModuleFederationPlugin({
      name: 'ExamplePlugin',
      filename: 'index.js',
      exposes: {
        './FooterLinks': './src/FooterLinks/plugin'
      },
      shared: {
        react: {
          requiredVersion: '^17',
          singleton: true
        },
        'react-dom': {
          requiredVersion: '^17',
          singleton: true
        },
        'react-redux': {
          requiredVersion: '^8',
          singleton: true
        },
        '@terrestris/react-geo/': {
          requiredVersion: '^23',
          singleton: true
        },
        'react-i18next': {
          requiredVersion: '^14',
          singleton: true
        },
        'ol/': {
          requiredVersion: '^7',
          singleton: true
        }
      }
    })
  ]
};
