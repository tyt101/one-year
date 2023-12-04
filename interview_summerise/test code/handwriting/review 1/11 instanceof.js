function MyInstanceOF(A, B) {
  let proto = B.prototype
  while(A.__proto__) {
    if(A.__proto__ == proto) return true

    A = A.__proto__
  }
  return false
}
console.log(MyInstanceOF([], Object))

// Array.__proto__ == Object.__proto__ == Function.__proto__ == Function.prototype
// typeof Function.prototype == 'function
// typeof Object.prototype == 'object'
console.log(MyInstanceOF(Array, Object))
console.log(MyInstanceOF([], Array))
console.log(Array instanceof Object)
console.log([] instanceof Object)
console.log([] instanceof Array)