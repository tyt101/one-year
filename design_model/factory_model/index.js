class MobilePhoneFactory {
  createOS() {
    throw new Error('Abstract CreateOs')
  }
  createHardWare() {
    throw new Error('Abstract createHardWare')
  }
}


class OldStarFactory extends MobilePhoneFactory {
  createOS() {
    console.log("======================1")
  }
  createHardWare() {
    console.log("======================2")
  }
}

const myPhone = new OldStarFactory()
console.log(myPhone)