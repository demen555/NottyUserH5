import Api from "./api";

export default ($axios) => ({
    /***
     * @收藏视频列表
     * 
     */ 
    postCollectList(data){
        return $axios({
            url: Api.collect.collect,
            method: "POST",
            data: data
        })
    },
    /***
     * @删除收藏视频
     * 
     */ 
    postCollectDelete(data){
        return $axios({
            url: Api.collect.delete,
            method: "POST",
            data: data
        })
    },
    /***
     * @验证码
     * 
     */ 
    postCode(data){
        return $axios({
            url: Api.home.code,
            method: "POST",
            data: data
        })
    },
    /***
     * @注册
     * 
     */ 
    postRegister(data){
        return $axios({
            url: Api.home.register,
            method: "POST",
            data: data
        })
    }
});


