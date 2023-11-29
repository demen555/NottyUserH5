let Api = {
    commom: {
      common: '/api/obtain/access/encryption/v1_0_0'
    },
    user: {
      userinfo: '/api/obtain/user/info/v1_0_0', // 用户详情
      usernickname: "/api/obtain/user/nickname/v1_0_0", // 用户昵称
      userquestion: "/api/obtain/user/question/v1_0_0", // 修改密保问题
      passwordfind: "/api/obtain/user/password/find/v1_0_0", // 找回密码
      setpassword: "/api/obtain/user/password/set/v1_0_0", // 修改密码
      sendEmail: "/api/obtain/user/password/send_email/v1_2_0", // 邮件
      emailVerify: "/api/obtain/user/password/email_verify/v1_2_0", // 邮箱参数修改密码
    },
    search: {
      search: '/api/obtain/vod/keys/v1_0_0',
      keys: '/api/obtain/vod/keys/v1_0_0'
    },
    up:{
      like: '/api/obtain/vod/up/page/v1_0_0',
      delete: '/api/obtain/vod/up/remove/v1_0_0'
    },
    collect: {
      collect: '/api/obtain/vod/collect/page/v1_0_0',
      delete: '/api/obtain/vod/collect/remove/v1_0_0'
    },
    home: {
      vodpagehome: "/api/v1/vod/lists", // 首页视频列表
      emailLogin: '/api/v1/access/login', // 邮箱登录




      vodpage: "/api/obtain/vod/page/v1_0_0", // 相关视频
      vodpagesearch: "/api/obtain/vod/page/search/v1_0_0", // 搜索列表
      vodpageconnect: "/api/obtain/vod/page/connect/v1_2_0", // 相关视频新的
      login: '/api/obtain/access/username/v1_0_0',
      code: '/api/obtain/user/code/v1_0_0',
      register: '/api/obtain/user/register/v1_0_0',
      emailRegister: '/api/obtain/user/register/v1_2_0',
      loginOut: '/api/obtain/access/logout/v1_0_0',
      type: '/api/obtain/type/list/v1_0_0',
      typeDetail: '/api/obtain/type/detail/v1_0_0',
      tagList: '/api/obtain/vod_tag/list/v1_0_0',
      tagListPage: '/api/obtain/vod_tag/page/v1_0_0',
      domain: '/api/obtain/domain/list/v1_0_0',
      domainReport: '/api/obtain/domain/report/v1_0_0'
    },
    video: {
      vodComment: "/api/obtain/vod/detail/v1_0_0", //  视频详情
      vodChange: "/api/obtain/vod/change/v1_0_0",  // 相关视频
      vodReview: "/api/obtain/vod/comment/page/v1_0_0", // 评论
      voddown: "/api/obtain/vod/down/v1_0_0", // 踩
      voddowncancel: "/api/obtain/vod/down/cancel/v1_0_0", // 取踩
      vodup: "/api/obtain/vod/up/v1_0_0", // 赞
      vodupcancel: "/api/obtain/vod/up/cancel/v1_0_0", // 取消赞
      vodcollectcancel:"/api/obtain/vod/collect/cancel/v1_0_0", // 取消收藏
      vodcollect:"/api/obtain/vod/collect/v1_0_0", // 取消收藏
      sharelink:"/api/obtain/user/share/link/v1_0_0", // 分享链接获取
      vodReviewInput:"/api/obtain/vod/comment/v1_0_0", // 评论
      videoTagOperation: "/api/obtain/vod_tag/video_tag_operation/v1_2_0", // 标签投票
      videoTagSearch: "/api/obtain/vod_tag/video_tag_search/v1_2_0", // 标签联想
      videoTagSuggest: "/api/obtain/vod_tag/video_tag_suggest/v1_2_0", // 标签建议
    }
  };
  export default Api;
  