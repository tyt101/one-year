const obj = {
  a: {
         b: 1,
         c: 2,
         d: {e: 5}
     },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
}
// 结果返回如下
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }
const isObject = (o) => typeof o == 'object'
const isArray = (o) => Array.isArray(o)
function flatten(obj) {
  if(!isObject(obj)) return

  let res = {}

  const dfs = (cur, prefix) => {
    if(isObject(cur)) {
      if(isArray(cur)) {
        for(let o = 0; o < cur.length; o++) {
          dfs(cur[o], `${prefix}[${o}]`)
        }
      } else {
        for(let o in cur) {
          dfs(cur[o],`${prefix}${prefix ? '.': ''}${o}`)
        }
      }
    } else {
      res[prefix] = cur
    }
  }

  dfs(obj, "")

  return res
}

console.log(flatten(obj))