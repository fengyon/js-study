const swap = (arr, i1, i2) => {
    const temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
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
    return arr;
}
const transToMaxHeap = (arr, compare) => {
    let top = Math.floor(arr.length / 2), length = arr.length;
    while (top > -1) moveMaxToTop(arr, compare, top--, length);
    return arr;
}
const sortMaxHep = (arr, compare) => {
    let end = arr.length - 1;
    while (end > 0) {
        swap(arr, 0, end);
        moveMaxToTop(arr, compare, 0, end--);
    }
    return arr;
}
const heapSort = (arr, compare) =>
    sortMaxHep(transToMaxHeap(arr, compare), compare);

module.exports = heapSort;