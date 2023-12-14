module.exports = {
  root: true, // 标识当前配置文件为eslint的根配置文件，让其停止在父级目录中继续寻找。
  // 运行环境
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // 规则继承
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    'prettier',
    'plugin:vue/recommended',
    'plugin:jsonc/recommended-with-jsonc',
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: [],
  // 具体规则
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars':
      'off',
    semi: ['error', 'never'], // 行尾不使用分号
    eqeqe: 0, // 不需要强制使用全等
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index'], //需要忽略的组件名
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 2,
        },
        multiline: {
          max: 2,
        },
      },
    ],
  },
}
