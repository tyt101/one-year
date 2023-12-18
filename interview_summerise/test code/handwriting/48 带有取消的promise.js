function withCancel(originPromise) {
  let canceled = false
  let cancel = () => {}


  const cancelPromise = new Promise((resolve, reject) => {
    canceled = true
    cancel = (e) => {
      reject(e)
    } 
  })


  const groupPromise = Promise.race([originPromise, cancelPromise])
  .catch(e => {
    if(canceled) {
      console.log('手动取消')
      return new Promise(() => {})
    } else {
      return Promise.reject(e)
    }
  })

  return Object.assign(groupPromise, {cancel})
}

const p = new Promise((resolve) => {
  setTimeout(() => {
    resolve('ppp')
  }, 5*1000);
})
const withCancelP = withCancel(p)

withCancelP.then(res => {console.log(res)})

setTimeout(() => {
  withCancelP.cancel()
}, 2*1000);