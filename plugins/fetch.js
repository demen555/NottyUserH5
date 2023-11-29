// plugins/fetchDataPlugin.js
import Api from "~/plugins/axios/api.js";
export default async ({ $axios, store }) => {
    const response = await $axios.post(Api.commom.common);
    // store.commit('setData', response.data);
};
