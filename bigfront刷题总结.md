11s
<a name="nt8yu"></a>
#### 刷题（每日一题）：[https://bigfrontend.dev/problem](https://bigfrontend.dev/problem)

<a name="BUYKS"></a>
# implement curry()
```javascript
const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)

curriedJoin(1, 2, 3) // '1_2_3'

curriedJoin(1)(2, 3) // '1_2_3'

curriedJoin(1, 2)(3) // '1_2_3'

```
```javascript
// 柯里化：将一个n元函数，转换成n个一元函数
// 关键点： curry函数在参数齐时， 调用函数；参数不齐时，返回函数，
function curry(fn) {
  return function innerCurry(...args){
    if(args.length  >=  fn.length) {
     return fn.apply(this, args)
    } else {
      // 利用bind本身会调用函数，并返回一个更改了this指针的函数
      return innerCurry.bind(this, ...args)
    }
  }
}

function curry(fn) {
  return function innerCurry() {
    const args = arguments
    if(args.length >= fn.length) {
      return fn(...args)
    } else {
      return function() {
        const args1 = arguments
        return innerCurry(...args, ...args1)
      }
    }
  }
}
```
<a name="BLfPa"></a>
# implement Array.prototype.flat()
```javascript
const arr = [1, [2], [3, [4]]];

flat(arr)
// [1, 2, 3, [4]]

flat(arr, 1)
// [1, 2, 3, [4]]

flat(arr, 2)
// [1, 2, 3, 4]
```
```javascript

// This is a JavaScript coding problem from BFE.dev 
/**
 * @param { Array } arr
 * @param { number } depth
 * @returns { Array }
 */

// bad
// function flat(arr, depth = 1) {
//   while(depth > 0) {
//     arr = [].concat(...arr)   
//     depth--
//   }
//   return arr
// }

function flat(arr, depth = 1) {
  let newArr = []
  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i]) && depth > 0) {
      newArr.push(...flat(arr[i], depth - 1))
    } else {
      newArr.push(arr[i])
    }
  }
  return newArr
}

function flat(arr, depth = 1) {
  return arr.reduce((pre, next) => {
    return pre.concat(depth > 1 && Array.isArray(next) ? flat(next, depth - 1) : next)
  },[])
}
```
