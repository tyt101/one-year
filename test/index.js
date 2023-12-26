function fxy(arr, target) {
  let i = 1
  let cur = 0
  while(arr.length > 1) {
    if(i == target) {
      console.log(arr[cur])
      arr.splice(cur, 1)
      i = 0
      if(arr.length-1 == cur) {
        cur = -1
      } else {
        cur-=2
      }
    }
    if(arr.length-1 == cur) {
      cur = -1
    }
    i++
    cur++
  }
  return arr[0]
}

console.log(fxy([1,2,3,4,5], 3))
console.log(fxy([1,2,3,4,5,6], 3))

// 3 1  5 2
//3 6 4 2 5