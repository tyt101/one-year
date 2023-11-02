const noFlatArr = [1,[2,3,[4,5,[6,7,8]],1],333]
console.log('curNoFlatArr:', noFlatArr)

// 原生方法
function flat(arr) {
  console.log(arr.flat(3))
}
flat(noFlatArr)

// 递归
function flat1(arr) {
  return arr.reduce((pre, cur) => {
    return Array.isArray(cur) ? [...pre, ...flat1(cur)] : [...pre, cur]
  },[])
}
console.log(flat1(noFlatArr))


// 迭代循环
function flat2(arr) {
  if(!arr.length) return;
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

console.log(flat2(noFlatArr))