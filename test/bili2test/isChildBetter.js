const isChild = (treeA, treeB) => {
  return false
}
console.log(isChild({
  left: { left: { val: 1, right: { right: { val: 5 } } } },
  right: { right: { val: 1 } },
  val: 1
}, ({ val: 1, right: { right: { val: 1 } } }).right))