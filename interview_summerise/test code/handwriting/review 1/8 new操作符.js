function operateNew(fn, ...args) {
  let obj = {}
  obj.__proto__ = fn.prototype
  const res = fn.apply(obj, args)
  return typeof res == 'object' || typeof res == 'function' ? res : obj
}