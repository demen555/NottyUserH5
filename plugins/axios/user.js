import Api from "./api";

export default ($axios) => ({
    /***
     * @用户信息
     * @参数
     *
     * */ 
    requestUserinfo(){
        return $axios({
            url: Api.user.userinfo,
            method: "POST",
        })
    },

    /***
     * @用户昵称
     * @参数
     * @nickname 昵称
     * */ 
    requestUsernickname(){
        return $axios({
            url: Api.user.usernickname,
            method: "POST",
        })
    },


    /***
     * @用户昵称
     * @参数
     * @answer   答案
     * @question 问题
     * */
    requestUserquestion(data){
        return $axios({
            url: Api.user.userquestion,
            method: "POST",
            data: data
        })
    },

    /***
     * @用户昵称
     * @参数
     * @answer   答案
     * @question 问题
     * @password md5加密
     * @username 账号
     * @code     图片码
     * */ 
    requestPasswordfind(data){
        return $axios({
            url: Api.user.passwordfind,
            method: "POST",
            data: data
        })
    },


    /***
     * @用户昵称
     * @参数
     * @newPassword   新密码
     * @oldPassword   旧密码
     * */
    requestSetpassword(data){
        return $axios({
            url: Api.user.setpassword,
            method: "POST",
            data: data
        })
    },

    /***
     * @修改密码通过验证参数修改密码
     * @参数
     * @hash   邮箱验证码中所带的hash参数
     * @password   新密码，md5加密
     * */ 
    requestEmailVerify(data){
        return $axios({
            url: Api.user.emailVerify,
            method: "POST",
            data: data
        })
    },

    /***
     * @修改密码发送邮箱验证码
     * @参数
     * @email   邮箱
     * */ 
    requestSendEmail(data){
        return $axios({
            url: Api.user.sendEmail,
            method: "POST",
            data: data
        })
    },

    /***
     * @修改密码发送邮箱验证码
     * @参数
     * @file   文件
     * */ 
    requestuserUploadAvatar(data){
        return $axios({
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            url: Api.user.userUploadAvatar,
            method: "POST",
            data: data
        })
    },

    /***
     * @修改密码发送邮箱验证码
     * @参数
     * @requestuserUploadAvatar   所有参数
     * */ 
    requestuserSetAvatar(data){
        return $axios({
            url: Api.user.userSetAvatar,
            method: "POST",
            data: data
        })
    },

});
