function deepClone(obj) {
  
  const isObject = (input) => typeof input == 'object' || typeof input == 'function'

  const isFunction = (input) => typeof input == 'function'

  const getType = (input) => Object.prototype.toString.call(input).replace(/\[object (.*?)\]/, '$1').toLowerCase()

  const handleRegEXp = (input) => {
    const {source, flags, lastIndex} = input
    const reg = new RegExp(source, flags)
    reg.lastIndex = lastIndex
    return reg
  }

  const isWrapperType = (input) => {
    const type = ['number', 'string', 'boolean', 'set', 'map', 'bigint', 'symbol', 'date', 'weakmap', 'weakset']
    return type.includes(getType(input))
  }

  const handleWrapper = (input) => {
    const type = getType(input)
    // ['number', 'string', 'boolean', 'set', 'map', 'bigint', 'symbol', 'date']
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
      case 'bigInt':
        return Object(BigInt.prototype.valueOf.call(input))
      case 'date':
        return Object(Date.prototype.valueOf.call(input))
      case 'weakmap':
        return Object(WeakMap.prototype.valueOf.call(input))
      case 'weakset':
        return Object(WeakSet.prototype.valueOf.call(input))
      default:
        break;
    }
  }

  const getPrototype = (input) => {
    if(input.constructor == undefined) return Object.create(null)

    if(typeof input.constructor == 'function' && (input.constructor != input || input.constructor != Object.prototype)) {
      return Object.create(Object.getPrototypeOf(input))
    }

    return {}
  }

  function copy(input) {
    // !obj || function => return input
    if(!isObject(input) || isFunction(input) || !input) return input
    // regexp
    if(getType(input) == 'regexp') return handleRegExp(input)
    // wrapper
    if(isWrapperType(input)) return handleWrapper(input)
    // circle
    const weakMap = new WeakMap()

    if(weakMap.has(input)) return weakMap.get(input)

    const output = Array.isArray(input) ? []: getPrototype(input)
    weakMap.set(input, output)
    // object

    // !symbol
    for(let inp in input) {
      if(input.hasOwnProperty(inp)) {
        output[inp] = copy(input[inp])
      }
    }
      // symbol
    const symbols = Object.getOwnPropertySymbols(input)
    for(let sym in symbols) {
      output[symbols[sym]] = copy(input[symbols[sym]])
    }
    return output
  }

  return copy(obj)
}

const obj = {
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
}
const newObj = deepClone(obj)
console.log('oldobj:', obj)
console.log('newObj',newObj)