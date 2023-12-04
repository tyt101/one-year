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

  function fn(...args1) {
    return self.apply(this instanceof fn ? this : self, args1.concat(...args))
  }

  function terminalFn() {}

  terminalFn.prototype = this.prototype

  fn.prototype = new terminalFn()
  return fn
}

const fn1 = fn.MyBind(null, 1, 2)
console.log('new fn() instanceof fn1:', new fn() instanceof fn1)
console.log('new fn() instanceof fn1:', new fn1() instanceof fn)

