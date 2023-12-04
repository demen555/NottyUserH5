var uaids = {
  "nottyhub.com":"G-H2ZVH2VFSJ", // 正式环境
  "h5.jdsesasc.com": "G-EKWS87V85Z", // 测试环境 
  "dasao88.com": "G-PX4JRYJR8E", // 正式环境
  "dasao66.com": "G-19P85EKLRD",
  "aijdn.dasao88.com": "G-JN0VHVETNV",
  "busa.dasao88.com": "G-GT144F4JHL"
}
var gtagKey = uaids[window.location.hostname] || "G-EKWS87V85Z";
window.dataLayer = window.dataLayer || [];
function gtag(){
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', gtagKey);

