let a = "0009007199254740991";
let b = "1234567899999999999";
// a + b = "1243575099254740990";


function bigNumAdd(a, b) {
  let curA = a.split('')
  let curB = b.split('')
  console.log(curA, curB)

  if(curA.length > curB.length) {
    let arr = new Array(curA.length - curB.length).fill('0')
    curB = curB.concat(...arr)
  } else if(curA.length < curB.length){
    let arr = new Array(curB.length - curA.length).fill('0')
    curA = curA.concat(...arr)
  }
  let res = []
  let sign = 0
  for(let i = curA.length - 1; i >= 0; i--) {
    let aa = parseInt(curA[i])
    let bb = parseInt(curB[i])
    res.unshift((aa + bb + sign) % 10)
    sign = Math.floor((aa + bb + sign) / 10)
  }
  if(sign)
  res.unshift(sign)
  console.log(res.join(''))
  return res.join('')
}


console.log(bigNumAdd(a, b))