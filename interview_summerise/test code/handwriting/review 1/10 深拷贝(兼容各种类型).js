function deepClone(obj) {
  // 1. 循环引用问题
  // 2. wrapper问题
  // 3. undefined / function / symbol
  // 4. NaN / null / Infinitely
  // 5. 正则
  const weakMap = new WeakMap()

  const isObject = (input) => typeof input == 'object' || typeof input == 'function'

  const isFunction = (input) => typeof input == 'function'

  const getType = (input) => Object.prototype.toString.call(input).replace(/\[object (.*?)\]/, '$1').toLowerCase()

  const handleExp = (input) => {
    const {source, flags, lastIndex} = input

    const reg = new RegExp(source, flags)
    reg.lastIndex = lastIndex
    return reg
  }

  const isWrapper = (input) => {
    const wrap = ['string','boolean', 'number', 'map', 'weakmap', 'set', 'weakset', 'date', 'bigint', 'symbol']
    return wrap.includes(getType(input))
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

  const getPrototype = (input) => {
    return Object.create(Object.getPrototypeOf(input))
  }

  function copy(input) {

    
    if(!isObject(input) || isFunction(input) || !input) return input
    
    if(getType(input) == 'regexp') {
      return handleExp(input)
    }
    
    if(isWrapper(input)) {
      return handleWrapper(input)
    }
    
    if(weakMap.has(input)) return weakMap.get(input)
    const output = Array.isArray(input)? []: getPrototype(input)

    weakMap.set(input, output)
    for(let inp in input) {
      if(input.hasOwnProperty(inp)) {
        output[inp] = copy(input[inp])
      }
    }

    const symbols = Object.getOwnPropertySymbols(input)
    for(let key in symbols) {
      output[symbols[key]] = copy(input[symbols[key]])
    }

    return output
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
const newObj = deepClone(obj11)
console.log('oldobj:', obj11)
console.log('newObj',newObj)
