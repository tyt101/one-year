// 发布者 
class Publisher {
  constructor() {
    this.observers = []
  }
  add(observe) {
    console.log('publisher add people')
    this.observers.push(observe)
  }
  remove(observe) {
    console.log('publisher remove peoples')
    this.observers.forEach((item, index) => {
      if(item == observe) {
        this.observers.splice(index, 1)
      }
    })
  }
  notify() {
    console.log('publisher notify all')
    this.observers.forEach(item => {
      item.update(this)
    })
  }
}

// 订阅者
class Observer {
  constructor() {

  }

  update() {
    console.log('observer has been updated')
  }
}

// 具体发布者
class TextPublisher extends Publisher {
  constructor() {
    super()
    this.prText = null
  }

  getText() {
    return this.prText
  }
  setText(val) {
    this.prText = val
    this.notify()
  }
}

// 具体订阅者
class TextObserver extends Observer {
  constructor(name) {
    super()
    this.name = name
    this.prText = null
  }

  update(publisher) {
    console.log('textObserver update', this.name)
    this.prText = publisher.getText()
    this.work()
  }

  work() {
    const text = this.prText
    console.log('start work', text)
  }
}

const ob1 = new TextObserver('A:')
const ob2 = new TextObserver('B:')
const ob3 = new TextObserver('C:')

const pub = new TextPublisher()
pub.add(ob1)
pub.add(ob2)
pub.add(ob3)

pub.setText('1111111111')