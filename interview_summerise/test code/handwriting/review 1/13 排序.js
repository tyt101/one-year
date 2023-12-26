function BubbleSort(arr) {
  let len = arr.length;

  for(let i = 0; i < len - 1; i ++) {
    for(let j = 0; j < len - 1 - i; j++) {
      if(arr[j + 1] < arr[j]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
      }
    }
  }
  return arr
}

console.log(BubbleSort([1,5,3,2,6,9,7]))


function selectSort(arr) {
  let len = arr.length

  for(let i = 0; i < len - 1; i ++) {
    let minIndex = i
    for(let j = i + 1; j < len; j++) {
      if(arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]]
  }
  return arr
}

console.log(selectSort([1,5,3,2,6,9,7]))


function insertSort(arr) {
  let len = arr.length
  for(let i = 0; i < len - 1; i++) {
    let j = i + 1
    let target = arr[j]

    while(j >= 1 && arr[j - 1] > target) {
      arr[j] = arr[j-1]
      j--
    }

    arr[j] = target
  }
  return arr
}
console.log(insertSort([1,5,3,2,6,9,7]))


function quickSort(arr) {
  if(arr.length < 2) return arr

  let cur = arr[arr.length - 1]

  let l = arr.filter((v, i) => v <= cur && i != arr.length - 1) 

  let r = arr.filter(v => v > cur)

  return [...quickSort(l), cur, ...quickSort(r)]
}

console.log(quickSort([1,5,3,2,6,9,7]))


function mergeSort(arr) {
  if(arr.length < 2) return arr 

  let index = Math.floor(arr.length / 2)

  return merge(mergeSort(arr.slice(0, index)), mergeSort(arr.slice(index)))
}

function merge(arrA, arrB) {
  let i = 0, j = 0
  let res = []
  while(i < arrA.length && j < arrB.length) {
    if(arrA[i] <= arrB[j]) {
      res.push(arrA[i])
      i ++
    } else {
      res.push(arrB[j])
      j ++
    }
  }

  if(i < arrA.length) {
    res = res.concat(...arrA.slice(i))
  }

  if(j < arrB.length) {
    res = res.concat(...arrB.slice(j))
  }
  return res
}

console.log(mergeSort([1,5,3,2,6,9,7]))


function swap(arr, l, r) {
  let temp = arr[l]
  arr[l] = arr[r]
  arr[r] = temp
}
function searchPivot(arr, left, rigth) {
  let pivotVal = arr[Math.floor(left + (rigth - left) / 2)]
  
  let l = left
  let r = rigth

  while(l <= r) {
    while(arr[l] < pivotVal) {
      l++
    }

    while(arr[r] > pivotVal) {
      r--
    }

    if(l <= r) {
      swap(arr, l, r)
      l++
      r--
    }
  }


  return l
}

function quickSortComplex(arr, left = 0, rigth = arr.length - 1) {
  if(arr.length < 2) return arr

  let pivot = searchPivot(arr, left, rigth)
  if(left < pivot - 1) {
    quickSortComplex(arr, left, pivot - 1)
  }

  if(rigth > pivot) {
    quickSortComplex(arr, pivot, rigth)
  }

  return arr
}




console.log(quickSortComplex([1,5,3,2,6,9,7]))