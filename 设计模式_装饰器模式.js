const before = function (fn, beforeFunc) {
  return function () {
    beforeFunc.apply(this, arguments)
    return fn.apply(this, arguments)
  }
}

const after = function (fn, afterFunc) {
  return function () {
    var ret = fn.apply(this, arguments)
    afterFunc.apply(this, arguments)
    return ret
  }
}

const a = before(
  function () {
    console.log("画⚪")
  },
  function () {
    console.log("设置颜色")
  }
)
const b = after(
  function () {
    console.log("画⚪")
  },
  function () {
    console.log("变成绿色")
  }
)
a()
b()
