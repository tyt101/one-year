const arr = [1, 1, 2, 3, [1, 1, [2, 3,[4]]]]

function flat(arr) {
  return arr.flat(3)
}

console.log('flat:',flat(arr))


function flat1(arr) {
  return arr.reduce((pre, cur) => {
    return Array.isArray(cur) ? [...pre, ...flat1(cur)] : [...pre, cur]
  }, [])
}
console.log('flat1',flat1(arr))


function flat2(arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
function flat2Deep(arr, deep) {
  let i = 0
  while(arr.some(item => Array.isArray(item)) && i < deep) {
    console.log(i, deep)
    arr = [].concat(...arr)
    i++
  }
  return arr
}
console.log('flat2',flat2(arr))
console.log('flat2Deep',flat2Deep(arr,2))