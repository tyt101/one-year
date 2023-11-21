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

function compose(...fn) {
  if (!fn.length) return (v) => v;
  if (fn.length === 1) return fn[0];
  return fn.reduce(
    (pre, cur) =>{
      console.log('挖出：', pre, cur)
      return (...args) =>{
        console.log('====:', pre, cur, args)
        return pre(cur(...args))
      }
    }
  );
}
const a = compose(fn1, fn2, fn3, fn4);
// fn1(fn2(fn3(fn4(x)))) = > fn1(fn2(fn3(x + 4))) => fn1(fn2(x + 4 + 3)) => fn1(x + 4 + 3 + 2) = a(x)
console.log(a(1));