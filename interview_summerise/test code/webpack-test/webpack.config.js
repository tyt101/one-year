const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// css-minimizer-webpack-plugin 需要和 html-webpack-plugin 混用，才能将样式link到html中
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESlintPlugin = require('eslint-webpack-plugin')
module.exports = {
  target: 'web',
  entry: {
    main: path.resolve(__dirname, './index.js'),
    pro: path.resolve(__dirname, './show.js')
  },
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, './dist')
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
              publicPath: '/public/path/to'
            }
          },
          {
            loader: 'css-loader',
            options: {
              esModule: true,
              modules: {
                namedExport: true,
                localIdentName: '[local]'
              }
            }
          },
          'postcss-loader'
          // {
          // loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       // 添加 autoprefixer 插件
          //       plugins: [require('autoprefixer')]
          //     }
          //   }
          // }
        ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '/public/path/to'
          }
        }, 'css-loader', 'less-loader']
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html', scriptLoading: 'blocking' }),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new ESlintPlugin()
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
  // dev-server模块， 决定浏览器是执行刷新操作 还是热更新操作
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    open: true,
    port: 9000
  },
  // watch: true,
  mode: 'development'
}
