class MyPromise {
  constructor(fn) {
    this.state = 'pending'

    this.resolveFun = []
    this.rejectFun = []

    const resolve = (val) => {
      if(this.state !== 'pending') return;

      this.state = 'fulfilled'
      setTimeout(() => {
        this.resolveFun.forEach(item => {
          return item.call(this, val)
        })
      });
    }

    const reject = (val) => {
      if(this.state !== 'pending') return;

      this.state = 'rejected'

      setTimeout(() => {
        this.rejectFun.forEach(item => {
          return item.call(this, val)
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
    resolvedCallback = typeof resolvedCallback != 'function' ? v=>v : resolvedCallback
    rejectedCallback = typeof rejectedCallback != 'function' ? v=>v : rejectedCallback

    return new MyPromise((resolve, reject) => {
      this.resolveFun.push((val) => {
        try {
          let x = resolvedCallback(val)
          console.log("=====RWSOLVE:", resolve)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      })

      this.rejectFun.push((val) => {
        try {
          let x = rejectedCallback(val)
          x instanceof MyPromise ? x.then(resolve, reject) : reject(x)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  static all(PromiseArr) {
    let result = []
    let count = 0
    return new MyPromise((resolve, reject) => {
      for(let i = 0; i < PromiseArr.length; i++) {
        Promise.resolve(PromiseArr[i]).then(
          (res) => {
            count ++
            result.push(res)
            
            if(count == PromiseArr.length) {
              resolve(result)
            }
          },
          (err) => {
            reject(err)
          }
        )
      }
    })
  }

  static race(PromiseArr) {
    return new MyPromise((resolve, reject) => {
      for(let i = 0; i < PromiseArr.length; i++) {
        Promise.resolve(PromiseArr[i]).then(
          (res) => {
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        )
      }
    })
  }

  static cancelPromise(Promise) {
    let obj = {}
    let p = new MyPromise((resolve, reject) => {
      obj.resolve = resolve
      obj.reject = reject
    })

    obj.promise = MyPromise.race([p, Promise])
    return obj
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  console.log("myPromise")
  setTimeout(() => {
    resolve(123)
  }, 1000);
})
myPromise.then(res => {
  console.log("res:", res)
  return new MyPromise((resolve) => {
    console.log("return myPromise")
    resolve('return myPromise')
  })
}).then(res => {
  console.log('sss:', res)
})

let p1 = new MyPromise((resolve)=> {
  resolve(1)
})
let p2 = new MyPromise((resolve)=> {
  resolve(2)
})
let p3 = new MyPromise((resolve)=> {
  resolve(3)
})

// MyPromise.all([p1,p2,p3]).then(res => { console.log("resAll:", res)})

// MyPromise.race([p1,p2,p3]).then(res => { console.log("resRace:", res)})

let cancel = MyPromise.cancelPromise(new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(12345)
  }, 5*1000);
}))

cancel.promise.then(res => {
  console.log(res,'=======')
})

setTimeout(() => {
  cancel.resolve('拦截')
}, 2*1000);



// let p11 = new Promise((resolve)=> {
//   setTimeout(() => {
//     resolve(1)
//   }, 1000);
// })
// let p22 = new Promise((resolve)=> {
//   setTimeout(() => {
//     resolve(2)
//   }, 2000);
// })
// let p33 = new Promise((resolve)=> {
//   setTimeout(() => {
//     resolve(3)
//   }, 3000);
// })

// Promise.race([p11, p22, p33]).then(res => {
//   console.log("Promise Test Race:", res)
// })

