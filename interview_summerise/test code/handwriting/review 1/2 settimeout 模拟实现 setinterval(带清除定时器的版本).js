/**
 * setTimeout 模拟 setInterval
 */
function mySetInterval(fn, wait) {
  let timer = null
  function interval () {
    fn()
    timer = setTimeout(interval, wait);
  }
  interval()
  return {
    cancel: () => {
      clearTimeout(timer)
      timer = null
    }
  }
}



// function mySetInterval(fn, wait) {
//   let timer = null
//   fn()
//   // 为什么不对呢？ 因为创建了多个timer，我们要保证这个timer是唯一的，所以正确的清空要使用闭包
//   timer = setTimeout(() => {
//     mySetInterval(fn, wait)
//   }, wait);

//   return {
//     cancel: function() {
//       clearTimeout(timer)
//       timer = null
//     }
//   }
// }




const timer111 = mySetInterval(() => {
  console.log("mmmm")
},1000)


setTimeout(() => {
  timer111.cancel()
}, 4*1000);