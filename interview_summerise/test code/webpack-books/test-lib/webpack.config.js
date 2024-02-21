const path = require("path");
const nodeExternals = require("webpack-node-externals")
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
    library: {
      name: "_",
      type: "umd"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  // npx webpack 编译过程会跳过externals所声明的库
  // externals: {
  //   lodash: {
  //     commonjs: "lodash",
  //     commonjs2: "lodash",
  //     amd: "lodash",
  //     root: "_",
  //   }
  // }
  externals: [new nodeExternals()],
  devtool: 'source-map'
};
