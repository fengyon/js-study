const stack = [];
const toSort = (arr, compare, low, high) => {
    if (low >= high) return arr;
    const temp = arr[low], left = low, right = high;
    while (low < high) {
        while (low < high && compare(temp, arr[high]) < 1) high--;
        arr[low] = arr[high];
        while (low < high && compare(temp, arr[low]) > -1) low++;
        arr[high] = arr[low];
    }
    arr[low] = temp;
    stack.push(() => toSort(arr, compare, left, low - 1));
    stack.push(() => toSort(arr, compare, low + 1, right));
}
const quickSort = (arr, compare) => {
    stack.push(() => toSort(arr, compare, 0, arr.length - 1));
    while (stack.length > 0) {
        stack.pop()();
        console.log(stack.length);
    }
    return arr;
};
const getRandomArr = () => {
    const length = 100000 * (1 + 9 * Math.random());
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 100000))
    }
    return arr;
}
const arr = getRandomArr();
quickSort(arr.sort((pre,cur)=>pre-cur),(pre,cur)=>pre-cur);
module.exports = quickSort;