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
            return arr;
        }
    }
    return arr;
}
const transToMaxHeap = (arr, compare) => {
    let top = Math.ceil(arr.length / 2), length = arr.length;
    while (top > -1) moveMaxToTop(arr, compare, top--, length);
    return arr;
}
const sortMaxHeap = (arr, compare) => {
    let end = arr.length - 1, rootTop = 0;
    while (end > 0) {
        swap(arr, rootTop, end);
        moveMaxToTop(arr, compare, rootTop, end--);
    }
    return arr;
}

const heapSort = (arr, compare) => {
    transToMaxHeap(arr, compare);
    return sortMaxHeap(arr, compare);
}
module.exports = heapSort;