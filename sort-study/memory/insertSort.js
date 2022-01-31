const insertSort = (arr, compare) => {
    let i = 1, j, temp;
    while (i < arr.length) {
        j = i;
        temp = arr[i];// arr[i] 会被上一个元素后移覆盖，所以需要缓存
        while (j > 0 && compare(arr[j - 1], temp) > 0) arr[j] = arr[--j];
        if (i !== j) arr[j] = temp;
        i++;
    }
    return arr;
}
// console.log(insertSort([0, 2, 3, 4, 2, 1, 2, 3 - 1, -9, 2, 30], (pre, cur) => pre - cur))
module.exports = {
    quickSort: insertSort,
    insertSort
}