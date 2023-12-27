const { createApp, ref, nextTick } = Vue

createApp({
  setup() {
    const num = ref(0)
    const arrRef = ref(null)
    const arr = ref([1,2,3])

    const addNum = () => { 
      for(let i = 0; i < 100; i++) {
        num.value++
      }
      }

      const addArr = () => {
      arr.value.push(4)

      // nextTick包裹下可以获取到4的p了
      nextTick(() => {
        console.log(arrRef.value)
        return 1
      }).then(res => {
        console.log('===========:', res)
      })
      }
    return {
      num,
      arr,
      arrRef,
      addNum,
      addArr,
    }
  }
}).mount('#app')