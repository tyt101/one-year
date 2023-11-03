function insertSort(arr) {
  let len = arr.length
  for(let i = 1; i < len; i++) {
    let j = i
    let target = arr[j]
    while(arr[j-1] > target && j >=0) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = target
  }
  return arr
}

console.log(insertSort([1,39,32,12,34,33,21,15]))