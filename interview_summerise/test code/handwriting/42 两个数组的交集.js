function intersect(nums1, nums2) {
  let res = []
  let index = -1
  for(let i = 0; i < nums1.length; i++) {
    if((index = nums2.indexOf(nums1[i]) >= 0)) {
      nums2.splice(index, 1)
      res.push(nums1[i])
    }
  }
  return res
}

function intersect1(nums1, nums2) {

  nums1.sort((a, b) => a-b)
  nums2.sort((a, b) => a-b)
  let len1 = nums1.length
  let len2 = nums2.length
  let curI = 0, curJ = 0
  let res = []
  while(curI < len1 && curJ < len2) {
    if(nums1[curI] == nums2[curJ]) {
      res.push(nums1[curI])
      curI ++
      curJ ++
    } else if(nums1[curI] > nums2[curJ]) {
      curJ ++
    } else {
      curI ++
    }
  }
  return res
}

const n1 = [1, 2, 2, 1];
let n2 = [2, 2];

let m1 = [4, 9, 5];
let m2 = [9, 4, 9, 8, 4];




console.log(intersect1(n1, n2)); // [2,2]

console.log(intersect1(m1, m2)); // [4, 9]


console.log(intersect(n1, n2)); // [2,2]

console.log(intersect(m1, m2)); // [4, 9]