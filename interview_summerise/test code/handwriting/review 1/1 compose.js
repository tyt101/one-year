function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1));  // 11

/**我需要编写的 */
function compose(...fn) {
  return fn.reduce((pre, cur) => {
    return (...args) => {
      return pre(cur(...args))
    }
  })
}
// fn1(fn2(fn3(fn4(x)))) = > fn1(fn2(fn3(x + 4))) => fn1(fn2(x + 4 + 3)) => fn1(x + 4 + 3 + 2) = a(x)