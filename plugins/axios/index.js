import homeApi from "./home.js";
import userApi from "./user.js";
import collectApi from "./collect.js";
import searchApi from "./search.js";
import upApi from "./up.js";
import videoApi from "./video.js";

export default function ({ app, $axios, store }, inject) {
  $axios.onRequest((config) => {
    config.headers["App-Type"] = 3;
    config.headers["Request-Country"] = "US";
    config.headers["Request-Lang"] = "pt_PT";
  });

  $axios.onResponse((response) => {
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
