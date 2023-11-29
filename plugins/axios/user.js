import Api from "./api";

export default ($axios) => ({
    /***
     * @用户信息
     * @参数
     * @userId  用户ID， 登录用户传accessId
     */ 
    requestUserinfo(data) {
        return $axios({
            url: Api.user.userinfo,
            method: "POST",
            data: data
        })
    },


    /***
     * @邮箱登录
     */ 
    postEmailLogin(data){
        return $axios({
            url: Api.home.emailLogin,
            method: "POST",
            data: data
        })
    }
});
