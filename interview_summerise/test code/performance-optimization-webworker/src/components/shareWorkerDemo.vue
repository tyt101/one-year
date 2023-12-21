<template>
  <div class="share_worker">
    <button @click="startShareWorker">点击发送消息到共享线程中</button>
  </div>
</template>

<script>
import myShareWorker from 'sharedworker-loader!./myShareWorker.js'
export default {
  data() {
    return {
      datas: []
    }
  },
  methods: {
    startShareWorker() {
      const myWorker = new myShareWorker()
      console.log('Message posted to worker')
      myWorker.port.start()
      myWorker.port.postMessage('counter++')
      myWorker.port.onmessage = function (e) {
        console.log("Message received from worker");
        console.log('e.data',e);
      };
    }
  }
}
</script>

<style>

</style>