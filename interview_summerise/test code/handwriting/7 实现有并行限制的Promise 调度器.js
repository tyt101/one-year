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