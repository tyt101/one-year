// add
// subtract
// multiply
// divide
console.log('====================================================ADD===============================================================')
function plus(num1, num2) {
  let r1, r2, m;
    try {
       r1 = num1.toString().split(".")[1].length
   } catch (e) {
       r1 = 0
   }  
   try {
       r2 = num2.toString().split(".")[1].length
   } catch (e) {
       r2 = 0
   }
   m = Math.pow(10, Math.max(r1, r2))
   return (num1 * m + num2 * m) / m
}

console.log(plus('2313.32111','222.11111'))
console.log(plus(23133230, 2221111))
console.log(plus(102,345))


console.log('====================================================Subtract===============================================================')
function subtract(num1, num2) {
    let r1, r2, m, n;
    try {
        r1 = num1.toString().split('.')[1].length
    } catch (error) {
        r1 = 0
    }
    try {
        r2 = num2.toString().split('.')[1].length
    } catch (error) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    n = Math.max(r1, r2)
    return ((num1 * m - num2 * m) / m).toFixed(n)
}

console.log(subtract('2313.32111','222.11111'))
console.log(subtract(23133230, 2221111))
console.log(subtract(102,345))


console.log('====================================================Multiply===============================================================')
function multiply(num1, num2) {
    let r1 , r2, m=0;
    r1 = num1.toString()
    r2 = num2.toString()
    try {
        m += r1.split('.')[1].length
    } catch (error) {
        m += 0
    }

    try {
        m += r2.split('.')[1].length
    } catch (error) {
        m += 0
    }

    return (Number(r1.replace('.','')) * Number(r2.replace('.',''))) / Math.pow(10, m)
}


console.log(multiply(10,23))
console.log(multiply(1011,23))
console.log(multiply('1011.1','23.5'))

console.log('====================================================Divide===============================================================')

function divide(num1, num2) {
    let r1, r2, m;

    try {
        r1 = num1.toString().split('.').length
    } catch (error) {
        r1 = 1
    }

    try {
        r2 = num2.toString().split('.').length
    } catch (error) {
        r2 = 1
    }
    m = Math.pow(10, Math.max(r1, r2))
    return multiply(num1, m) / multiply(num2, m)
}

console.log(divide('10','2'))
console.log(divide(10,23))
console.log(divide(1011,23))
console.log(divide('1011.1','23.5'))