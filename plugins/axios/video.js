import Api from "./api";

export default ($axios) => ({

    /***
     * @视频详情
     * @参数
     * @userId  用户Id，可以为空
     * @vodId   视频ID
     * 
     * */ 
    requestVodComment(data){
        return $axios({
            url: Api.video.vodComment,
            method: "POST",
            data: data
        })
    },

    /***
     * @相关视频
     * @参数
     * @vodId   视频ID
     * 
     * */ 
    requestVodChange(data){
        return $axios({
            url: Api.video.vodChange,
            method: "POST",
            data: data
        })
    },

    /***
     * @评论视频
     * @参数
     * @vodId 视频id
     * @size  页面大小
     * @page	 第几页
     * 
     * */ 
    requestVodReviewe(data){
        return $axios({
            url: Api.video.vodReview,
            method: "POST",
            data: data
        })
    },


    /***
     * @视频点赞
     * @参数
     * @userId  用户Id，可以为空
     * @vodId   视频ID
     * 
     * */ 
    requestVodup(data){
        return $axios({
            url: Api.video.vodup,
            method: "POST",
            data: data
        })
    },

    /***
     * @视频点赞取消
     * @参数
     * @userId  用户Id，可以为空
     * @vodId   视频ID
     * 
     * */ 
    requestVodupcancel(data){
        return $axios({
            url: Api.video.vodupcancel,
            method: "POST",
            data: data
        })
    },

    /***
     * @视频踩
     * @参数
     * @userId  用户Id，可以为空
     * @vodId   视频ID
     * 
     * */ 
    requestVoddown(data){
        return $axios({
            url: Api.video.voddown,
            method: "POST",
            data: data
        })
    },

    /***
     * @视频踩取消
     * @参数
     * @userId  用户Id，可以为空
     * @vodId   视频ID
     * 
     * */ 
    requestVoddowncancel(data){
        return $axios({
            url: Api.video.voddowncancel,
            method: "POST",
            data: data
        })
    },



    /***
     * @视频收藏
     * @参数
     * @userId  用户Id，可以为空
     * @vodId   视频ID
     * 
     * */ 
    requestVodcollect(data){
        return $axios({
            url: Api.video.vodcollect,
            method: "POST",
            data: data
        })
    },

    /***
     * @视频收藏取消
     * @参数
     * @userId  用户Id，可以为空
     * @vodId   视频ID
     * 
     * */ 
    requestVodcollectcancel(data){
        return $axios({
            url: Api.video.vodcollectcancel,
            method: "POST",
            data: data
        })
    },

    /***
     * @视频收藏取消
     * @参数
     * @userId  用户Id，可以为空
     * 
     * */ 
    requestSharelink(data){
        return $axios({
            url: Api.video.sharelink,
            method: "POST",
            data: data
        })
    },


    /***
     * @视频评价
     * @参数
     * @userId  用户Id，可以为空
     * @vodId   视频ID
     * @content 内容，Base64加密
     * */ 
    requestVodReviewInput(data){
        return $axios({
            url: Api.video.vodReviewInput,
            method: "POST",
            data: data
        })
    },

    /**
     * 登录用户对当前视频的状态(赞、踩、收藏)
     * @param data
     * @returns {*}
     */
    requestVodState(data){
        return $axios({
            url: Api.video.videoState,
            method: "POST",
            data: data
        })
    },
    /***
     * @标签建议
     * @参数
     * @tag  搜索的tag
     * */ 
    requestVideoTagSuggest(data){
      return $axios({
          url: Api.video.videoTagSuggest,
          method: "POST",
          data: data
      })
    },
    /***
     * @标签联想
     * @参数
     * @tag  搜索的tag
     * */ 
    requestVideoTagSearch(data){
      return $axios({
          url: Api.video.videoTagSearch,
          method: "POST",
          data: data
      })
    },

        /***
     * @播放数量
     * @参数
     * @vodId  视频id
     * */ 
    requestVideoHits(data){
        return $axios({
            url: Api.video.videoHits,
            method: "POST",
            data: data
        })
    },

            /***
     * @播放路由
     * @参数
     * @vodId  视频id
     * */ 
    requestVideoRouter(data){
        return $axios({
            url: Api.video.videoRouter,
            method: "POST",
            data: data
        })
    },
        /***
     * @播放数量
     * @参数
     * @vodId  视频id
     * */ 
    requeststoriesHits(data){
        return $axios({
            url: Api.video.videoHits,
            method: "POST",
            data: data
        })
    },
        
});



