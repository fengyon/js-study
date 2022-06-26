/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var insertionSortList = function (head) {
  const root = { next: head };
  let current = root.next, sortedMax = 0, i = 0;
  let sortCur = root, temp;
  while (current && current.next) {
    console.log(current)
    i = 0
    sortCur = root
    while (sortCur.next && i < sortedMax) {
      if (sortCur.next.val > current.val) break;
      i++
      sortCur = sortCur.next
    }
    if (i !== sortedMax) {
      temp = current.next
      current.next = temp.next
      temp.next = sortCur.next.next
      sortCur.next = temp
    }
    current = current.next
    sortedMax++
  }
  return root.next
};
const head = { val: 1, next: { val: -1, next: { val: 2, next: null } } }
console.log(insertionSortList(head))