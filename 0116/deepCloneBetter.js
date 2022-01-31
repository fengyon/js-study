/**
 * @description: 克隆函数，对循环引用做了处理
 * @param value:any 需要克隆的值
 * @param needCircular?:boolean 是否需要克隆循环引用
 *
 * @return any 克隆好的值
 */
 const deepClone = (() => {
    //获取类型的函数，返回string或者Symbol用来用作对象的键
    const getType = (x) => Object.prototype.toString.call(x);
    let clonedMap = new Map();
    let saveCircular = false;
    let circularSet = new Set();
    const reset = () => {
      clonedMap = new Map();
      circularSet = new Set();
    };
    const needToClone = (value) => saveCircular || !circularSet.has(value);
    /**
     * @description: 流程化克隆，主要用来处理循环引用以及相同引用的问题
     * @param  {*} value 克隆的目标，原数据
     * @param  {*} willCloneValue 克隆数据存放的引用地址
     * @param  {Function?} cloneFun 克隆方法，需要传入克隆地址
     * @return {*} 克隆数据
     */
    const processClone = (value, willCloneValue, cloneFun) => {
      clonedMap.set(value, willCloneValue);
      saveCircular || circularSet.add(value);
      typeof cloneFun === "function" && cloneFun(willCloneValue);
      saveCircular || circularSet.delete(value);
      return willCloneValue;
    };
    const cloneFuns = {
      [getType({})]: (obj) =>
        processClone(obj, Object.create(obj.__proto__), (cloneObj) => {
          let ownKeys = Object.getOwnPropertyNames(obj);
          let ownEnumKeys = Object.keys(obj);
          ownKeys.forEach(
            (key) =>
              needToClone(obj[key]) &&
              Object.defineProperty(cloneObj, key, {
                enumerable: ownEnumKeys.includes(key),
                value: toClone(obj[key]),
                writable: true,
                configurable: true,
              })
          );
        }),
      [getType([])]: (arr) =>
        processClone(arr, [], (cloneArr) =>
          arr.forEach((item) => needToClone(item) && cloneArr.push(toClone(item)))
        ),
      [getType(new Map())]: (map) =>
        processClone(map, new Map(), (cloneMap) =>
          map.forEach(
            (key, value) =>
              needToClone(key) &&
              needToClone(value) &&
              cloneMap.set(toClone(key), toClone(value))
          )
        ),
      [getType(new Set())]: (set) =>
        processClone(set, new Set(), (cloneSet) =>
          set.forEach((value) => needToClone(value) && cloneSet.add(value))
        ),
    };
    const toClone = (value) => {
      let cloneFun = cloneFuns[getType(value)];
      return cloneFun ? clonedMap.get(value) || cloneFun(value) : value;
    };
    return (value, needCircular) => {
      try {
        saveCircular = !!needCircular;
        return toClone(value);
      } catch (e) {
        reset();
        throw e;
      } finally {
        reset();
      }
    };
  })();
  //简单测试
  let arr = [{ 1: 1 }, { 2: 2 }, { 3: 3 }, { 4: 4 }];
  arr[4] = arr;
  arr[5] = new Set([1, 2, 3]);
  arr[6] = new Set([arr[4]]);
  let cloneArr = deepClone(arr);
  let cirArr = deepClone(arr, true);
  arr[3][4] = 5;
  console.log(arr, cloneArr, cirArr);