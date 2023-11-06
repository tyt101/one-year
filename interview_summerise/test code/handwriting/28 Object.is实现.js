console.log(Object.is(NaN, NaN))
console.log(Object.is(+0, -0))
let obj = {}
let obj1 = {}
console.log(Object.is(obj, obj1))
console.log(Object.is(1, 1))
console.log(Object.is(0, false))


// Number.isNaN(val) : if and only if the argument is of type Number and the value equals NaN (判断val是否是number类型，且值为NaN)
// isNaN(val) : first convert argument to a number, return true if the resulting value is NaN (将val强转为number, 强转失败true)
Object.prototype.MyIs = function(eleA, eleB) {

  if(eleA === eleB) {
    return eleA !== 0 || 1/eleA === 1/eleB
  }

  return eleA !== eleA && eleB !== eleB
}

console.log("==================================================================================================================")
console.log(Object.MyIs(NaN, NaN))
console.log(Object.MyIs(+0, -0))
console.log(Object.MyIs(obj, obj1))
console.log(Object.MyIs(1, 1))
console.log(Object.MyIs(0, false))