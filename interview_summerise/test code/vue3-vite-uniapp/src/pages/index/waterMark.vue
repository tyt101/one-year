<template>
  <div :style="overlapStyle">
    <slot />
    <div
      class="bit-mark-wrap"
      :style="{
        'background-image': `url(${base64URL})`,
        'background-size': `${gapX}px ${gapY}px`,
      }"
    />
    <canvas
      ref="canvas"
      class="bit-watermark-canvas"
      width="450"
      height="320"
    />
  </div>
</template>

<script>
/**
 * 背景水印组件
 */
export default {
  name: 'Watermark',
  props: {
    text: String,
    overlapStyle: {
      type: String,
      default() {
        return ''
      },
    },
    width: {
      type: Number,
      default() {
        return 120
      },
    },
    height: {
      type: Number,
      default() {
        return 160
      },
    },
    fontSize: {
      type: Number,
      default() {
        return 16
      },
    },
    fontColor: {
      type: String,
      default() {
        return '#ccc'
      },
    },
    rotate: {
      type: Number,
      default() {
        return -22
      },
    },
    gapX: {
      type: Number,
      default() {
        return 320
      },
    },
    gapY: {
      type: Number,
      default() {
        return 222
      },
    },
  },
  data() {
    return {
      base64URL: '',
    }
  },
  mounted() {
    this.drawInit()
  },
  methods: {
    drawInit: function () {
      const {
        text,
        width,
        height,
        fontSize,
        fontColor,
        rotate,
      } = this
      const ctx =
        this.$refs.canvas.getContext(
          '2d',
        )
      ctx.width = width
      ctx.height = height
      ctx.font = `${fontSize}px normal`
      ctx.fillStyle = fontColor
      ctx.rotate(
        (rotate * Math.PI) / 180,
      )
      ctx.fillText(text, 0, height)
      // 转base64图片
      this.base64URL =
        this.$refs.canvas.toDataURL(
          'image/png',
        )
    },
  },
}
</script>

<style lang="scss" type="text/css">
.bit-watermark-canvas {
  position: fixed;
  bottom: -1000px;
  right: -1000px;
}

.bit-mark-wrap {
  z-index: 9;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-size: 320px;
  pointer-events: none;
  background-repeat: repeat;
}
</style>
