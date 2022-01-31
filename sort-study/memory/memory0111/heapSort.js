const swap = (arr, i1, i2) => {
    const temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
    return arr;
}
const moveMaxToTop = (arr, compare, top, end) => {
    let child = 2 * top + 1;
    while (child < end) {
        if (child + 1 < end && compare(arr[child], arr[child + 1]) < 0) child++;
        if (compare(arr[top], arr[child]) < 0) {
            swap(arr, top, child);
            top = child;
            child = 2 * top + 1;
        } else {
            break;
        }
    }
}
const transToMaxHeap = (arr, compare) => {
    let top = Math.round(arr.length / 2), length = arr.length;
    while (top > -1) moveMaxToTop(arr, compare, top--, length);
    return arr;
}
const sortMaxHeap = (maxHeap, compare) => {
    let end = maxHeap.length - 1;
    while (end > 0) {
        swap(maxHeap, 0, end);
        moveMaxToTop(maxHeap, compare, 0, end--);
    }
    return maxHeap;
}
const heapSort = (arr, compare) => {
    transToMaxHeap(arr, compare);
    return sortMaxHeap(arr, compare);
}

// var elements = [3, 1, 5, 7, 2, 4, 9, 6, 10, 8];
// console.log('before: ' + elements);
// heapSort(elements, (pre, cur) => pre - cur);
// console.log(' after: ' + elements);
module.exports = heapSort;