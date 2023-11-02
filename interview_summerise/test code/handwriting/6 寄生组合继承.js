// 寄生组合继承
function Parent(name) {
  this.name = name
  this.pppName = () => this.name
}

Parent.prototype.ppp1Name = function(){
  console.log("pppppppp")
}

function Child(name) {
  Parent.call(this)
  this.name = name
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
