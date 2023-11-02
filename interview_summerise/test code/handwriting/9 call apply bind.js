
// thisArg
// The value to use as this when calling func. If the function is not in strict mode, null and undefined will be replaced with the global object, and primitive values will be converted to objects.

// arg1, …, argN Optional
// Arguments for the function.
Function.prototype.myCall = function(context, ...args){

  // If the function is not in strict mode, null and undefined will be replaced with the global object
  if(context == null || !context) context = window


  context.fn = this

  return context.fn(...args)
}


// thisArg
// The value of this provided for the call to func. If the function is not in strict mode, null and undefined will be replaced with the global object, and primitive values will be converted to objects.

// argsArray Optional
// An array-like object, specifying the arguments with which func should be called, or null or undefined if no arguments should be provided to the function.


Function.prototype.myApply = function(context, args) {
  if(context == null || !context) context = window

  context.fn = this

  return context.fn(...args)
}


// thisArg
// The value to be passed as the this parameter to the target function func when the bound function is called. If the function is not in strict mode, null and undefined will be replaced with the global object, and primitive values will be converted to objects. The value is ignored if the bound function is constructed using the new operator.

// arg1, …, argN Optional
// Arguments to prepend to arguments provided to the bound function when invoking func.

Function.prototype.myBind = function(context, ...args) {
  if(context == null || !context) context = window

  let self = this
  function BBind(...args1) {
    // this instanceof BBind 的时候，说明是new BBind的形式
    // 构造函数的this指向自己， 普通函数中的this指向windows
    return self.apply(this instanceof BBind ? this : self, totalArgs)
  }
  function terminalFn() {}
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  // BBind.prototype = this.prototype      //  直接将this.prototype赋值给BBind.prototye, 当我们修改BBind.prototype的时候，就会修改到原来绑定函数this.prototype

  terminalFn.prototype = this.prototype    //  中转的函数   
  BBind.prototype = new terminalFn()

  return BBind
}


// 示例：
// 构造函数
class ll {
  constructor(a, b) {
    this.a = a
    this.b = b
    console.log(this instanceof ll)
  }
}
// 普通函数
function ll1() {
  console.log(this instanceof ll1)
}

let m = new ll(1, 2)      // true

ll1()                     // false