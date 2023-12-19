
// 执行babel index.js --out-file babel_test.js  可生成装饰器装饰后的babel_test.js


// 装饰器函数，它的第一个参数是目标类
function classDecorator(target) {
  target.hasDecorator = true
  return target
}
function observerCount(fnName) {
  return function (target, key) {
    let prev = target[key]
    Object.defineProperty(target, key, {
      set(next) {
        target[fnName](prev, next)
        prev = next
      }
    })
  }
}
function onClickDecorator(target, name, descriptor) {
  // target: Button.prototype
  // name: 修改的目标属性属性名
  // descriptor:
  console.log('=======',target,'====', name,'===', descriptor,'========')
  let originMethod = descriptor.value
  descriptor.value = function() {
    console.log('我是现在的逻辑', this.name111)
    this.name111 = 1234
    return originMethod.apply(this, arguments)
  }
  return descriptor
}
// 将装饰器“安装”到Button类上
@classDecorator
class Button {
  // Button类的相关逻辑


  // 装饰属性====有问题
  // @observerCount('onCountChange')
  // static count
  
  // onCountChange(prev, next) {
  //   console.log(">>>>prev:", prev)
  //   console.log(">>>>next:", next)
  // }
  constructor(name) {
    this.name111 = name
    this.human = 'name' + name
    
  }
  @onClickDecorator
  onClick() {
    console.log('我是Func原有逻辑')
  }
}

// 验证装饰器是否生效
const btn = new Button('aaa')
btn.onClick()
console.log(Button.count, '=========')
console.log('Button 是否被装饰了：', Button.hasDecorator)