function formatTrans(phone, format) {
  return (phone+"").replace(/(?=(\d{4})+$)/g, format)
}

console.log(formatTrans(12345678911, '-')); // 123-4567-

