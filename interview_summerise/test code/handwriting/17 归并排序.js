function mergeSort(arr) {
  if(arr.length < 2) return arr
  let index = Math.floor(arr.length / 2)

  return merge(mergeSort(arr.slice(0, index)), mergeSort(arr.slice(index)))
}


function merge(left, right) {
  let res = []
  let i = 0;
  let j = 0;
  while(i < left.length && j < right.length) {
    if(left[i] < right[j]) {
      res.push(left[i])
      i++
    } else {
      res.push(right[j])
      j++
    }
  }

  if(i < left.length) {
    res = res.concat(...left.slice(i))
  }
  if(j < right.length) {
    res = res.concat(...right.slice(j))
  }

  return res
}

console.log(mergeSort([2,5,3,4,1,49]))