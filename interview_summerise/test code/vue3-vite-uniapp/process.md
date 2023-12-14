## 安装uniapp + vue3 + ts 项目
- npx degit dcloudio/uni-preset-vue#vite-ts vue3-vite-uniapp

- yarn i

- yarn dev:h5

## 卸载不需要的包

## 安装sass预处理器
yarn add -D sass
## 配置eslint + prettier 自动格式化代码
yarn add eslint --dev
yarn add prettier --dev
yarn add eslint-plugin-prettier --dev
yarn add eslint-plugin-vue --dev
yarn add @typescript-eslint/eslint-plugin --dev
yarn add @typescript-eslint/parser --dev
yarn add @vue/eslint-config-prettier --dev
yarn add @vue/eslint-config-typescript --dev
## 配置.eslintrc.js文件 和 .prettierrc.js文件 和 .vscode/settings.json文件
https://eslint.vuejs.org/rules/max-attributes-per-line

- eslinttrc.js 记两个规则
-- 不强制使用全等 eqeqe: 0
-- 行尾不使用分号 semi: ['error', 'never']
-- 处理组件名不是 mutil-word问题
-- 处理json文件，报错Unexpected token:问题
- .prettierrc.js 记两个
-- tabWidth：2  一个tab几个空格
-- printWidth: 80 一行字符数，超出自动换行
-- singleQuote；true  字符串是否用单引号
-- semi: false 行末是否使用分号
-- trailingComma: "none" 行末是否使用逗号
-- prettierr，eslintrc的配置不生效问题，要先在vscode中安装插件
## 配置package包检测器
- "lint": "eslint --ext .ts,tsx,vue src/** --no-error-on-unmatched-pattern --quiet",
- "lint:fix": "eslint --ext .ts,tsx,vue src/** --no-error-on-unmatched-pattern --fix"

## 配置husky 和 commitlint 进行git代码提交的检查

- 安装husky 以及commitlint相关的插件，然后添加prepare脚本，在yarn install 的时候会自动去执行它然后生成.husky文件，并且通过husky add 去添加pre-commit 和 commit-msg, 在pre-commit里面去执行script里配置的lint-fix就会针对我们的eslint去对代码格式进行检查，commit-msg里配置commitlint就会根据我们自定义的.commitlint.config去进行commit检查。

## 后序
基本项目搭建完成就去引入相应的组件库, 引入状态管理工具pinia等，封装uni.request请求。