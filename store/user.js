import _ from 'lodash';
const state = {
  encryption: "", //  Aes 加密密钥
  register: {}, //注册/登录弹窗用的信息
  userinfo: {}, //用户登录信息

  historyVod:[], // 观看历史
  theme: 'dark',  //默认主题色

  vodId: "", // 当前长按的视频id

  noLoginUpVod: [], // 未登录点赞列表

  noLoginDownVod: [], // 未登录点踩列表
  accessToken: '',
}

const actions = {
  setAccessToken({commit}, data) {
    commit('UPDATE_ACCESSTOKEN', data)
  },
  clearAccessToken({commit}) {
      commit('CLEAR_ACCESSTOKEN')
  },
  set_register(context, data){
    context.commit('SET_REGISTER', data)
  },
  set_userinfo(contxt, data){
    contxt.commit('SET_USERINFO', data)
  },
  update_historyvod(contxt, data){
    contxt.commit('UPDATE_HISTORYVOD', data)
  },
  celar_historyvod(contxt, data){
    contxt.commit('CLEAR_HISTORYVOD', data)
  },
  update_theme(contxt, data){
    contxt.commit('UPDATE_THEME', data)
  },
  clear_upvod(contxt, data){
    contxt.commit('CLEAR_UPVOD', data)
  },
  update_upvod(contxt, data){
    contxt.commit('UPDATE_UPVOD', data)
  },
}

const getters = {
  encryption: (state) => state.encryption,
  register: (state) => state.register,
  userinfo: (state) => state.userinfo,
  historyVod: (state) => state.historyVod,  
  theme: (state) => state.theme, 
  vodId: (state) => state.vodId, 
  isLogin: (state) => state.userinfo.accessToken,
  noLoginUpVod: (state) => state.noLoginUpVod, 
  noLoginDownVod: (state) => state.noLoginDownVod,  
  accessToken: (state) => state.accessToken, 
}

const mutations = {
  //设置accessToken
  UPDATE_ACCESSTOKEN(state, data) {
    state.accessToken = data
  },
  CLEAR_ACCESSTOKEN(state, data){
      state.accessToken = ''
  },
  SET_ENCRYPTION(state, data){
      state.encryption = data
  },
  SET_REGISTER(state, data){
    state.register = data
  },
  SET_USERINFO(state, data){
    state.userinfo = data
  },
  UPDATE_USERINFO(state, data){
    state.userinfo = {
      ...state.userinfo,
      ...data
    }
  },
  // 添加 更新历史记录
  UPDATE_HISTORYVOD(state, data){
    console.log(data, Array.isArray(data), 'UPDATE_HISTORYVOD')
    if(!Array.isArray(data)){
      // state.historyVod = [
      //   data,
      //   ...state.historyVod
      // ];
      state.historyVod.unshift(data)
      state.historyVod = _.uniqBy(state.historyVod, 'vodId')
      console.log(state.historyVod, 'update')
    }else{
      state.historyVod = data
    }
    
    console.log(state.historyVod, data, 'UPDATE_HISTORYVOD')
  },
  // 删除历史记录
  CLEAR_HISTORYVOD (state, data){
    state.historyVod = [];
  },
  // 更换主题色
  UPDATE_THEME (state, data){
    state.theme = data;
  },

  SET_VODID (state, data){
    state.vodId = data;
  },

  // 添加 更新点赞列表
  UPDATE_UPVOD(state, data){
    if(!Array.isArray(data)){
      state.noLoginUpVod = [
        ...state.noLoginUpVod,
        data,
      ];
    }else{
      state.noLoginUpVod = data
    }
  },

  // 全部删除删除点赞列表
  CLEAR_UPVOD (state, data){
    state.noLoginUpVod = [];
  },

  // 删除一条点赞
  DEL_UPVOD (state, data){
    state.noLoginUpVod = state.noLoginUpVod.filter( ele => ele.vodId != data );
  },

  DEL_UPVODLIST(state, data){
    console.log( state.noLoginUpVod, data )
    state.noLoginUpVod = state.noLoginUpVod.filter( ele => !(data.includes(String(ele.vodId))) );
  },

  // 添加 更新点踩列表
  UPDATE_DOWNVOD(state, data){
    if(!Array.isArray(data)){
      state.noLoginDownVod = [
        ...state.noLoginDownVod,
        data,
      ];
    }else{
      state.noLoginDownVod = data
    }
  },

  // 删除一条点赞
  DEL_DOWNVOD (state, data){
    state.noLoginDownVod = state.noLoginDownVod.filter( ele => ele.vodId != data );
  },
}

export default {
  state,
  getters,
  actions,
  mutations
};
