// add
// subtract
// multiply
// divide

function plus(num1, num2) {
  let r1, r2, m;
  try {
       r1 = num1.toString().split(".")[1].length
   } catch (e) {
       r1 = 0
   }    try {
       r2 = num2.toString().split(".")[1].length
   } catch (e) {
       r2 = 0
   }
   console.log(r1, r2)
   m = Math.pow(10, Math.max(r1, r2))    
   return (num1 * m + num2 * m) / m
}

console.log(plus(1265465689787.34334455675464554546543,5436546565434.565465444))