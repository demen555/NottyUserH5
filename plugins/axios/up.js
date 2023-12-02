import Api from "./api";

export default ($axios) => ({

    /***
     * @点赞列表
     * @参数
     * @userId  用户Id，可以为空
     * @vodId   视频ID
     * 
     * */ 
    postUpList(data){
        return $axios({
            url: Api.up.like,
            method: "post",
            data: data
        })
    },
    /***
     * @删除点赞列表
     * @参数
     * @userId  用户Id，可以为空
     * @vodId   视频ID
     * 
     * */ 
    postUpDelete(data){
        return $axios({
            url: Api.up.delete,
            method: "post",
            data: data
        })
    }
});


