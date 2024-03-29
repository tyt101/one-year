// 防抖：一个事件在ns内频繁的触发不会响应回调函数，只有在事件触发ns后不继续触发事件才会响应回调函数。
// 应用：search搜索联想，屏幕resize
// 节流：一个事件频繁触发，事件只会每各ns响应一次。
// 应用：点击事件，页面滚动事件，触底加载
function debounce(fn, wait) {
  let timer = null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait);
  }
}


function throttle(fn, wait) {
  let timeNow = Date.now()
  return function(...args) {
    if(Date.now() - timeNow >= wait) {
      fn.apply(this,args)
      timeNow = Date.now()
    }
  }
}
