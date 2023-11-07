function isCyclic(obj) {
  let set = new Set()
  let detected = false

  const detect = (obj) => {
    if(!obj || typeof obj !== 'object') return 

    if(set.has(obj)) return (detected = true)

    set.add(obj)

    for(let o in obj) {
      if(obj.hasOwnProperty(o)) {
        detect(obj[o])
      }
    }
  }
  detect(obj)
  return detected
}
// 对象之间相互引用

let obj1 = { name: "gby1" };
let obj2 = { name: "gby2" };
// 对象1的属性引用了对象2
obj1.obj = obj2;
// 对象2的属性引用了对象1
obj2.obj = obj1;

let obj = { name: "gby1" };
// 对象的属性引用了对象本身
obj.child = obj;

let obj3 = {
  name: "gby",
  child: {},
};

obj3.child.obj = obj3.child;

let tempObj = {
  name: "gby",
};
let obj4 = {
  obj1: tempObj,
  obj2: tempObj,
};

console.log(isCyclic(obj));
console.log(isCyclic(obj1));
console.log(isCyclic(obj2));
console.log(isCyclic(obj3));
console.log(isCyclic(obj4));

console.log(isCyclic(1));
console.log(isCyclic("gby"));
console.log(isCyclic(Symbol("gby")));
