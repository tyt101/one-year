// https://developer.aliyun.com/article/917861
let stm = Symbol(123)
let a = {
  b: true,
  c: undefined,
  d: [null, function() {    //  全部转为null
    console.log("===")
  },Symbol(111)],
  e: NaN,                   //  null
  f: Infinity,              //  null
  er: null,                 //  null
  objS: Object('123'),      //  拷贝后为原始值'123'
  objN: Object(123),        //  拷贝后为原始值123
  objB: Object(true),       //  拷贝后为原始值true
  func: function() {        //  被忽略
    console.log("===")
  },
  sym: Symbol(222),         //  被忽略
  und: undefined,           //  被忽略
  [stm]: 11,
}

const str = JSON.stringify(a)
console.log('str:', str)
console.log('parse:', JSON.parse(str))

// 找到所有枚举symbol
const symbols = Object.getOwnPropertySymbols(a)
for(let i = 0, len = symbols.length; i < len; i++) {
  if(a.propertyIsEnumerable(symbols[i])) {
    const value = a[symbols[i]]
    console.log("value:", value)
  }
}
// 不可枚举symbols
for(let i in a) {
  if(a.propertyIsEnumerable(i)) {
    console.log(i)
  }
}

/** =============================================分界线，上面为JSON.stringify示例================================================================ */


/** =============================================下面为一个比较完整的深拷贝实现================================================== */
function deepClone(obj) {
  let isObject = (obj1) => typeof obj1 == 'object' || typeof obj1 == 'function'
  let isFunction = (obj1) => typeof obj1 == 'function'
  let isArray = (obj1) => Array.isArray(obj1)
  const weakmap = new WeakMap()

  function getClass(input) {
    return Object.prototype.toString.call(input)
  }
  function isWrapperType(input) {
    const typeClass = getClass(input)
    const type = /^\[object (.*)\]$/.exec(typeClass)[1]
    return ['Boolean', 'String', 'Number', 'Symbol', 'BigInt', 'Date', 'Map', 'Set'].includes(type)
  }
  function handleWrapper(input) {
    let type = getClass(input)
    switch (type) {
      case '[object Boolean]':
        return Object(Boolean.prototype.valueOf.call(input))
      case '[object String]':
        return Object(String.prototype.valueOf.call(input))        
      case '[object Number]':
        return Object(Number.prototype.valueOf.call(input))        
      case '[object Symbol]':
        return Object(Symbol.prototype.valueOf.call(input))        
      case '[object BigInt]':
        return Object(BigInt.prototype.valueOf.call(input))        
      case '[object Date]':
        return Object(Date.prototype.valueOf.call(input))    
      case '[object Set]':
        return Object(Set.prototype.valueOf.call(input))    
      case '[object Map]':
        return Object(Map.prototype.valueOf.call(input))
      default:
        return undefined
    }
  }
  function handlePrototype(obj) {
    if(obj.constructor == undefined) return Object.create(null)

    if(obj.constructor == 'function' && (obj.constructor !== obj || obj !== Object.prototype)) {
      return Object.create(Object.getPrototypeOf(obj))
    }
    return {}
  }
  function handleRegEXp(input) {
    const { source, flags, lastIndex } = input
    const reg = new RegExp(source, flags)
    reg.lastIndex = lastIndex
    return reg
  }
  function copy(input) {
    if(!isObject || isFunction) return input

    if(getClass(input) == '[object RegExp]') handleRegEXp(input)
    if(isWrapperType(input)) handleWrapper(input)
    // 循环引用
    if(weakmap.has(input)) return weakmap.get(input)

    const output = isArray(input) ? [] : handlePrototype(input)

    weakmap.set(input, output)

    // Reflect.ownKeys(input).forEach , 遍历对象input中可枚举的属性，包括Symbol属性
    for(let inp in input) {
      if(input.hasOwnProperty(inp)) {
        output[inp] = copy(input[inp])
      }
    }
    let symbols = Object.getOwnPropertySymbols(input)

    for(let sym = 0; sym < symbols.length; sym++) {
      if(input.propertyIsEnumerable(symbols[sym])) {
        output[symbols[sym]] = copy(symbols[sym])
      }
    }
    return output
  }
  return copy(obj)
}

const test = {
  a: 123,
  b: {
    a: 222
  },
  [stm]: 12,
  c: new Boolean(12),
  d: new RegExp(123),
  e: /\d/g
}
let deepClone1 = deepClone(test)
console.log(test)
console.log(deepClone1)


