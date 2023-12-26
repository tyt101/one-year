// ==================================================简单
console.log('=============================================================简单===========================================================================')
function deepClone(obj) {
  if(typeof obj != 'object' || typeof obj == 'function') return obj

  let res = Array.isArray(obj) ? [] : {}

  for(let o in obj) {
    if(obj.hasOwnProperty(o)) {
      res[o] = deepClone(obj[o])
    }
  }

  return res
}


const obj = {
  a: 1,
  n: 2,
  d: [1,2,3]
}

const obj1 = deepClone(obj)

console.log(obj1)
obj1.a = '123'
console.log(obj1, obj)

console.log('=============================================================考虑循环引用等===========================================================================')

function complexDeepClone(obj){

  // 循环引用判断

  // 包装类型

  // 正则 RegExp

  const getType = (input) => Object.prototype.toString.call(input).replace(/\[object (.*?)\]/, "$1").toLowerCase()
  const isWrapperType = (input) => {
    return ['string', 'number', 'boolean', 'map', 'weakmap', 'set', 'weakset', 'symbol', 'bigint'].includes(getType(input))
  }


  const handleRegEXp = (input) => {
    const {source, flags, lastIndex} = input
    const reg = new RegExp(source, flags)
    reg.lastIndex = lastIndex
    return reg
  }

  const handleWrapper = (input) => {
    const type = getType(input)
    switch (type) {
      case 'number':
        return Object(Number.prototype.valueOf.call(input))
      case 'string':
        return Object(String.prototype.valueOf.call(input))
      case 'boolean':
        return Object(Boolean.prototype.valueOf.call(input))
      case 'set':
        return Object(Set.prototype.valueOf.call(input))
      case 'map':
        return Object(Map.prototype.valueOf.call(input))
      case 'bigint':
        return Object(BigInt.prototype.valueOf.call(input))
      case 'date':
        return Object(Date.prototype.valueOf.call(input))
      case 'weakmap':
        return Object(WeakMap.prototype.valueOf.call(input))
      case 'weakset':
        return Object(WeakSet.prototype.valueOf.call(input))
      case 'symbol':
        return Object(Symbol.prototype.valueOf.call(input))
      default:
        break;
    }
  }
  const weakMap = new WeakMap()
  const copy = (input) => {
    if(typeof input !== 'object' || typeof input == 'function' || !input) return input

    if(getType(input) == 'regexp') {
      return handleRegEXp(input)
    }

    if(isWrapperType(input)) {
      return handleWrapper(input)
    }

    
    
    if(weakMap.has(input)) return weakMap.get(input)

    let res = Array.isArray(input) ? [] : {}

    weakMap.set(input, res)


    for(let inp in input) {
      if(input.hasOwnProperty(inp)) {
        res[inp] = copy(input[inp])
      }
    }


    const symbols = Object.getOwnPropertySymbols(input)

    for(let symbolKey in symbols) {
      res[symbols[symbolKey]] = copy(input[symbols[symbolKey]])
    }


    return res
  }
  return copy(obj)
}



const obj11 = {
  a: 1,
  b: '2',
  c: {
    mm: 10,
  },
  d: [1,2,3,4,5,6],

  '1': 1,
  // null
  e: NaN,
  f: Infinity,
  g: null,
  m: [undefined, function(){}, Symbol('s')],  

  // 忽略 obj里面的 undefined / function / symbol 以及键为symbol的
  ee: undefined,
  ff: function() {},
  gg: Symbol('s'),
  [Symbol('s')]: 11,

  // 包装类型 => 原始值
  eee: new Boolean(true),
  fff: new String('1'),
  ggg: new Number(1),

  // 循环引用,BigInt报错. 暂不测试
  // 只序列化可枚举属性
  eeee: new Map(),
  ffff: new Set(),
  eeeee: new WeakMap(),
  fffff: new WeakSet(),

  rgex: new RegExp(/123/,'g')
}
const newObj = complexDeepClone(obj11)
console.log('oldobj:', obj11)
console.log('newObj',newObj)