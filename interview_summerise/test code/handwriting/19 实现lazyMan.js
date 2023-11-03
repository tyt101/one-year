class LazyMan {
  constructor(name) {
    this.name = name
    this.task = []
    const task = () => {
      console.log('Hi this is ', this.name)
      this.next()
    }
    this.task.push(task)

    setTimeout(() => {
      this.next()
    }, 0);
  }

  next() {
    if(this.task.length) {
      this.task.shift()()
    } else {
      console.log('task excute done')
    }
  }

  eat(content) {
    const task = () => {
      console.log('Eat ' + content + ' ~')
      this.next()
    }
    this.task.push(task)
    // 实现链式调用欸！
    return this
  }

  sleep(time) {
    this._sleepWrapper(time, false)
    return this
  }


  sleepFirst(time) {
    this._sleepWrapper(time, true)
    return this
  }

  _sleepWrapper(time, first) {
    const task = () => {
      console.log('wake up after ' + time + ' s')
      setTimeout(() => {
        this.next()
      }, time*1000);
    }
    if(first) {
      this.task.unshift(task)
    } else {
      this.task.push(task)
    }
  }
}

const lazyMan = new LazyMan('livia')

lazyMan.sleep(1).eat('Dinner').sleepFirst(2)