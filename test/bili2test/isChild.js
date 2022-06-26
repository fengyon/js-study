const isChild = (treeA, treeB) => (!treeA && !treeB)
  ? true
  : (!treeA || !treeB)
    ? false
    : (treeA.val === treeB.val
      && (isChild(treeA.left, treeB.left)
        && isChild(treeA.right, treeB.right))
    )
    || isChild(treeA.left, treeB)
    || isChild(treeA.right, treeB) // **，这里需要继续判断是否为left或者right的子结构节点
console.log(isChild({
  left: { left: { val: 1, right: { right: { val: 5 } } } },
  right: { right: { val: 1 } },
  val: 1
}, { val: 1, right: { right: { val: 5 } } }))