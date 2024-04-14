const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const Dotenv = require("dotenv-webpack")

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/js/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|ico)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "NewsInformationApp",
      filename: "index.html",
      template: "src/template.html",
    }),
    new Dotenv(),
  ],
}
