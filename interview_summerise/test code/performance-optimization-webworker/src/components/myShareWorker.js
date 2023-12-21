// eslint-disable-next-line
// onconnect = function (event) {
//   const port = event.ports[0];
//   console.log('=====================event:', event)
//   port.onmessage = function (e) {
//     console.log('=========================================:', e.data)
//     const workerResult = `Result: ${e.data[0] * e.data[1]}`;
//     port.postMessage(workerResult);
//   };

//   port.start()
// };

// 计时器
let counter = 0

// 监听连接
self.addEventListener('connect', (e) => {
  const port = e.ports[0]
  console.log('==============')
  port.postMessage('==============')
  port.onmessage = (res) => {
    console.log('共享线程接收到信息：', res.data)
    switch (res.data) {
      case 'counter++':
        counter++
        break
      case 'get counter':
        counter += 10
    }
    console.log('counter:', counter)
    port.postMessage(counter)
  }
})
