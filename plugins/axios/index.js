import homeApi from "./home.js";
import userApi from "./user.js";
import collectApi from "./collect.js";
import searchApi from "./search.js";
import upApi from "./up.js";
import videoApi from "./video.js";
import { Toast } from 'vant'
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
    if (response.data.code == 200) {
      response.data.code = 100
    }
    return response.data
  });
  $axios.onError(error => {
    return Promise.reject(error)
  });

  inject("homeApi", homeApi($axios));
  inject("userApi", userApi($axios));
  inject("collectApi", collectApi($axios));
  inject("searchApi", searchApi($axios));
  inject("upApi", upApi($axios));
  inject("videoApi", videoApi($axios));
}
