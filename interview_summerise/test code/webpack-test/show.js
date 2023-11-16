// 操作 DOM 元素，把 content 显示到网页上
function show(content) {
  window.document.getElementById('app').innerText = 'Hello11sssd11,' + content;
}
const bianliang = {
  aaa: 224
}
// 通过 CommonJS 规范导出 show 函数
module.exports = {
  show,
  bianliang,
};