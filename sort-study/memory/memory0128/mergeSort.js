let mergeDep = 0,
  maxDepth = 0;
function toMerge(target, compare, arr1, arr2) {
  let i1 = 0,
    i2 = 0,
    l1 = arr1.length,
    l2 = arr2.length;
  while (i1 < l1 && i2 < l2)
    target[i1 + i2] = compare(arr1[i1], arr2[i2]) > 0 ? arr2[i2++] : arr1[i1++];
  while (i1 < l1) target[i1 + i2] = arr1[i1++];
  while (i2 < l2) target[i1 + i2] = arr2[i2++];
  return target;
}
function mergeSort(arr, compare) {
  mergeDep++; // 执行的时候，栈深度+1
  const mid = Math.floor(arr.length / 2);
  if (mergeDep > maxDepth) maxDepth = mergeDep; // 记录最大的栈深度
  let result =
    mid < 1
      ? arr
      : toMerge(
        arr,
        compare,
        mergeSort(arr.slice(0, mid), compare),
        mergeSort(arr.slice(mid), compare)
      );
  mergeDep--; // 执行完毕后，栈深度-1
  return result;
}
((mySort, arrLength = 1000000, max = 1000) => {
  const getRandomArr = (len) => {
    let arr = [],
      i = 0;
    while (i < len) arr[i++] = Math.floor(Math.random() * max) / 10;
    return arr;
  };
  const isEqual = (arr1, arr2) =>
    arr1.length === arr2.length &&
    arr1.every((item, index) => item === arr2[index]);
  const toTest = (arr) => {
    const sortFun = (p, n) => p - n;
    let sortedArr = [...arr].sort(sortFun);
    if (isEqual(sortedArr, mySort([...arr], sortFun))) {
      console.log(
        "排序正确",
        `最大深度:${maxDepth}`,
        sortedArr.slice(0, 10).join(", ") +
        (sortedArr.length > 10 ? ", ..." : "")
      );
    } else {
      throw Error("排序出错");
    }
  };
  [0, 1, 2, arrLength].forEach((num) => toTest(getRandomArr(num)));
})(mergeSort);
