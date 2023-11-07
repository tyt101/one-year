function quickSort(arr, left=0, right=arr.length - 1) {
  if(arr.length < 2) return arr
  let passIndex = partion(arr, left, right)
  if(left < passIndex - 1) {
    quickSort(arr, left, passIndex - 1)
  }
  if(passIndex < right) {
    quickSort(arr, passIndex, right)
  }
  return arr
}

function partion(arr, left, right) {
  let pivot = arr[Math.floor(left + (right - left) / 2)]
  let p = left
  let q = right
  while(p <= q) {
    while(arr[p] < pivot) {
      p++
    }

    while(arr[q] > pivot) {
      q--
    }

    if(p <= q) {
      swap(arr, p, q)
      p++
      q--
    }
  }
  return p
}

function swap(arr, p, q) {
  [arr[p], arr[q]] =[arr[q], arr[p]]
}

console.log(quickSort([1,39,32,12,34,33,21,15], 0))



// 3,6,2,4,1        pivot: 2
// 1,6,2,4,3        pivot: 2
// 1,2,6,4,3        i = 2

//left: 1, 2        
//right: 6,4,3      pivot: 4
//right: 3,4,6      pivot: 4



// 思路

// 选定一个徽标值pivot = arr[i]
// while(p<=q)循环通过从0~n找出比pivot大的第一个值下标p，通过n~0找出比pivot小的第一个值下标q, p<=q时，交换arr[p]和arr[q]， p++, q--
// 如此，就形成了pivot的左边都是比pivot小的值，pivot右边都是比pivot大的值
// 将当前p作为下一个徽标值返回



// function quickSort(arr) {
//   if (arr.length < 2) {
//     return arr;
//   }
//   const cur = arr[arr.length - 1];
//   const left = arr.filter((v, i) => v <= cur && i !== arr.length - 1);
//   const right = arr.filter((v) => v > cur);
//   console.log("left:", left)
//   console.log("right:", right)
//   return [...quickSort(left), cur, ...quickSort(right)];
// }