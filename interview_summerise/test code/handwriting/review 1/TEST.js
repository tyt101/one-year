// SetTimeout和SetInterval的区别：SetTimeout是等待的wait时间到了就会推入到执行队列中进行执行，回调函数执行完成后再去 推入下一个setTimeout
let sT = performance.now()
setTimeout(() => {
  console.log('0', performance.now() - sT)
}, 0);

setTimeout(() => {
  console.log('1', performance.now() - sT)
}, 0);

setTimeout(() => {
  console.log('2', performance.now() - sT)
}, 0);

// SetInterval是每间隔wait时间把回调函数放入到异步队列中等待执行，不需要等待回调函数执行完了再推入进去

setInterval(() => {
  i = 9999
  do {
    i--
  } while (i);
}, 1000);
setInterval(() => {
  console.log("interval:")
}, 1000)

// function testTimeout() {
//   let sT = performance.now()

//   setTimeout(() => {
//     let i = 999;
//     do {
//       i--
//     } while (i);
//     const psT = performance.now() - sT
//     console.log("执行时间：", psT)
//   }, 100);
//   setTimeout(() => {
//     const psT = performance.now() - sT
//     console.log("执行时间2：", psT)
//   }, 100);
//   let i = 9999999;
//   do {
//     i--
//   } while (i);
// }

// testTimeout()

// setInterval(() => {
//   let i = 999;
//     do {
//       i--
//       console.log("=======:",i)
//     } while (i);
// },1000)

// setInterval(() => {
//   console.log('-s=')
// },1000)



new IntersectionObserver()