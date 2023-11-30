import homeApi from "./home.js";
import userApi from "./user.js";

export default function ({ app, $axios, store }, inject) {
  $axios.onRequest((config) => {
    // 相关配置 app.$cookies.get("token") || ""
    // config.headers["Request-Lang"] = lang;
    // config.headers["Device-Id"] = DeviceId;
    // config.headers["Request-Token"] = token;
    // config.headers["Request-Country"] = location;
    config.headers["App-Type"] = 3;
    config.headers["Request-Country"] = "";
    config.headers["Request-Lang"] = "en_US";


  });

  $axios.onResponse((response) => {
    return response.data
  });
  $axios.onError(error => {
    return Promise.reject(error)
  });

  inject("homeApi", homeApi($axios));
  inject("userApi", userApi($axios));
}
