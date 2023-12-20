const typeMethodObj = {
  a(arg) {
    return arg + '1'
  },
  b(arg) {
    return arg + '2'
  },
  c(arg) {
    return arg + '3'
  }
}

const typeMethod = (type, args) => {
  return typeMethodObj[type](args)
}


typeMethodObj.d = (arg) => {
  return arg + 'mmm'
}

console.log(typeMethod('a', 11), '========')
console.log(typeMethod('d', 11), '========')