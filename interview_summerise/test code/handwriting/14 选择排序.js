function selectSort(arr) {
  let len = arr.length
  for(let i = 0; i < len - 1; i++) {
    let minIndex = i
    for(let j = i + 1; j < len; j++) {
      if(arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if(minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
  return arr
}
console.log(selectSort([1,39,32,12,34,33,21,15]))