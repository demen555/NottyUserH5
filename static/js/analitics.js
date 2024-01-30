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



(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "jxfplk946b");



var w3counter = {
  "aijdn.dasao88.com": "https://www.w3counter.com/tracker.js?id=150829",
  "busa.dasao88.com": "https://www.w3counter.com/tracker.js?id=150828"
}
var w3counterSrc = w3counter[window.location.hostname];
if( w3counterSrc ){
  var script = document.createElement('script');
  script.src = w3counterSrc;
  document.head.appendChild(script);
}





