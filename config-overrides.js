const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url"),
        "path": require.resolve("path-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "constants": require.resolve("constants-browserify"),
        "fs": false,
        "tls": require.resolve("tls"),
        "net": require.resolve("net"),
        "nock": require.resolve("nock"),
        "timers": require.resolve("timers-browserify"),
        "child_process": false,
        "dns": false,
        "mock-aws-s3": false, 
        "aws-sdk": false,
    })
    config.resolve.fallback = fallback;
    // try to override rules in webpack (seems like working)
    config.module.rules = [
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(jsx|js)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  "targets": "defaults" 
                }],
                '@babel/preset-react'
              ]
            }
          }]
        }
      ];
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ]);
    config.entry = path.resolve(__dirname, 'public', 'main.js');
    config.output = {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    };
    // config.target = "node";
    // config.externals = [nodeExternals({modulesFromFile: true})];
    config.externals = {
    // git"@babel/compat-data": "7.19.4",
    // "@babel/core": "^7.20.12",
    // "@babel/generator": "7.19.6",
    // "@babel/helper-compilation-targets": "7.19.3",
    // "@babel/helper-create-class-features-plugin": "7.19.0",
    // "@babel/helper-module-transforms": "7.19.6",
    // "@babel/preset-env": "^7.20.2",
    // "@babel/preset-react": "^7.18.6",
    // "@electron/remote": "^2.0.9",
    // "@testing-library/jest-dom": "^5.16.5",
    // "@testing-library/react": "^13.4.0",
    // "@testing-library/user-event": "^13.5.0",
    // "babel-loader": "^9.1.2",
    // "bluebird": "^3.7.2",
    // "bootstrap": "^5.2.3",
    // "concurrently": "^7.6.0",
    // "cross-env": "^7.0.3",
    // "docx": "^7.8.2",
    // "electron": "^22.0.0",
    // "file-saver": "^2.0.5",
    // "react": "^18.2.0",
    // "react-app-rewired": "^2.2.1",
    // "react-dom": "^18.2.0",
    // "react-scripts": "5.0.1",
    // "sqlite3": "^5.1.4",
    // "wait-on": "^7.0.1",
    // "web-vitals": "^2.1.4",
    // "webpack-node-externals": "^3.0.0",
    react: 'react'
    }
    config.ignoreWarnings = [/Failed to parse source map/];
    return config;
}