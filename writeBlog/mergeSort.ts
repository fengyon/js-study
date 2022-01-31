type compareType = (a?: any, b?: any) => number;
type toMergeType = (
  target: unknown[],
  compare: compareType,
  arr1: unknown[],
  arr2: unknown[]
) => unknown[];
const toMerge: toMergeType = (target, compare, arr1, arr2) => {
  let i1 = 0,
    i2 = 0,
    l1 = arr1.length,
    l2 = arr2.length;
  // 取两个子数组中较小的一个元素，相等则取第一个子数组中的元素
  while (i1 < l1 && i2 < l2)
    target[i1 + i2] = compare(arr1[i1], arr2[i2]) > 0 ? arr2[i2++] : arr1[i1++];
  // 如果哪个子数组的元素还没有取完，则取出放入合入数组中
  while (i1 < l1) target[i1 + i2] = arr1[i1++];
  while (i2 < l2) target[i1 + i2] = arr2[i2++];
  return target;
};
const mergeSort = (arr: unknown[], compare: compareType): unknown[] => {
  const mid: number = Math.floor(arr.length / 2);
  // 如果数组为空数组或者元素只有一个 则直接返回即可
  return mid < 1
    ? arr
    : toMerge(
        arr,
        compare,
        mergeSort(arr.slice(0, mid), compare),
        mergeSort(arr.slice(mid), compare)
      );
};
// 简单测试方法，对随机数组进行排序，排序结果与array.prototype.sort的排序结果作对比，一致则排序正确
((
  mySort: (a: unknown[], b: compareType) => unknown[],
  arrLength: number = 1000,
  max: number = 1000
) => {
  const getRandomArr = (len: number): number[] => {
    let arr: number[] = [],
      i = 0;
    while (i < len) arr[i++] = Math.floor(Math.random() * max) / 10;
    return arr;
  };
  const isEqual = (arr1: unknown[], arr2: unknown[]): boolean =>
    arr1.length === arr2.length &&
    arr1.every((item, index) => item === arr2[index]);
  const toTest = (arr: number[]): void => {
    const sortFun = (p: number, n: number): number => p - n;
    let sortedArr: number[] = [...arr].sort(sortFun);
    if (isEqual(sortedArr, mySort([...arr], sortFun))) {
      console.log(
        "排序正确",
        sortedArr.slice(0, 10).join(", ") +
          (sortedArr.length > 10 ? ", ..." : "")
      );
    } else {
      throw Error("排序出错");
    }
  };
  // 测试长度为 0,1,2, arrLength 的随机数组
  [0, 1, 2, arrLength].forEach((num) => toTest(getRandomArr(num)));
})(mergeSort);
export { mergeSort };
