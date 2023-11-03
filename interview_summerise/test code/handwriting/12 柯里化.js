// 将一个多参数函数转换成一系列使用一个参数的函数


// simple Fn
function curry(fn, ...args) {
  return function(...arg) {
    return fn.apply(this, args.concat(...arg))
  }
}

function add(a, b, c) {
  return a + b + c
}

let fn = curry(add, 1)
console.log(fn(2,3))      // 6




// complex Fn

function curryComplex(fn, ...args) {
  let length = fn.length
  return function(...arg) {
    let totalArg = [...arg, ...args]
    let len = totalArg.length
    if(len < length) {
      return curryComplex.call(this ,fn, ...totalArg)
    } else {
      return fn.apply(this, totalArg)
    }
  }
}

let fn1 = curryComplex(add, 1)
console.log(fn1(2)(4))
console.log(fn1(2, 4))
console.log(fn1(2, 4, 9))