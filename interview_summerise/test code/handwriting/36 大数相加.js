let a = "9007199254740991";
let b = "1234567899999999999";
// let a = "0009007199254740991";
// let b = "1234567899999999999";
// a + b = "1243575099254740990";

function add(a, b) {
  let curA = a.split('')
  let curB = b.split('')
  if(curA.length > curB.length) {
    let arr = new Array(curA.length - curB.length).fill('0')
    curB = arr.concat(...curB)
  } else if(curA.length < curB.length) {
    let arr = new Array(curB.length - curA.length).fill('0')
    curA = arr.concat(...curA)
  }
  let sign = 0
  let res = []
  for(let i = curA.length - 1; i >= 0; i--) {
    let arrA = parseInt(curA[i])
    let arrB = parseInt(curB[i])
    let sum = arrA + arrB + sign
    if(sum >= 10) {
      sign = 1;
    } else {
      sign = 0
    }
    res.unshift(sum % 10)
  }
  if(sign)
    res.unshift(sign)
  console.log(res, res.join(''))
  return res.join('')
}

add(a, b)



function addSum(a, b) {
  let len = Math.max(a.length, b.length)
  a = a.padStart(len, 0)
  b = b.padStart(len, 0)
  console.log("a:", a)
  console.log("b:", b)
  let sign = 0
  let sum = ""
  for(let i = len - 1; i >= 0; i--) {
    let curSum = parseInt(a[i]) + parseInt(b[i]) + sign
    sign = Math.floor(curSum / 10)

    sum = (curSum % 10) + sum
  }
  if(sign) {
    sum = ""+sign + sum
  }
  return sum
}

console.log('addSum(a, b)',addSum(a, b))