const lostRepeat = [1,1,2,3,4,4,5]

function lose() {
  return [...new Set(lostRepeat)]
}
console.log(lose());


function lose1() {
  let arr = [lostRepeat[0]]
  let cur = lostRepeat[0]
  for(let i = 0; i < lostRepeat.length;) {
    if(cur == lostRepeat[i]) {
      i++
    } else {
      arr.push(lostRepeat[i])
      cur = lostRepeat[i]
    }
  }
  return arr
}
console.log(lose1())

function lose2() {
  let map = new Map()
  lostRepeat.forEach(item => {
    map.set(item, 1)
  })
  return [...map.keys()]
}

console.log(lose2())

function lose3() {
  return lostRepeat.filter((item, index) => {
    return item !== lostRepeat[index - 1] || index == 0
  })
}
console.log(lose3())

function lose4() {
  let arr = []
  lostRepeat.reduce((pre, cur) => {
    if(pre !== cur) {
      arr.push(cur)
    }
    return cur
  },0)
  return arr
}
console.log(lose4())