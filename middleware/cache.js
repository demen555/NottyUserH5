const cachePage = require('../lruCache.js');
export default function(req, res, next) {
  const url = req._parsedOriginalUrl;
  const pathname = url.pathname;
  console.log( url.pathname, "缓存的页面", Boolean(cachePage.get('indexPage')))
  // if (process.env.NODE_ENV !== 'development') {
    if (pathname.indexOf('/home') > -1) {
      const existsHtml = cachePage.get('indexPage');
      if (existsHtml) {
        res.setHeader('Content-Type', ' text/html; charset=utf-8');
        return res.end(existsHtml.html, 'utf-8');
      } else {
        res.original_end = res.end;
        res.end = function(data) {
          if (res.statusCode === 200) {
            // 设置缓存
            cachePage.set('indexPage', {
              html: data,
            });
          }
          res.original_end(data, 'utf-8');
        };
      }
    }
  // }
  next();
}