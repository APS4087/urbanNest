const path = require("path");

const { cleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");

const config = require("./webpack.config.js");

module.exports = merge(config, {
  mode: "production",
  output: {
    path: path.join(__dirname, "public"),
  },
  plugins: [new cleanWebpackPlugin()],
});
