export default (context, inject) => {
  inject('formatNumber', (size) => {
    if (!size) return "--";
    var num = 1000; //byte         
    if (size < num)
      return size;
    if (size < Math.pow(num, 2))
      return (size / num).toFixed(2) + "K"; // 1000
  })

  inject('formatPer', (like, all) => {
    return parseInt((like/all)*100) + '%'
  })

};