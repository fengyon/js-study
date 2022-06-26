var exist = function (board, word) {
  const temp = {}
  board.forEach((arr, i) => {
    arr.forEach((code, j) => {
      if (temp[code]) {
        temp[code].push({ i, j })
      } else {
        temp[code] = [{ i, j }]
      }
    })
  })
  let findLimit = board.length * board[0].length, prePos;
  let codeIndexs = [];
  while (findLimit > 0) {
    if (!Array.prototype.some.call(word, (code) => {
      // console.log(JSON.stringify(temp, null, 2))
      if (temp[code].length > 0) {
        const curPos = temp[code].shift();
        if (prePos) {
          if (Math.abs(prePos.i - curPos.i) <= 1
            && Math.abs(prePos.j - curPos.j) <= 1) {
            // 有可能是对的
            prePos = curPos
            return false
          } else {
            prePos = null
            return true
          }
        } else {
          prePos = curPos
          return false // 结束此次，下一个再来
        }
      } else {
        codeIndexs.forEach((item, index) => {
          temp[word[index]].splice(item, 1);
          // if(temp[word[in]])
        })
      }
    })) return true;
  }
  return false
};
let r = exist([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], 'ABCCED')
console.log(r)