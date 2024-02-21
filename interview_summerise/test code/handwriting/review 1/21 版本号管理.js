let arr = ['0.1.1', '2.3.3', '0.302.1', '4.3.5', '4.3.4.5'];  
  
function sortArrNums(arr) {  
  return arr.sort((a, b) => {  
    const arrA = a.split('.').map(Number);  
    const arrB = b.split('.').map(Number);  
      
    const len = Math.max(arrA.length, arrB.length);  
  
    for (let i = 0; i < len; i++) {  
      const numA = arrA[i] || 0;  
      const numB = arrB[i] || 0;  
  
      if (numA < numB) {  
        return -1;  
      } else if (numA > numB) {  
        return 1;  
      }  
      // If numbers are equal, continue to next set of digits  
    }  
  
    // If no difference was found, return 0 (equal)  
    return 0;  
  });  
}  
  
console.log(sortArrNums(arr));