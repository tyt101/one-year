function MyCreate(obj, propertyObject = undefined) {
  function fn() {}
  fn.prototype = obj
  const myObj = new fn()
  if(propertyObject !== undefined) {
    Object.defineProperties(myObj, propertyObject)
  }
  return myObj
}

const obj = {
  a: 1,
  b: 2
}

const cc = Object.create(obj)
console.log(cc.__proto__)

const ccc = MyCreate(obj)
console.log(ccc.__proto__)