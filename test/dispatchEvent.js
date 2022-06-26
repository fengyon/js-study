const event = document.createEvent("Event");
event.initEvent("click", true, true);
let buttonDOM = doms2[doms2.length - 1].getElementsByTagName("a")[0];
buttonDOM.dispatchEvent(event);
