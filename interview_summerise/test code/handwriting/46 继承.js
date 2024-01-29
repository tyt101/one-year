// 1. prototype
  function P() {
    this.play = [1,2,3]
  }

  P.prototype.getPName = function(){
    return this.play
  }

  function C() {}

  C.prototype = new P()

  // problem fix mixtured
  /**
   * 为什么 c2.getPName() 输出的数组中包含 'c1'？
      原因是你将 C 的原型设置为 P 的一个新实例。
      这意味着 C 的所有实例（如 c1 和 c2）共享同一个 play 数组（它们实际上都是从 P 的实例上继承的同一个数组）。
      因此，当你修改 c1.play 时，你实际上也在修改 c2.play，因为它们都是指向同一个数组的引用。
   */
  const c1 = new C() 
  c1.play.push('c1')
  const c2 = new C()
  console.log(c2.getPName())

// 2. constuctor func

  function P1() {
    this.play = [1,2,3]
  }
  P.prototype.getPName = function() {
    return this.play
  }

  function C1() {
    P1.call(this)
    this.c1 = 123
  }

  const c11 = new C1()
  c11.play.push('c11')
  console.log(c11)
  const c12 = new C1()
  console.log(c12)
  // problem: can't visite prototype method
  // console.log(c11.getPName())



// 3. constuctor + prototype

  function P2() {
    this.play = [1,2,3]
    console.log("I'm called")
  }

  P2.prototype.getPName = function() {
    return this.play
  }

  function C2() {
    P2.call(this)
  }

  C2.prototype = new P2()
  C2.prototype.constuctor = C2

  // probleme: P2 is called twice.
  const c21 = new C2() // I'm called I'm called


// 4. prototype way
  const P3 = {
    play: [1,2,3],
    name: 'P3',
    getName: function(){
      return this.name
    }
  }
  
  // problem: fix mixture , same as prototype
  // c31.__proto__ => P3
  // c32.__proto__ => p3
  const c31 = Object.create(P3)
  c31.play.push('c31')
  const c32 = Object.create(P3)
  console.log(c32.play)


// 5. Parasitic inheritance

  const P4 = {
    play: [1, 2, 3],
    name: 'P4',
    getName: function(){
      return this.name
    }
  }

  function creator(obj) {
    const newObj = Object.create(obj)

    newObj.xxx = function() {
      console.log('我是扩展的')
    }
  }
  // problem: can't use it repeatly

  const c41 = creator(P4)



// 6. Parasitic association
function P5() {
  this.play = [1,2,3]
  this.name = 'P5'
  console.log("I'm called")
}
P5.prototype.getPPlay = function() {
  return this.play
}

function C5 () {
  P5.call(this)
  this.name = 'C5'
}

C5.prototype = Object.create(P5.prototype)
C5.prototype.constuctor = C5

const c51 = new C5()    // I'm called
c51.play.push('c51')
const c52 = new C5()    // I'm called
console.log(c52.getPPlay())     // [ 1, 2, 3 ]
