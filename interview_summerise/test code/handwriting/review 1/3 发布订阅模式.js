class EventEmitter {
  constructor() {
    this.dep = {}
  }

  // 订阅

  on(type, cb) {
    if(!this.dep[type]) {
      this.dep[type] = [cb]
    }
    this.dep[type].push(cb)
  }

  // 删除

  del(type, cbs) {
    if(!this.dep[type]) throw Error('不存在')
    this.dep[type] = this.dep.filter(dep => dep == cbs)
  }

  // 执行1次

  once(type, cbs) {
    function fn() {
      cbs()
      this.del(type, cbs)
    }
    this.on(type, fn)
  }

  // 触发

  trigger(type, ...args) {
    if(this.dep[type]) {
      this.dep[type].forEach(cb=> {
        cb.apply(this, args)
      })
    }
  }
}


// 示例
const em = new EventEmitter()
let a = 0
em.on('update:a', (val) => {
  a = val
})

em.trigger('update:a',34)
console.log(a)