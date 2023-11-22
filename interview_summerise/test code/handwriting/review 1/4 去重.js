const arr = [1, 1, 2, 2, 3, 4, 5, 6, 6, 7]

function removeRepeat(arr) {
  return [...new Set(arr)]
}
console.log('removeRepeat:',removeRepeat(arr))


function removeRepeat1(arr) {
  let newArr = [arr[0]]
  for(let i = 1; i < arr.length; i++) {
    if(arr[i] !== arr[i-1]) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
console.log('removeRepeat1',removeRepeat1(arr))

function removeRepeat2(arr) {
  let newArr = [arr[0]]
  arr.reduce((pre, cur) => {
    if(pre != cur) {
      newArr.push(cur)
    }
    return cur
  })
  return newArr
}

console.log('removeRepeat2',removeRepeat2(arr))


function removeRepeat3(arr) {
  let map = new Map()

  arr.forEach(item => {
    map.set(item, item)
  })

  return [...map.values()]
}

console.log('removeRepeat3:',removeRepeat3(arr))


function removeRepeat4(arr) {
  return arr.filter((item, index) => {
    return index == 0 || (item !== arr[index - 1]) 
  })
}
console.log('removeRepeat4:', removeRepeat4(arr))