// 题目描述:实现一个 add 方法 使计算结果能够满足如下预期：

// add(1)(2)(3)()=6
// add(1,2,3)(4)()=10

// 将参数进行闭包累计
function add(...args) {
  let allArgs = [...args]
  const fn = (...arg) => {
    if(arg.length == 0)  {
      let sum = 0
      for(let i = 0; i < allArgs.length; i++) {
        sum += allArgs[i]
      }
      return sum
    }
    allArgs = [...allArgs, ...arg]
    return fn
  }
  return fn
}
console.log(add(1, 2)())
console.log(add(1)(2)())
console.log(add(1)(2)(4,5)())

// 将sum进行闭包累计
function add1(...args) {
  let sum = 0
  for(let i = 0; i < args.length; i++) {
    sum += args[i]
  }
  return function fn(...arg) {
    if(arg.length == 0) return sum
    else {
      for(let i = 0; i < arg.length; i++) {
        sum += arg[i]
      }
      return fn
    }
  }
}
console.log(add1(1, 2)())
console.log(add1(1)(2)())
console.log(add1(1)(2)(4,5)())