class SingleDog {
  show() {
    console.log("单例模式")
  }

  static getInstance() {
    if(!SingleDog.instance) {
      SingleDog.instance = new SingleDog()
    }
    return SingleDog.instance
  }
}


const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()
console.log(s1 === s2)