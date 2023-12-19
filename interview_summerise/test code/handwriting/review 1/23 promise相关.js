class MyPromise {
  constructor(fn) {
    this.status = 'pending'
    this.resolveFn = []
    this.rejectFn = []

    const resolve = (val) => {
      if(this.status !== 'pending') return;

      this.status = 'fulfilled'
      setTimeout(() => {
       this.resolveFn.forEach(fn => {
        fn.call(this, val)
       }) 
      });
    }

    const reject = (val) => {
      if(this.status !== 'pending') return;

      this.status = 'rejected'

      setTimeout(() => {
        this.rejectFn.forEach(fn => {
         fn.call(this, val)
        }) 
       });
    }

    try {
      fn(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(resolvedCallback, rejectedCallback) {
    resolvedCallback = typeof resolvedCallback != 'function' ? v => v : resolvedCallback
    rejectedCallback = typeof rejectedCallback != 'function' ? v => v : rejectedCallback

    return new MyPromise((resolve, reject) => {
      this.resolveFn.push((val) => {
        try {
          const x = resolvedCallback(val)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      })

      this.rejectFn.push((val) => {
        try {
          const x = rejectedCallback(val)
          x instanceof MyPromise ? x.then(resolve, reject) : reject(x)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  static all(promiseArr) {
    let res = []
    let count = 0
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach(promise => {
        promise.then((val) => {
          res.push(val)
          count ++ 
          if(count == promiseArr.length) {
            resolve(res)
          }
        }, (err) => {
          reject(err)
        })
      })
    })
  }

  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach(promise => {
        promise.then(res => {
          resolve(res)
        }, (err => {
          reject(err)
        }))
      })
    })
  }

  static cancelPromise(Promise) {
    let obj = {}
    const p = new MyPromise((resolve, reject) => {
      obj.resolve = resolve
      obj.reject = reject
    })

    obj.promise = MyPromise.race([p, Promise])

    return obj
  }
}

const myP = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(111)
  }, 3000);
})

const canCancelMyP = MyPromise.cancelPromise(myP)
canCancelMyP.promise.then(res => {
  console.log("=======:", res)
})
setTimeout(() => {
  canCancelMyP.resolve('cancel')
}, 1 * 1000);