let Api = {

  user: {
    userinfo: '/api/v1/user/info', // 用户详情
    usernickname: "/api/v1/user/nickname", // 用户昵称
    userquestion: "/api/v1/user/question", // 修改密保问题
    passwordfind: "/api/v1/user/password/find", // 找回密码
    setpassword: "/api/v1/user/password/set", // 修改密码
    sendEmail: "/api/v1/user/password/send_email", // 邮件
    emailVerify: "/api/v1/user/password/email_verify", // 邮箱参数修改密码
    userSetAvatar: "/api/v1/user/avatar", // 头像设置
  },
  search: {
    keys: '/api/v1/vod/keys'
  },
  up:{
    like: '/api/v1/comment/likes',
    delete: '/api/v1/comment/delLikes'
  },
  collect: {
    collect: '/api/v1/collect/lists',
    delete: '/api/v1/collect/remove'
  },
  home: {
    vodpagehome: "/api/v1/vod/lists", // 首页视频列表
    vodpage: "/api/v1/vod/lists", // 相关视频
    vodpagesearch: "/api/v1/vod/lists", // 搜索列表
    vodpageconnect: "/api/v1/vod/lists", // 相关视频新的
    login: '/api/v1/access/login',
    emailLogin: '/api/v1/access/login',
    code: '/api/v1/user/code',
    type: '/api/v1/category/lists',
    register: '/api/v1/user/register',
    emailRegister: '/api/v1/user/register',
    loginOut: '/api/v1/access/logout',
    tagList: '/api/v1/tag/lists',
    tagListPage: '/api/v1/tag/lists',
  },
  video: {
    vodComment: "/api/v1/vod/detail", //  视频详情
    vodComment1: "/api/v1/vod/detail", //  视频详情v1.2.0
    vodChange: "/api/v1/vod/recommend",  // 相关视频 related
    vodReview: "/api/v1/comment/comments", // 评论列表
    voddown: "/api/v1/comment/dislike", // 踩
    voddowncancel: "/api/v1/comment/dislike", // 取踩
    vodup: "/api/v1/comment/like", // 赞
    vodupcancel: "/api/v1/comment/like", // 取消赞
    vodcollectcancel:"/api/v1/collect/post", // 取消收藏
    vodcollect:"/api/v1/collect/post", // 取消收藏
    sharelink:"/api/v1/user/share/link", // 分享链接获取
    vodReviewInput:"/api/v1/comment/post", // 评论
    videoTagOperation: "/api/v1/tag/video_tag_operation", // 标签投票
    videoTagSearch: "/api/v1/tag/video_tag_search", // 标签联想
    videoTagSuggest: "/api/v1/tag/video_tag_suggest", // 标签建议
    videoState: "/api/v1/vod/state", // 登录用户对当前视频的状态(赞、踩、收藏)
    videoHits: "/api/v1/vod/hits", // 播放数量
  }
};
export default Api;