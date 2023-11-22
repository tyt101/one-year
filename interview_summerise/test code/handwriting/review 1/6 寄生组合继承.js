function Person (name) {
  this.name = name

  this.getP = () => {
    console.log("========NAME:", this.name)
  }
}

Person.prototype.getPName = function() {
  return this.name
}

function Child (name, age) {
  Person.call(this)
  this.name = name
  this.age = age
}



Child.prototype = Object.create(Person.prototype)
Child.prototype.constructor = Child
Child.prototype.getCName = function() {
  return this.name + '/' + this.age
}
const c = new Child('tyt', 34)

console.log("==========:", c.getCName())
console.log("==========:", c.getPName())
c.getP()