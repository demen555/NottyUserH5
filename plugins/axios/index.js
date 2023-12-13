import homeApi from "./home.js";
import userApi from "./user.js";
import collectApi from "./collect.js";
import searchApi from "./search.js";
import upApi from "./up.js";
import videoApi from "./video.js";
import { Toast } from 'vant'
function codeToast(code, app, store){
  switch(code){
      case 400000:
          Toast(app.$i18n.t("str_response_code3"));
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
export default function ({ app, $axios, store }, inject) {
  console.log(app, 'app')
  $axios.onRequest((config) => {
    config.headers['Content-Type'] = 'application/json'
    const token =  store.state.user.accessToken;
    if (process.client) {
      let language = localStorage.getItem('language') 
      let location = localStorage.getItem('location') 

      if( !language ){
        language = 'pt_PT'
        localStorage.setItem('language', 'pt_PT')
      }
      if( !language ){
        location = 'US'
        localStorage.setItem('location', 'US')
      }

      config.headers["Request-Country"] = location;
      config.headers["Request-Lang"] = language;
    } else {
      config.headers["Request-Country"] = "US";
      config.headers["Request-Lang"] = "pt_PT";
    }
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
