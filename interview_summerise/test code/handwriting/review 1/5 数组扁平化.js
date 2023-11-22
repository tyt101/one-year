const arr = [1, 1, 2, 3, [1, 1, [2, 3,[4]]]]

function flat(arr) {
  return arr.flat(3)
}

console.log('flat:',flat(arr))


function flat1(arr) {
  // return arr.reduce((pre, cur) => {
  //   pre = pre.concat(Array.isArray(cur) ? [...flat1(cur)] : cur)
  //   return pre
  // }, [])
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

console.log('flat2',flat2(arr))