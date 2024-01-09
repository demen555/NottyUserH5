import homeApi from "./home.js";
import userApi from "./user.js";
import collectApi from "./collect.js";
import searchApi from "./search.js";
import upApi from "./up.js";
import videoApi from "./video.js";
import { Toast } from 'vant'
function codeToast(code, app, store){
  console.log('code', code,  app.i18n.t("str_response_code3"))
  switch(code){
      case 400000:
          Toast(app.i18n.t("str_response_code3"));
          break;
      case 400001:
          Toast(app.i18n.t("str_response_code9"));
          break;
      case 400002:
          Toast(app.i18n.t("str_response_code5"));
          break;
      case 400003:
          Toast(app.i18n.t("str_response_code6"));
          break;
      case 400004:
          Toast(app.i18n.t("str_response_code2"));
          break;
      case 400005:
          Toast(app.i18n.t("str_response_code7"));
          break;
      case 400006:
          Toast(app.i18n.t("str_response_code11"));
          break;
  }
}
const lanMap = {
  en: "en_US",
  pt: "pt_PT"
}
export default function ({ app, $axios, store }, inject) {
  console.log(app, 'app')
  $axios.onRequest((config) => {
    config.headers['Content-Type'] = 'application/json'
    const token =  store.state.user.accessToken;
    if (process.client) {
      let location = localStorage.getItem('location') 
      if( !location ){
        location = 'US1'
        localStorage.setItem('location', 'US1')
      }
      config.headers["Request-Country"] = location;
    } else {
      config.headers["Request-Country"] = "US1";
    }
    // 中国--返回中国分类数据    Request-Country: CN
    // 日本的 返回日本分类数据  Request-Country: JP
    // 全球：   Request-Country: US1
    // 其他的选择都是欧美的分类数据   Request-Country: FR
    if( 
      config.headers["Request-Country"] != 'CN' 
      && config.headers["Request-Country"] != 'JP'
      && config.headers["Request-Country"] != 'US1'
    ){
      config.headers["Request-Country"] = 'FR'
    }


    config.headers["Request-Lang"] = lanMap[app.i18n.locale] || "pt_PT";
    
    config.headers["App-Type"] = 3;
    
    if (token) config.headers['Authorization'] = `Bearer ${token}`
  });

  $axios.onResponse((response) => {
    console.log(response, 'onResponse')
    codeToast(response.data.code, app, store)
    if ([200000, 200101, 200102, 200].includes(response.data.code)) {
      response.data.code = 100
    }
    return response.data
  });
  $axios.onError(error => {
    console.error('error', error)
    codeToast(error.response.data.code, app, store)
    return Promise.reject(error)
  });

  inject("homeApi", homeApi($axios));
  inject("userApi", userApi($axios));
  inject("collectApi", collectApi($axios));
  inject("searchApi", searchApi($axios));
  inject("upApi", upApi($axios));
  inject("videoApi", videoApi($axios));
}
