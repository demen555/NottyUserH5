import Api from "./api";

export default ($axios) => ({

        /***
     * @视频列表分类列表
     * 
     */ 
    requestvodpage(data){
        return $axios({
            url: Api.home.vodpage,
            method: "POST",
            data: data
        })
    },

    /***
     * @首页视频列表
     * 
     */ 
    requestvodpageHome(data){
        return $axios({
            url: Api.home.vodpagehome,
            method: "POST",
            data: data
        })
    },

    /***
     * @首页短视频列表
     * 
     */ 
    requestvodpageStoriesHome(data){
        return $axios({
            url: Api.home.vodpagehomeStories,
            method: "POST",
            data: data
        })
    },

    /***
     * @首页视频列表
     * 
     */ 
    requestUpInfo(data){
      return $axios({
          url: Api.home.up,
          method: "POST",
          data: data
      })
    },

    /***
     * @视频列表搜素
     * 
     */ 
    requestvodpageSearch(data){
        return $axios({
            url: Api.home.vodpagesearch,
            method: "POST",
            data: data
        })
    },


    /***
     * @视频相关
     * 
     */ 
    requestvodpageconnect(data){
        return $axios({
            url: Api.home.vodpageconnect,
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
    },
    /***,
     * @邮箱注册
     * 
     */ 
    postEmailRegister(data){
        return $axios({
            url: Api.home.emailRegister,
            method: "POST",
            data: data
        })
    },
    /***
     * @用户名登录
     * 
     */ 
    postLogin(data){
        return $axios({
            url: Api.home.login,
            method: "POST",
            data: data
        })
    },
    /***
     * @邮箱登录
     * 
     */ 
    postEmailLogin(data){
        return $axios({
            url: Api.home.emailLogin,
            method: "POST",
            data: data
        })
    },
    /***
     * @登录
     * 
     */ 
    postLoginOut(){
        return $axios({
            url: Api.home.loginOut,
            method: "POST",
        })
    },
    /***
     * @ 分类列表
     * 
     */ 
    postTypeList(data){
      return $axios({
          url: Api.home.type,
          method: "POST",
          data: data
      })
    },
    /***
     * @ 标签页列表
     * 
     */ 
    postTagList(data){
        return $axios({
            url: Api.home.tagList,
            method: "POST",
            data: data
        })
    },
    /***
     * @ 标签页列表分页
     * 
     */ 
    postTagListPage(data){
        return $axios({
            url: Api.home.tagListPage,
            method: "POST",
            data: data,
            params: { urlSlug: data.urlSlug }
        })
    },
    /***
     * @ 静态页面seo tdk
     * 
     */ 
    postSeo(data){
      return $axios({
          url: Api.home.seo,
          method: "POST",
          params: { urlSlug: data }
      })
  },
});
