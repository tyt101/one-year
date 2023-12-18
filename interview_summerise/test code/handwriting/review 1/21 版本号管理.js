
let arr = ['0.1.1', '2.3.3', '0.302.1', '4.3.5', '4.3.4.5']
//arrSorted  =>  ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']

function sortArrNums(arr) {
  return arr.sort((a, b) => {
    let i = 0
    let arrA = a.split('.')
    let arrB = b.split('.')
    while(true) {
      let sA = arrA[i]
      let sB = arrB[i]
      i++
      if(sA == undefined || sB == undefined) {
        return sB - sA
      }

      if(sA == sB) continue;

      return sB - sA
    }
  })
}
console.log(sortArrNums(arr))