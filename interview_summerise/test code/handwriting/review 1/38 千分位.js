function formatPrice(number) {
  let decimalNum = ("" + number).split('.')[1]
  let intergerNum = ("" + number).split('.')[0]
  
  // let res = ''
  // for(let i = intergerNum.length - 1; i >=0; i--) {
  //   if((intergerNum.length - i) % 3 == 0) {
  //     res = ',' + intergerNum[i] + res
  //   } else res = intergerNum[i] + res
  // }
  // return res

  
  return intergerNum.replace(/(?=(\d{3})+$)/g, ',') + '.' + decimalNum
}



console.log(formatPrice(1234567891.3343)); // 1,234,567,891.3343