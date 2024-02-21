require('./index.css')
require('./show1.js')
require('./aaa')
// 通过 CommonJS 规范导入 show 函数
const { show, bianliang } = require('./show.js')
// 执行 show 函数
show('Webpack')
console.log(bianliang.aaa)
bianliang.aaa = 100
console.log(bianliang.aaa)
console.log('=====binss', bianliang)

const arr = [1, 2, 3, 4]
arr.map((item) => {
  console.log('==========', item)
  return null
})
