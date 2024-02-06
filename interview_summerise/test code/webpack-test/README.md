## webpack-dev-server 原理
- DevServer启动一个HTTP服务器用于服务网页请求
- 帮助启动Webpack，并接受Webpack发出的文件更变信号
- 通过webSocket协议自动刷新网页做到实时预览


##  Webpack 内置了 stats 接口，专门用于统计模块构建耗时、模块依赖关系等信息，如何获取stats.json文件？
- webpack中配置 profile: true
- 输入命令npx webpack --json=stats.json


## 打包信息可视化图

#### Statoscope
```javascript
yarn add -D @statoscope/webpack-plugin
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;

module.exports = {
  ...
  plugins: [new StatoscopeWebpackPlugin()],
};
```

#### Webpack Bundle Analyzer
```javascript
yarn add -D webpack-bundle-analyzer

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  ...
  plugins: [new BundleAnalyzerPlugin()],
};

```

#### Webpack Visualizer
```javascript
yarn add —D webpack-visualizer-plugin

// webpack.config.js
const VisualizerPlugin = require('webpack-visualizer-plugin');

module.exports = {
  // ...
  plugins: [
    new Visualizer({
      filename: './stats.html'
    })
  ],
}

```
