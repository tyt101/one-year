<template>
  <WaterMark
    overlap-style="height: 100%;"
    :text="'张三130xxxx0000'"
  >
    <view class="content">
      <image
        src="/static/logo.png"
        class="logo"
      />
      <view class="text-area">
        <text class="title">
          {{ title }}
        </text>
      </view>
    </view>
  </WaterMark>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WaterMark from './waterMark.vue'
const title = ref('Hello')

const push_data = new EventSource('xxx')
push_data.onopen = function (event) {
  console.log('链接城管')
}

push_data.onmessage = function (event) {
  try {
    console.log(event)
  } catch (e) {
    console.log(e)
  }
}
push_data.onerror = function (error) {
  console.log(error)
}

new ReadableStream({
  async start(controller) {},
})
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
