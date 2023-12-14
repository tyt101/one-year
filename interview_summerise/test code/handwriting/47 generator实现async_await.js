function* generator() {
  console.log(yield Promise.resolve('1'))
  console.log(yield Promise.resolve('2'))
  console.log(yield Promise.resolve('3'))
}

function run(content) {
  const gen = generator()

  return new Promise((resolve, reject) => {
    function _next(val) {
      try {
        const g = gen.next(val)
      } catch (error) {
        return reject(error)
      }
      if(g.done) return g.value
  
      g.value.then(val => {
        _next(val)
      })
    }
    // 第一次执行
    _next()
  })
}

run(generator)




// 