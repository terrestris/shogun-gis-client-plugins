const path = require('path');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules\/(?!(@terrestris\/d3-util)\/).*|\.d\.ts$/,
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
    new ModuleFederationPlugin({
      name: 'SHOGunPlugins',
      filename: 'index.js',
      exposes: {
        './CookieConsentPopup': './src/CookieConsentPopup/plugin'
      },
      shared: {
        ...require('./package.json').dependencies,
        'react': {
          requiredVersion: '^17'
        },
        'react-dom': {
          requiredVersion: '^17'
        },
        'react-redux': {
          requiredVersion: '^8'
        },
        'react-i18next': {
          requiredVersion: '^12'
        },
        'ol': {
          requiredVersion: '^6'
        }
      }
    })
  ]
};
