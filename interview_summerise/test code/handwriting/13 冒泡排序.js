function bubbleSOrt(arr) {
  let len = arr.length
  for(let i = 0; i < len; i++) {
    for(let j = 0; j < len - 1 - i; j++) {
      if(arr[j+1] < arr[j]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr
}


console.log(bubbleSOrt([1,39,32,12,34,33,21,15]))