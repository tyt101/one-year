function formatPrice(number) {
  const dicimalPart = (""+number).split('.')[1]
  const intergerPart = (""+number).split('.')[0]
  // return intergerPart.replace(/\B(?=(\d{3})+$)/g, (...key) => {
  //   console.log("key:", key)
  //   return ','
  // })
  let res = ''
  for(let i = intergerPart.length - 1; i >= 0; i--) {
    res = intergerPart[i] + res
    if((intergerPart.length - i) % 3 == 0) {
      res = ',' + res
    }
  }
  return res + '.' + dicimalPart
}
console.log(formatPrice(1234567891.3343)); // 1,234,567,891.3343