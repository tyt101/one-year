function getItemById(arr, id) {
  //...
  let item = null
  arr.forEach(cur => {
    try {
      if(cur.id === id) {
        item = cur
        throw Error()
      }
    } catch (error) {
      console.log(error, "循环已经跳出")
    }
  })
  return item
}

let arr = [{
  id: 1,
  name: '1',
},{
  id: 2,
  name: '2',
},{
  id: 3,
  name: '3',
},{
  id: 4,
  name: '4'
}]

console.log(getItemById(arr, 3))