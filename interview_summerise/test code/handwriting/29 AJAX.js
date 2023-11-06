// 利用 XMLHttpRequest 手写 AJAX 实现

function ajax(url, method, isAsync) {
  return new Promise((resolve, reject) => {
    const xml = new XMLHttpRequest()
    xml.open(method, url, isAsync)
    xml.setRequestHeader('content-type','application/json')
    xml.onreadystatechange = function() {
      if(xml.readyState !== 4) return 

      if(xml.status == 200 || xml.status == 304) {
        resolve(xml.response)
      } else {
        reject(new Error(xml.responseText))
      }
    }
    xml.send(null)
  })
}