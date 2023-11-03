function binarySearch(arr, target) {
  let l = 0
  let r = arr.length - 1
  while(l <= r) {
    let mid = Math.floor((r + l) / 2)
    if(arr[mid] > target) {
      r = mid - 1
    } else if(arr[mid] < target){
      l = mid + 1
    }else {
      return mid
    }
  }
  return -1
}

console.log(binarySearch([1,2,3,4,5,6,7,8], 9))
console.log(binarySearch([1,2,3,4,5,6,7,8], 6))