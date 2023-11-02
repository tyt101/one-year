function MyNew(fn, ...args) {
  let obj = {}
  obj.__proto__ = fn.prototype
  let result = fn.call(obj,...args)
  return typeof result == 'object' || typeof result == 'function' ? result : obj
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function() {
  console.log(this.age);
};
let p1 = MyNew(Person, "lihua", 18);
console.log(p1.name);
console.log(p1);
p1.say();