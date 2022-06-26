let toLoadArr = []; // 需要检查的文件数组，用于暂停检查与开启检查
let listError = [], // 疑似开源文件数组
  listNormal = [], // 非开源文件数组
  openTimer = 0,
  isPause = false; // 开启左边目录树的定时器，防止关闭，检查完毕后清除这个定时器
// js实现点击
const toDispatchClickEvent = (dom) => {
  const event = document.createEvent("Event");
  event.initEvent("click", true, true);
  dom.dispatchEvent(event);
};
const ignoreFile = [];
const checkFile = [".js"];
// 展开所有目录
(() => {
  const $ = window.jQuery || document.querySelectorAll;
  const needClick = (dom) =>
    $(dom).attr("class")?.includes("ant-tree-switcher_close");
  const needLoad = (dom) =>
    !$("nz-tree-node-switcher", dom)
      ?.attr("class")
      ?.includes("ant-tree-switcher_open");
  const { forEach, some, filter } = Array.prototype;
  const tagName = "nz-tree-node-switcher";
  const toDispatchClickEvent = (dom) => {
    const event = document.createEvent("Event");
    event.initEvent("click", true, true);
    dom.dispatchEvent(event);
  };
  const expand = () => {
    let doms = filter.call($(tagName), (dom) => needClick(dom));
    if (
      doms.length > 0 ||
      $("d-loading-backdrop", $(".filetree-wrapper")[0]).length > 0
    ) {
      forEach.call(doms, (dom) => toDispatchClickEvent(dom));
      openTimer = setTimeout(expand, 100);
    } else {
      startClick();
    }
  };
  expand();
  function startClick() {
    if (
      some.call($(tagName), (item) => needClick(item)) ||
      $("d-loading-backdrop", $(".filetree-wrapper")[0]).length > 0
    ) {
      setTimeout(expand, 100);
    } else {
      toLoadArr = filter
        .call($("nz-tree-node"), (item) => needLoad(item))
        .map((item) => $("nz-tree-node-title", item))
        .filter(
          (item) =>
            !ignoreFile.some((name) =>
              item.attr("title").trim().endsWith(name)
            ) &&
            checkFile.some((name) => item.attr("title").trim().endsWith(name))
        );
      toStart();
    }
  }
})();
const autoScroll = (dom) => {
  const scrollDom = $(".filetree-wrapper");
  if (!scrollDom) return;
  let top = scrollDom.scrollTop();
  scrollDom.scrollTop(dom.offset().top + top - scrollDom.offset().top - 30);
};
let timer = 0; // 检查任务的定时器
const checkTimeout = 1000; // 检查任务的间隔
// 检查配置--------------------------重要项------------------------
const limitObj = {
  duplicationLine: 20, // 相似度  相似度大于20
  duplicationPercent: 0.2, // 相似度/ 文件行数  > 0.2
};
const toStart = () => isPause || startLoad();
const startLoad = () => {
  isPause = false;
  let item = toLoadArr.shift();
  if (item) {
    // 自动滚动
    autoScroll(item);
    toDispatchClickEvent(item[0] || item);
    const { some } = Array.prototype;
    const fun = (value) => {
      // 已经加载完成
      let lineNum =
        value ||
        (() => {
          let matchValue = $(".file-tag1") // 获取文件行数
            .html()
            .match(/[0-9]+/);
          return matchValue?.length > 0 ? Number(matchValue[0]) : null;
        })();
      const fileName = Array.prototype.find.call(
        $(".ng-valid"),
        (item) => $(item).attr("name") === "filePath"
      )?.value;
      if (
        $("tr").length > 1 &&
        lineNum &&
        fileName &&
        $("d-loading-backdrop", $(".position-flex")[0]).length === 0 &&
        $("d-loading-backdrop", $(".filetree-wrapper")[0]).length === 0
      ) {
        if (
          some.call($("tr"), (item, index) => {
            let dulLine = $("span", $($("td", item))[5]).html(); // 获取相似度
            let percent = 0;
            if (dulLine === "all") {
              percent = 1;
            } else {
              percent = Number(dulLine) / lineNum;
            }
            if (
              (percent >= limitObj.duplicationPercent &&
                dulLine >= limitObj.duplicationLine) ||
              percent === 1
            ) {
              pauseLoad();
              console.log("当前limitObj: ", JSON.stringify(limitObj));
              console.log(
                "执行 startLoad() 可以继续执行 ，执行 pauseLoad() 可以暂停执行，可以修改limitObj改变判断条件"
              );
              window.confirm(
                '发现疑似开源文件，请检查。如果这个文件不是开源文件满，请点击"确定"；如果是，请点击"取消"进行处理，处理完毕后在控制台执行 startLoad() 方法继续检查。'
              ) && startLoad();
              return true;
            }
            return false;
          })
        ) {
          listError.push(fileName);
        } else {
          listNormal.push(fileName);
          toStart();
        }
      } else {
        setTimeout(fun, 200);
      }
    };
    setTimeout(fun, checkTimeout); // 排查间隔
  } else {
    clearTimeout(openTimer);
    console.log(
      `疑似开源文件条件:相似度 > ${limitObj.duplicationLine} 且 相似度/ 文件行数  > ${limitObj.duplicationPercent}`
    );
    console.log(
      `共检查了${listNormal.length + listError.length}个${checkFile.join(
        ", "
      )}文件，疑似开源文件${listError.length}个文件,${
        ignoreFile.length > 0
          ? `跳过了${ignoreFile.join(", ")}文件`
          : "可以修改 ignoreFile 以忽略特殊文件"
      }`
    );
    console.log(`疑似开源文件：${listError.join(", ")}`);
    window.confirm("已经检查完毕，检查详情可以前往控制台查看");
  }
};
const pauseLoad = () => {
  clearTimeout(timer);
  isPause = true;
};
