/**
 *  将原始promise包装成带cancel方法的promise
 *  @param Promise 原始的promise
 *  @return Promise 包装后的promise
 * */
function withCancel(originalPromise){
  let cancel=()=>{}
  let isCancelled=false
  
  // 辅助的promise，在调用cancel之后该promise会立即reject
  const cancelPromise=new Promise((resolve, reject) => {
      cancel=e=>{
          isCancelled=true
          reject(e)
      }
  })

  // 包装后的promise，本质是Promise.race的返回值，Promise.race传参是原始的promise和辅助的promise
  const groupPromise=Promise.race([originalPromise,cancelPromise])
      .catch(e=>{
          // isCancelled标志位，表明用户是否主动触发cancel。如果是主动触发，不要抛出异常
          if(isCancelled){
              console.log('promise is cancelled')
              console.log(e)
              return new Promise(()=>{})
          }
          else return Promise.reject(e)
      })
  console.log('==groupPromise==:', groupPromise)
  let m = Object.assign(groupPromise, {cancel})
  console.log('m:', m)
  return m
}


const originalPromise=new Promise((resolve, reject) => {
  setTimeout(()=>resolve(5),3000)
})

const promiseWithCancel=withCancel(originalPromise)


setTimeout(()=>promiseWithCancel.cancel('Hi, this is a cancel message'),1000)
