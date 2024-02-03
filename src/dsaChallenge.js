function maxSumArray(arr) {
  let currMaxSum = arr[0],
    res = arr[0];

  for (let i = 1; i < arr.length; i++) {
    let newCurrMaxSum = arr[i] + currMaxSum;
    res = Math.max(res, newCurrMaxSum);
    currMaxSum = Math.max(arr[i], newCurrMaxSum);
  }
  return res;
}
console.log(maxSumArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
