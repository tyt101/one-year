// 将一个多参数函数转换成一系列使用一个参数的函数


function curry(fn, ...args) {
  return function(arg) {
    return fn.apply(this, arg.concat(...args))
  }
}

function complexCurry(fn, ...args) {
  let len = fn.length

  return function(...arg) {
    let totalArg = [...arg, ...args]

    if(totalArg.length >= len) {
      return fn.apply(this, totalArg)
    }
    return complexCurry.call(this, fn, ...totalArg)
  }
}