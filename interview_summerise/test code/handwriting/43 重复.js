// 输入: [1,2,3,1]
// 输出: true
// 示例 2:
// 输入: [1,2,3,4]
// 输出: false
// 示例 3:
// 输入: [1,1,1,3,3,4,3,2,4,2]
// 输出: true


function hasRepeat(arr) {
  return arr.toString() != [...new Set(arr)].toString()
}

function hasRepeat1(arr) {
  let cache = new Set()
  for(let i = 0; i < arr.length; i++) {
    if(cache.has(arr[i])) return true
    cache.add(arr[i])
  }
  return false
}

function hasRepeat2(arr) {
  
}

console.log(hasRepeat([1,2,3,1]))
console.log(hasRepeat([1,1,1,3,3,4,3,2,4,2]))
console.log(hasRepeat([1,2,3,4]))


console.log(hasRepeat1([1,2,3,1]))
console.log(hasRepeat1([1,1,1,3,3,4,3,2,4,2]))
console.log(hasRepeat1([1,2,3,4]))