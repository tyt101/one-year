
let arr = ['0.1.1', '2.3.3', '0.302.1', '4.3.5', '4.3.4.5']
//arrSorted  =>  ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']

arr.sort((a, b) => {
  let i = 0;
  const arr1 = a.split(".");
  const arr2 = b.split(".");
  console.log(arr1, arr2)
  while (true) {
    const s1 = arr1[i];
    const s2 = arr2[i];
    i++;
    if (s1 === undefined || s2 === undefined) {
      return arr2.length - arr1.length;
    }

    if (s1 === s2) continue;

    return s2 - s1;
  }
});

console.log([1,20,3,2,54].sort((a, b) => { return b - a}))