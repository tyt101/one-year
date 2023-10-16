// 1.
class Person {
  static instance
  constructor(name) {
    if (Person.instance) {
      return Person.instance
    } else {
      Person.instance = this
    }
    this.name = name
    return Person.instance
  }
}

const p = new Person('tyt')
console.log("ppp:", p)                // ppp: Person { name: 'tyt' }


const p1 = new Person('tyt111')
console.log("ppp:", p1)               // ppp: Person { name: 'tyt' }


// 2.  推荐√
class Person {
  constructor(name) {
    this.name = name
  }
}

const singleInstance = (fn) => {
  let instance

  return function (...args) {
    if (!instance) {
      instance = new fn(...args)
    }
    return instance
  }
}

const person = singleInstance(Person)

const p = new person('tyt_p')
const p1 = new person('tyt_p1')

console.log("ppp:", p)
console.log("ppp:", p1)
