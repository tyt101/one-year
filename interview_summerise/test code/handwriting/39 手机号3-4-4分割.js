// 11位手机号

const splitMobile = (mobile, format = "-") => {
  // 匹配一个空字符'', 它后面的数字是4的倍数时被匹配
  return String(mobile).replace(/(?=(\d{4})+$)/g, format);
};

console.log(splitMobile(12345678911)); // 123-4567-8911

// 适合11位以内的分割
const splitMobile2 = (mobile, format = "-") => {
  return String(mobile)
    .replace(/(?<=(\d{3}))/, format)
    .replace(/(?<=([\d\-]{8}))/, format)
  };
console.log(splitMobile2(12433414343)); // 123-4567-8911
// .replace(/(?<=(\d{4}))-/, '')