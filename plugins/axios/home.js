import Api from "./api";

export default ($axios) => ({
    /***
     * @首页视频列表
     */ 
    requestvodpageHome(data) {
        return $axios({
            url: Api.home.vodpagehome,
            method: "POST",
            data: data
        })
    },
});
