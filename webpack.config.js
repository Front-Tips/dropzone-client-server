const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * @type {webpack.Configuration}
 */
module.exports = {
  mode: "development",
  entry: "./client/src/js/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "dropzone-demo.min.js",
  },
  resolve: {
    extensions: [".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(j)s$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            pure_funcs: [
              "console.info",
              "console.debug",
              "console.log",
            ],
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: ``,
      raw: true,
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    hot: false,
    liveReload: true,
    compress: true,
    port: 9000,
  },
};
