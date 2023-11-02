// setTimeout => setInterval
// 为什么要用setTimeout来模拟setInterval
/**
 * 因为setInterval在每次将产生的任务推入到任务队列前，都要先判断一下任务队列中是否上一次的该任务还存在，如果存在就不添加。
 * 而setTimeout产生任务后会直接推入到任务队列
 */
function myInterval(fn, t) {
  let timer = null;
  function interval() {
    fn()
    timer = setTimeout(interval, t);
  }
  interval()
  return {
    cancel: () => {
      clearTimeout(timer)
    }
  }
}

const p = myInterval(() => {
  console.log('myInterval')
}, 1000)

setTimeout(() => {
  p.cancel()
}, 10000);


// setInterval => setTimeout

function mySetTimeout(fn, t) {
  const timer = setInterval(() => {
    clearInterval(timer)
    fn() 
  }, t);
}

mySetTimeout(() => {
  console.log("mySetTimeout")
},2000)