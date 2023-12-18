// LRU：最近最久未使用原则
// keep-alive里面使用到了这个算法！！！
class LRUCACHE {
  constructor(max) {
    this.max = max
    this.queue = new Map()
  }

  put(key, val) {
    let len = this.queue.length
    if(len >= this.max) {
      this.queue.delete(this.queue.values().next().value)
    } else if(this.queue.has(key)) {
      this.queue.delete(key)
    }
    this.queue.set(key, val)
  }

  get(key) {
    if(this.queue.has(key)) {
      let val = this.queue.get(key)
      this.queue.delete(key)
      this.queue.set(key, val)
      return val
    }
    return -1;
  }
}