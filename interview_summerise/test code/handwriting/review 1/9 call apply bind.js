// xxx.call(this, ...args)

Function.prototype.MyCall = function(content, ...args) {
  if(typeof this !== 'function') {
    throw Error('not function')
  }
  if(!content || content == null) content = window
  content.fn = this
  const res = content.fn(...args)
  delete content.fn
  return res
}

Function.prototype.MyCall1 = function() {

  if(typeof this !== 'function'){
    throw Error('not function')
  }

  let content = Array.prototype.shift.call(arguments)

  if(!content || content == null) content = window

  content.fn = this

  const res = content.fn(...arguments)

  delete content.fn

  return res
}

const obj = {
  a: 1,
  b: 2
}

function fn(m,n) {
  console.log(this.a, this.b, m, n)
}
fn.MyCall1(obj,'m')
fn.MyCall(obj)

// xxx.apply(this, ...args)

Function.prototype.MyApply = function(content, args) {

  if(typeof this !== 'function') {
    throw Error('not function')
  }

  if(!content || content == null) content = window
  content.fn = this

  const res = content.fn(...args)
  delete content.fn
  return res
}

Function.prototype.MyApply1 = function() {
  if(typeof this !== 'function') {
    throw Error('not function')
  }

  const content = Array.prototype.shift.call(arguments)

  if(!content || content == null) content = window

  content.fn = this

  const res = content.fn(...arguments[0])

  delete content.fn
  return res
}

fn.MyApply1(obj, [119,22])
fn.MyApply(obj, [119,22])


Function.prototype.MyBind = function(content, ...args) {
  if(typeof this !== 'function') {
    throw Error('not function')
  }
  if(content == null || !content) content = window

  const self = this
  console.log("===========SELFL", self)
  function fnn(...args1) {
    console.log("=============:", this)
    console.log("111",this instanceof fn, "===")
    console.log("111222",this instanceof fnn, "===")
    return self.apply(this instanceof fnn ? this : self, args1.concat(...args))
  }

  function terminalFn() {}

  terminalFn.prototype = this.prototype

  fnn.prototype = new terminalFn()
  return fnn
}

const fn1 = fn.MyBind(null, 1, 2)
// 作为普通函数调用，fn中this指向windows
console.log('fn():', fn1())
// 作为构造函数调用，fn中this指向fn
console.log('new fn1() instanceof fn:', new fn1() instanceof fn)

