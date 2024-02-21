



const url = [{
  index: 1,
  data: 1
},{
  index: 2,
  data: 2
},{
  index: 3,
  data: 3
},{
  index: 4,
  data: 4
},{
  index: 5,
  data: 5
},{
  index: 6,
  data: 6
},{
  index: 7,
  data: 7
},]
function fetch(url) {
  return new Promise((resolve, reject) => {
    resolve({
      data: url,
      success: 1
    })
    // if(url.data % 2) {
    //   resolve({
    //     data: url,
    //     success: 1
    //   })
    // } else {
    //   reject({
    //     data: url,
    //     success: 0
    //   })
    // }
  })
}
function ControlCount(urls, limit) {
  return new Promise((resolve, reject) => {
    if(urls.length == 0) resolve([])
    let maxCount = 0                //  当前执行了的数量
    let result = []                 //  结果数组
    let errorUrls = []              //  执行错误需要重传的数组
    let errorTime = []              //  执行错误次数
    async function request() {

      while((urls.length || errorUrls.length)) {
        if(maxCount < limit && maxCount >= 0) {
          let url = urls.length ? urls.shift() : errorUrls.shift()
          maxCount ++
          try {
            const res = await fetch(url.data)
            result[url.index] = res
          } catch (error) {
            if(errorTime[url.index] > 1) {
              throw Error('ERRRORR')
            }
            result[url.index] = error
            errorUrls.push({
              index: url.index,
              data: error.data
            })
            errorTime[url.index] > 0 ? errorTime[url.index]++ : errorTime[url.index] = 1
          } finally {
            maxCount --
            await request()
          }
        }
      }
    }

    let times = Math.min(urls.length, limit)

    for(let time =0 ; time < times; time ++) {
      request()
    }
  })
}
ControlCount(url,3)