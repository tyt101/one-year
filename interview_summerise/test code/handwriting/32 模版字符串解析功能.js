let template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
let data = {
  name: "tyt",
  age: 18,
};
console.log(render(template, data))



function render(template, data) {
  let reg = /\{\{(\w+)\}\}/g
  return template.replace(reg, (match, key) => {
    return data[key]
  })
}

