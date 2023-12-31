// let cache = new LRUCache(2);       keepAlive中 用到了LRU
// cache.put(1, 1);
// cache.put(2, 2);
// console.log("cache.get(1)", cache.get(1))// 返回  1
// cache.put(3, 3);// 该操作会使得密钥 2 作废
// console.log("cache.get(2)", cache.get(2))// 返回 -1 (未找到)
// cache.put(4, 4);// 该操作会使得密钥 1 作废
// console.log("cache.get(1)", cache.get(1))// 返回 -1 (未找到)
// console.log("cache.get(3)", cache.get(3))// 返回  3
// console.log("cache.get(4)", cache.get(4))// 返回  4

class LRUCache {
  constructor(max) {
    this.max = max
    this.queue = new Map()
  }

  put(key, val) {
    // 删除第一个元素
    if(this.queue.size >= this.max) {
      this.queue.delete(this.queue.keys().next().value)
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
    return -1
  }
}
let cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log("cache.get(1)", cache.get(1))// 返回  1
cache.put(3, 3);// 该操作会使得密钥 2 作废
console.log("cache.get(2)", cache.get(2))// 返回 -1 (未找到)
cache.put(4, 4);// 该操作会使得密钥 1 作废
console.log("cache.get(1)", cache.get(1))// 返回 -1 (未找到)
console.log("cache.get(3)", cache.get(3))// 返回  3
console.log("cache.get(4)", cache.get(4))// 返回  4