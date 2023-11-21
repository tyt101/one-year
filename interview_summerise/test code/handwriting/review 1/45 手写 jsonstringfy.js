function converJSON(obj) {

  const getType = (data) => {
    return Object.prototype.toString.call(data).replace(/\[object (.*?)\]/, "$1").toLowerCase()
  }
  const type = typeof obj

  // bigInt throw Error("can't convert bigInt type to Json")

  // circle throw Error("can't convert circular structure to JSON")

  // special undefined / function / symbol , ignore in object, return null in array
  // special NaN / Infinitely / Null, return null

  // not object
      // special undefined / function / symbol
      // special NaN / Infinitely / Null
      // base data structure
  // obj
      // wraper
      // array
      // iterator obj such as Map/WeakMap/Set/WeakSet...
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

converJSON(obj)