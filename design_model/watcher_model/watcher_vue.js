function defineReactive(target, key, val) {
  // 针对val也可能是对象的情况进行递归
  const dep = new Dep()

  observer(val)
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: false,
    get: function() {
      return val
    },
    set: function(value) {
      val = value
      dep.notify()
    }
  })
}

function observer(target) {
  if(target && typeof target == 'object') {
    Object.keys(target).forEach(key => {
      defineReactive(target, key, target[key])
    })
  }
}

class Dep {
  constructor() {
    this.subs = []
  }

  add(target) {
    this.subs.push(target)
  },

  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}