const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
  target: 'web',
  entry: {
    main: path.resolve(__dirname,'./index.js'),
    pro: path.resolve(__dirname,'./show.js')
  },
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 将css抽离出来
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/public/path/to',
            },
          },
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: true,
                localIdentName: "[local]",
              },
            },
          },

          // css不抽离
          // 'style-loader', 'css-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html", scriptLoading: "blocking" }),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
  ],
  optimization: {
    // 生产环境下
    minimizer: [
      new CssMinimizerPlugin()
    ],
    // 开发环境下
    minimize: true
  },
  // webpack5 的形式
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: true,
    port: 9000,
  },
  mode: 'development',
};