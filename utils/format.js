export function formatNumber(size) {
  if (!size) return "--";
  var num = 1000; //byte         
  if (size < num)
    return size;
  if (size < Math.pow(num, 2))
    return (size / num).toFixed(2) + "K"; // 1000
}
export function formatPer(like, all) {
  return parseInt((like/all)*100) + '%'
}

export function uniArray(arr, id) {
  let obj = {};
  let reduce = [];
  if(arr.length) {
    reduce = arr.reduce(function (item, next) {
      //item为没有重复id的数组，next为当前对象
      obj[next[id]] ? '' : (obj[next[id]] = true && item.push(next));
      return item;
    }, []);
    console.log(reduce);
    return reduce
  }
  
}

export function titleCase(str) {  
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());  
}


export function formatTime (myDate) {
  let date = new Date(myDate * 1000)
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  if (D < 10) {
    D = '0' + D
  }
  if (h < 10) {
    console.log(1);
    h = '0' + h
  }
  if (m < 10) {
    m = '0' + m
  }
  if (s < 10) {
    s = '0' + s
  }
  return Y + M + D + h + ':' + m + ':' + s
};


export function formatTime1 (myDate) {
  let date = new Date(myDate * 1000)
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  let D = date.getDate() + ' ';
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  if (D < 10) {
    D = '0' + D
  }
  return Y + M + D 
};



// 刚刚(1小时内) 其他
// 今天   24*60*60 特殊 60*60 
// 昨天   1*24*60*60
// 2天前 2*24*60*60
// 3天前 3*24*60*60
// 4天前 4*24*60*60
// 5天前 5*24*60*60
// 6天前 6*24*60*60
// 一周前 7*24*60*60
// 1月前  (1/12)*365*24*60*60
// 2月前  (2/12)*365*24*60*60
// 3月前  (3/12)*365*24*60*60
// 4月前  (4/12)*365*24*60*60
// 5月前  (5/12)*365*24*60*60
// 6月前  (6/12)*365*24*60*60
// 7月前  (7/12)*365*24*60*60
// 8月前  (8/12)*365*24*60*60
// 9月前  (9/12)*365*24*60*60
// 10月前  (10/12)*365*24*60*60
// 11月前   (11/12)*365*24*60*60
// 1年前  1*365*24*60*60
// 2年前  2*365*24*60*60
// 3年前  3*365*24*60*60
export function dateFormat(TIME) {
  const nowtime = new Date().getTime()
  const _b =  (nowtime/1000) - TIME;
    if( _b > 3*365*24*60*60){
      return "str_3_years_ago";}
      
    if( _b > 2*365*24*60*60){
      return "str_2_years_ago";}
      
    if( _b > 1*365*24*60*60){
      return "str_1_year_ago";}
       


    if( _b > 11*30*24*60*60){
      return "str_11_months_ago";}
      
    if( _b > 10*30*24*60*60){
      return "str_10_months_ago";}
      
    if( _b > 9*30*24*60*60){
      return "str_9_months_ago";}
      
    if( _b > 8*30*24*60*60){
      return "str_8_months_ago";}
      
    if( _b > 7*30*24*60*60){
      return "str_7_months_ago";}
      
    if( _b > 6*30*24*60*60){
      return "str_6_months_ago";}
       
    if( _b > 5*30*24*60*60){
      return "str_5_months_ago";}
      
    if( _b > 4*30*24*60*60){
      return "str_4_months_ago";}
      
    if( _b > 3*30*24*60*60){
      return "str_3_months_ago";}
      
    if( _b > 2*30*24*60*60){
      return "str_2_months_ago";}
      
    if( _b > 1*30*24*60*60){
      return "str_1_month_ago";}
      


    if( _b > 7*24*60*60){
      return "str_a_week_ago";}
      
    if( _b > 6*24*60*60){
      return "str_6_days_ago";}
      
    if( _b > 5*24*60*60){
      return "str_5_days_ago";}
      
    if( _b > 4*24*60*60){
      return "str_4_days_ago";}
      
    if( _b > 3*24*60*60){
      return "str_3_days_ago";}
      
    if( _b > 2*24*60*60){
      return "str_2_days_ago";}
      
    if(_b > 1*24*60*60){
      return "str_yesterday";}
      
    if(_b > 60*60){
      return "str_today";
    }

    return "str_just"

}


//判断是手机端还是pc端
export function isPc(){
  // if(window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
  //   return false; // 移动端
  // }else{
  //   return true; // PC端
  // }
  return false
}



export function getQueryString(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
      return decodeURIComponent(r[2]);
  };
  return null;
}



// 检测是否为手机端
export function mobileDevice() {
  // let client = '';
  // if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
  //   client = 'iOS';
  // } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
  //   client = 'Android';
  // } else {
  //   client = 'PC';
  // }
  // return client;
  return false
}

// 节流函数
export function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
