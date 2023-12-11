<template>
  <div ref="list" :style="{height}" class="infinite-list-container" @scroll="scrollEvent($event)">
    <div ref="phantom" class="infinite-list-phantom"></div>
    <div ref="content" class="infinite-list">
      <div
        class="infinite-list-item"
        ref="items"
        :id="item._index"
        :key="item._index"
        v-for="item in visibleData"
      >
        <slot ref="slot" :item="item.item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //所有列表数据
    listData: {
      type: Array,
      default: () => []
    },
    //预估高度
    estimatedItemSize: {
      type: Number,
      required: true
    },
    //容器高度 100px or 50vh
    height: {
      type: String,
      default: "100%"
    }
  },
  data() {
    return {
      start: 0,
      end: 0,
      //可视区域高度
      screenHeight: 0,
    }
  },
  computed: {
    visibleCount() {
      return Math.ceil(this.screenHeight / this.estimatedItemSize)
    },
    _visibleData() {
      return this.listData.map((item, index) => {
        return {
          _index: `_${index}`,
          item,
        }
      })
    },
    visibleData() {
      return this._visibleData.slice(this.start, this.end)
    }
  },
  mounted() {
    this.screenHeight = this.$el.clientHeight

    this.start = 0

    this.end = this.start + this.visibleCount
  },
  created() {
    this.initPositions()
  },
  methods: {
    initPositions() {
      this.positions = this.listData.map((d, index) => ({
        index,
        height: this.estimatedItemSize,
        top: index * this.estimatedItemSize,
        bottom: (index + 1) * this.estimatedItemSize
      }));
    },
    getStartIndex(scrollTop) {
      return this.positions.find(item => item && item.bottom > scrollTop)
    },
    getEndIndex(scrollTop) {
      console.log(this.$el.clientHeight)
      return this.positions.find(item => {
        return item && item.bottom > scrollTop + this.$el.clientHeight
      })
    },
    setStartOffset() {
      let startOffset = this.start >= 1 ? this.positions[this.start - 1].bottom : 0
      this.$refs.content.style.transform = `translate3d(0,${startOffset}px,0)`;
    },
    updateItemsSize() {
      let nodes = this.$refs.items
      console.log("+++++++++++")
      nodes.forEach(node => {
        const { height } = node.getBoundingClientRect()
        console.log("+height:", height)
        let index = +node.id.slice(1);

        let oldHeight = this.positions[index].height

        let diffValue = oldHeight - height

        if(diffValue) {
          this.positions[index].height = height
          this.positions[index].bottom = this.positions[index].bottom - diffValue


          for(let m = index + 1; m < this.positions.length; m++) {
            this.positions[m].top = this.positions[m - 1].bottom
            this.positions[m].bottom = this.positions[m].bottom - diffValue
          }
        }
      })
    },
    scrollEvent() {
      let scrollTop = this.$refs.list.scrollTop

      this.start = this.getStartIndex(scrollTop).index

      this.end = this.getEndIndex(scrollTop).index + 1

      //此时的偏移量
      this.setStartOffset();
    }
  },
  updated() {
    this.$nextTick(() => {
      if(!this.$refs.items || !this.$refs.items.length) return
      this.updateItemsSize()

      let height = this.positions[this.positions.length - 1].bottom
      this.$refs.phantom.style.height = height + 'px'

      this.setStartOffset()
    })
  }
}
</script>


<style scoped>
.infinite-list-container {
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}

.infinite-list-item {
  padding: 5px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
  /* height:200px; */
}
</style>