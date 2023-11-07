// 合并a.js 和 b.js 文件， 和webpack打包成bundle.js功能类似

(function(modules){
  let cache = {}
  function require(moduleID) {
    if(cache[moduleID]) {return cache[moduleID]}
    let func = modules[moduleID]
    let module = {
      exports: {}
    }
    func(module, module.exports, require)
    let result = module.exports
    cache[moduleID] = result
    return result
  }
  require('./src/b.js')
})({
  './src/a.js': function(module, exports) {
    console.log("aaa")
    module.exports = "a"
  },
  './src/b.js': function(module, exports, require) {
    console.log('bbb')
    var a = require('./src/a.js')
    console.log(a)
  }
})