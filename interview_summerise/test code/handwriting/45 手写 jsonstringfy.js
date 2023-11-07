// 手写 jsonstringfy


/**===============================================异常============================================================== */

// 当在循环引用时会抛出异常TypeError ("cyclic object value")（循环对象值）
// 当尝试去转换 BigInt 类型的值会抛出TypeError ("BigInt value can't be serialized in JSON")（BigInt 值不能 JSON 序列化）.


/**===============================================特性============================================================== */


// JSON.stringify()将值转换为相应的 JSON 格式：

// 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。
// 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
// 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
// undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。函数、undefined 被单独转换时，会返回 undefined，如JSON.stringify(function(){}) or JSON.stringify(undefined).
// 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
// 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
// Date 日期调用了 toJSON() 将其转换为了 string 字符串（同 Date.toISOString()），因此会被当做字符串处理。
// NaN 和 Infinity 格式的数值及 null 都会被当做 null。
// 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。

const obj = {
  a: 1,
  b: 2,
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

  // 忽略
  ee: undefined,
  ff: function() {},
  gg: Symbol('s'),
  [Symbol('s')]: 11,

  // 包装类型 => 原始值
  eee: new Boolean(true),
  fff: new String('1'),
  ggg: new Number(1),

  // 循环引用， BigInt报错

  // 只序列化可枚举属性
  eeee: new Map(),
  ffff: new Set(),
  eeeee: new WeakMap(),
  fffff: new WeakSet(),
}
const convertOBJ = JSON.stringify(obj)
console.log(convertOBJ)


// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
function convertStringify(obj) {
  const convert = (objMM) => {
    
  }
}


