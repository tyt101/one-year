function searchBinary(arr, target) {
  let len = arr.length
  let l = 0
  let r = len - 1

  while(l <= r) {
    let mid = l + Math.floor((r - l) / 2)

    if(arr[mid] == target) return mid
    else if (arr[mid] > target) r = mid - 1
    else l = mid + 1
  }
  return -1
}

console.log(searchBinary([1,2,3,4,5,6,7,8,9],9))


function searchBinaryBiggerThanTarget(arr, target) {
  let len = arr.length
  let l = 0
  let r = len

  while(l <= r) {
    let mid = l + Math.floor((r - l) / 2)

    if(arr[mid] == target) return mid + 1
    else if (arr[mid] > target) r = mid - 1
    else l = mid + 1
  }
  return l
}

console.log(searchBinaryBiggerThanTarget([1,2,3,5,6,7,8,9],4))