const {show, bianliang} = require('./show.js');
console.log('bianliang:',bianliang)

setTimeout(() => {
  console.log('bianlia121ng:',bianliang)
}, 1000);


/**
 * Common.js 是动态的加载语句，代码发生在运行时 （同步加载）
 * Common.js 导出的是值得浅拷贝， 值可修改，但是容易引起变量污染
 */