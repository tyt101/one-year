class Scheduler {
  constructor(limit) {
    this.queue = []
    this.maxCount = limit
    this.runCount = 0
  }

  // 添加task
  addTask(time, fn) {
    const promiseCreator = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          fn()
          resolve()
        }, time);
      })
    }
    this.queue.push(promiseCreator)
  }

  // 开始执行task
  startTack() {
    for(let i = 0; i < this.queue.length; i++) {
      this.requestTask()
    }
  }
  // 调用task
  requestTask() {
    if(!this.queue || this.runCount > this.maxCount || !this.queue.length) return

    this.runCount++

    this.queue.shift()().then(() => {
      this.runCount--
      this.requestTask()
    })
  }
}



const scheduler = new Scheduler(2)

scheduler.addTask(1100,() => {
  console.log('aaaa')
})
scheduler.addTask(500,() => {
  console.log('bbbb')
})
scheduler.addTask(300,() => {
  console.log('cccc')
})
scheduler.addTask(820,() => {
  console.log('dddd')
})
scheduler.addTask(1200,() => {
  console.log('3333')
})

scheduler.startTack()

// function sche(arr, limit) {
//   let count = 0

//   const q =(x) => {
//     count++
//     console.log("count:", count)
//     if(count > limit) {
//       console.log("===========")
//       return
//     }
//     x.then(res => {
//       console.log("qqq:", res)
//     }).finally(() => {
//       if(arr.length) {
//         count--
//         q(arr.shift())
//       }
//     })
//   }
//   q(arr.shift())
// }
// const a = new Promise(resolve => {
//   setTimeout(() => {
//     resolve(1)
//   }, 1000);
// })
// const be = new Promise(resolve => {
//   setTimeout(() => {
//     resolve(2)
//   }, 1000);
// })
// const ae = new Promise(resolve => {
//   setTimeout(() => {
//     resolve(3)
//   }, 3000);
// })
// sche([a,be,ae], 1)