/**
* 实现Storage，使得该对象为单例，
* 基于 localStorage 进行封装。
* 实现方法 setItem(key,value) 和 getItem(key)。
*/
 
class Storage {
  static getInstance() {
    if(!Storage.instance) {
      Storage.instance = new Storage()
    }
    return Storage.instance
  }

  setItem(key, val) {
    localStorage.setItem(key, val)
  }

  getItem(key) {
    return localStorage.getItem(key)
  }
}


const s1 = Storage.getInstance()
const s2 = Storage.getInstance()

s1.setItem('tyt',111)

console.log(s2.getItem('tyt'))
console.log(s1.getItem('tyt'))


/**
 * 分割
 */

console.log("============================分======割================================")

/**
 * 实现一个全局唯一的Modal弹框
 */

const Model = (function(){
  let model = null
  return function() {
    if(!model) {
      model = document.createElement('div')
      model.innerHTML = '我是一个单例模态框'
      model.id = 'model'
      model.style.display = 'none'
      document.body.appendChild(model)
    }
    return model
  }
})()


document.getElementById('open').addEventListener('click', function() {
  const model = new Model()
  model.style.display = 'block'
})


document.getElementById('close').addEventListener('click', function() {
  const model = new Model()
  if(model)
    model.style.display = 'none'
})