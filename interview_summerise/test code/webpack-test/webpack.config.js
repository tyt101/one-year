const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
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
                localIdentName: "foo__[name]__[local]",
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
  mode: 'development',
};