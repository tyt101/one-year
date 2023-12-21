<template>
  <div>
    <button @click="getDate">点击getDate</button>
    <div v-for="(d, index) in datas" :key="index">
      <span>{{ d.title }}</span>
    </div>
  </div>
</template>

<script>

import { head } from './table';
import dataWorker from 'worker-loader!../worker/dataWorker.js'
export default {
  data() {
    return {
      datas: []
    }
  },
  methods: {
    getDate() {
      const worker = new dataWorker()
      worker.postMessage(head)

      worker.addEventListener('message', (e) => {
        worker.terminate()
        this.datas = e.data
      })
    }
  }
}
</script>

<style>

</style>