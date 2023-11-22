class Schedule {
  constructor(max) {
    this.queue = []
    this.max = max
    this.runCount = 0
  }

  addTask(time, fn) {
    const taskPromise = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          fn()
          resolve()
        }, time);
      })
    }
    this.queue.push(taskPromise)
  }

  startTask() {
    for(let i = 0; i < this.queue.length; i++) {
      this.excuteTask()
    }
  }

  excuteTask() {
    if(this.runCount >= this.max || !this.queue.length || !this.queue) return

    this.runCount ++ 
    this.queue.shift()().then(res => {
      this.runCount--
      this.excuteTask()
    })
  }
}
const scheduler = new Schedule(2)

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

scheduler.startTask()