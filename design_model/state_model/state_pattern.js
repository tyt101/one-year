

class MakeCoffee {
  constructor() {
    this.state = 'init'
    this.milk = 500
    this.xiangcao = 1000
    this.chocolate = 2000
  }
  stateToProcessor = {
    that: this,
    american() {
      console.log('咖啡现在的milk量为：', this.that.milk)
      console.log('咖啡现在的xiangcao量为：', this.that.xiangcao)
      console.log('咖啡现在的chocolate量为：', this.that.chocolate)
      console.log('我只吐黑咖啡');
    },
    latte() {
      this.american();
      console.log('加点奶');  
      this.that.milk-=100
      console.log('咖啡现在的milk量为：', this.that.milk)
      console.log('咖啡现在的xiangcao量为：', this.that.xiangcao)
      console.log('咖啡现在的chocolate量为：', this.that.chocolate)
    },
    vanillaLatte() {
      this.latte();
      console.log('再加香草糖浆');
      this.that.xiangcao-=100
      console.log('咖啡现在的milk量为：', this.that.milk)
      console.log('咖啡现在的xiangcao量为：', this.that.xiangcao)
      console.log('咖啡现在的chocolate量为：', this.that.chocolate)
    },
    mocha() {
      this.vanillaLatte();
      console.log('再加巧克力');
      this.that.chocolate-=100
      console.log('咖啡现在的milk量为：', this.that.milk)
      console.log('咖啡现在的xiangcao量为：', this.that.xiangcao)
      console.log('咖啡现在的chocolate量为：', this.that.chocolate)
    }
  }
  changeState(state) {
    this.state = state
    this.stateToProcessor[state]()
  }

}

const makrC = new MakeCoffee()
makrC.changeState('american')
makrC.changeState('latte')
makrC.changeState('vanillaLatte')
makrC.changeState('mocha')