import Api from "./api";

export default ($axios) => ({
   
    /***
     * @视频详情
     * @参数
     * @userId  用户Id，可以为空
     * @vodId   视频ID
     * 
     * */ 
    post(data){
        return $axios({
            url: Api.video.vodComment,
            method: "get",
            data: data
        })
    },
    /***
     * @热搜词
     * @参数
     * @size  条数
     * 
     * */ 
    postSearchKeys(data){
        return $axios({
            url: Api.search.keys,
            method: "post",
            data: data
        })
    }
});

