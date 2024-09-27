const webpack = require("webpack");
const copyWebpackPlugin = require("copy-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

const dirApp = path.join(__dirname, "app");
const dirAssets = path.join(__dirname, "assets");
const dirStyles = path.join(__dirname, "styles");
const dirNode = path.join(__dirname, "node_modules");

module.exports = {
  entry: [path.join(dirApp, "index.js"), path.join(dirStyles, "index.scss")],
  resolve: {
    modules: [dirApp, dirAssets, dirStyles, dirNode],
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEVELOPMENT,
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
    }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: "./assets",
          to: "",
        },
      ],
    }),
    new miniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
