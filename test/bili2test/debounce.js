function debounce(cb, delay) {
  let timer, firstRun = true, preResult;
  const fn = function () {
    if (firstRun) {
      firstRun = false
      preResult = cb.apply(this, arguments)
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      preResult = cb.apply(this, [...arguments, preResult])
    }, delay)
  }
  fn.cancel = () => timer && clearTimeout(timer)
  return fn
}
const click = debounce(() => console.log(1) || Math.random(), 1000);
setTimeout(click, 200)

setTimeout(click, 200)

setTimeout(click, 4000)
