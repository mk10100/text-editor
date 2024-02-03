const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      historyApiFallback: true,
      open: true,
    },
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        filename: "index.html",
        chunks: ["main"],
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      new WebpackPwaManifest({
        name: "Text Editor",
        short_name: "Editor",
        description: "Automatically save your notes!",
        background_color: "#ffffff",
        theme_color: "#000000",
        start_url: "/",
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "favicon.ico", to: "images/favicon.ico" }
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },

        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
