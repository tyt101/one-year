function converJSON(obj) {

  const getType = (data) => {
    return Object.prototype.toString.call(data).replace(/\[object (.*?)\]/, "$1").toLowerCase()
  }
  const type = typeof obj

  // bigInt throw Error("can't convert bigInt type to Json")
  if(type == 'bigint') throw Error("can't convert bigInt type to Json")

  
  // circle throw Error("can't convert circular structure to JSON")
  const isCircle = (obj) => {

    if(!obj || typeof obj != 'object') return

    let detected = false
    let setMap = new Set()
    const detect = (obj) => {
      if(setMap.has(obj))
        return (detected = true)
      setMap.add(obj)

      for(let o in obj) {
        if(obj.hasOwnProperty(o)) {
          detect(obj[o])
        }
      }
    }
    return detected
  }
  if(isCircle(obj)) throw Error("can't convert circular structure to JSON")


  // special undefined / function / symbol , ignore in object, return null in array
  const specialIgnoreInObjButNullInArray = ['undefined', 'function', 'symbol']


  // special NaN / Infinitely / Null, return null
  const specialNull = [NaN, Infinity, null]


  // not object
      // special undefined / function / symbol
      // special NaN / Infinitely / Null
      // base data structure
  if(type !== 'object' || obj == null) {
    let result = obj
    if(specialIgnoreInObjButNullInArray.includes(obj)) {
      return undefined
    } else if(specialNull.includes(obj)) {
      result = "null"
    } else {
      result = '"' + obj + '"'
    }
    return String(result)
  }
  // obj
      // obj.toJSON == function
      // array
      // wraper
      // iterator obj such as Map/WeakMap/Set/WeakSet...
  else if(type == 'object'){
    let wraper = ['string', 'boolean', 'number']
    if(typeof obj.toJSON == 'function') {
      converJSON(obj.toJSON())
    } else if (Array.isArray(obj)) {
      let result = obj.map(item => {
        return specialIgnoreInObjButNullInArray.includes(typeof item) ? 'null' : converJSON(item)
      })
      return `[${result}]`.replace(/'/g, '"')
    } else if(wraper.includes(getType(obj))) {
      return String(obj)
    }else {
      let result = []
      Object.keys(obj).forEach(key => {
        // ignore symbol key
        if(typeof key != 'symbol') {
          let val = obj[key]
          // 忽略对象中值为 undefined, null, symbol 的
          if(!specialIgnoreInObjButNullInArray.includes(typeof val)) {
            result.push(`"${key}":${converJSON(val)}`)
          }
        }
      })
      return `{${result}}`.replace(/'/g,'"')
    }
  }
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

const res = converJSON(obj)
console.log("RES:", res)

