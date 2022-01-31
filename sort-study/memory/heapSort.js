const swap = (arr, i1, i2) => {
    const temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
    return arr;
}
const moveMaxToTop = (heap, compare, top, end) => {
    let child = top * 2 + 1;
    while (child < end) {
        if (child + 1 < end && compare(heap[child], heap[child + 1]) < 0) child++;
        if (compare(heap[top], heap[child]) < 0) {
            swap(heap, top, child);
            top = child;
            child = top * 2 + 1;
        } else {
            break;
        }
    }
    return heap;
}
const transToMaxHeap = (arr, compare) => {
    let top = Math.floor(arr.length / 2), length = arr.length;
    while (top > -1) moveMaxToTop(arr, compare, top--, length);
    return arr;
}
const sortMaxHeap = (maxHeap, compare) => {
    let end = maxHeap.length - 1;
    const topRoot = 0;
    while (end > topRoot) {
        swap(maxHeap, topRoot, end);
        moveMaxToTop(maxHeap, compare, topRoot, end--);
    }
    return maxHeap;
}
const heapSort = (arr, compare) => {
    transToMaxHeap(arr, compare);
    return sortMaxHeap(arr, compare);
}
module.exports = heapSort;