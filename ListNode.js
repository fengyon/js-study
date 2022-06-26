
class ListNode {
    constructor(value, next = null) {
        this.value = value
        this.next = next
    }
    toString() {
        return JSON.stringify(this)
    }
}
class LinkedList {
    constructor() {
        this.length = 0
        this.head = null
    }
    getElementAt(position) {
        if (position < 0
            || position > this.length - 1) {
            return null
        } else {
            let current = this.head
            for (let i = 0; i < position; i++) {
                current = current.next
            }
            return current
        }
    }
    indexOf(value, isSame = (value, itemInNode) => value === itemInNode.value) {
        if (this.head) {
            let current = this.head
            let index = 0
            while (current) {
                if (isSame(value, current)) {
                    return index
                }
                current = current.next
                index++
            }
            return -1
        } else {
            return -1
        }
    }
    append(value) {
        if (this.head) {
            this.getElementAt(this.length - 1).next = new ListNode(value)
        } else {
            this.head = new ListNode(value)
        }
        this.length++
    }
    insert(position, value) {
        if (position < 1) {
            this.head = new ListNode(value, this.head)
        } else if (position > this.length - 1) {
            this.append(value)
            this.length--
        } else {
            let preNode = this.getElementAt(position - 1)
            preNode.next = new ListNode(value, preNode.next)
        }
        this.length++
    }
    removeAt(position) {
        if (position === 0) {
            let head = this.head
            if (this.head) {
                this.head = this.head.next
                this.length--
            }
            return head
        }
        if (position > 0 && position < this.length - 1) {
            let preNode = this.getElementAt(position - 1)
            let removeNode = preNode.next
            //因为postion - 1 > -1 && < this.length - 2 所以preNode.next 一定不等于null
            preNode.next = removeNode.next
            this.length--
            return removeNode
        } else {
            return null
        }
    }
    remove() {

    }
    toString() {
        return JSON.stringify(this)
    }
}
/* let linkedList = new LinkedList()
linkedList.append(1)
linkedList.append(2)
linkedList.append(3)
linkedList.append(4)
linkedList.insert(2, 2.5)
console.log(linkedList.toString())
console.log(linkedList.getElementAt(4).toString())
console.log(linkedList.indexOf(4)) */

/* linkedList.removeAt(4)
console.log(linkedList.toString()) */



function toExcelColums(...nums){
    var colums = []
    var result = []
    for(var i = 0;i<26;i++){
        colums.push(String.fromCharCode('A'.charCodeAt(0) + i))
    }
    for(var i = 0;i<nums.length;i++){
        var index = nums[i]
        var str = colums[index % 26] 
        if (index >= 26){
            index = nums[i] % 26
            str += colums[index]
        }
        result.push(str)
    }
    return result
}

console.log(toExcelColums(0,1,2,27))