class EventEmitter {
  constructor() {
    this.event = {}
  }

  // 订阅
  on(type, cb){
    if(!this.event[type]) {
      this.event[type] = [cb]
    } else {
      this.event[type].push(cb)
    }
  }

  // 删除
  off(type, cb) {
    if(!this.event[type]) return
    this.event[type] = this.event[type].filter(item => {
      return item != cb
    })
  }

  // 执行1次
  once(type, cb) {
    function fn() {
      cb()
      this.off(type, fn)
    }
    this.on(type, fn)
  }

  // 触发
  emit(type, ...params) {
    this.event[type] && this.event[type].forEach(fn => fn.apply(this, params))
  }
}


const emitter = new EventEmitter()

console.log('emitter.event:',emitter.event)
emitter.on('aaa', (...params) => {
  console.log('aaa1', params)
})
emitter.on('aaa', () => {
  console.log('aaa2')
})
emitter.on('bbb', () => {
  console.log('bbb')
})
console.log('emitter.event2:', emitter.event)
setTimeout(() => {
  emitter.emit('aaa', 1, 2, 3, 4)
}, 1000);

