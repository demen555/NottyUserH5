const state =  {
  detail: {}, // 分类列表中的某一类数据
  searchShow: true, //搜索页面导航是否显示
  tagId: 655, // 导航栏选中标签
  typeId: '', // 分类选中
  tagList: [], // tag数据
  categoryList: [], // category数据
}

const actions = {
  set_detail(context, data){
    context.commit('SET_DETAIL', data)
  },
  set_show(context, data){
    context.commit('SET_SHOW', data)
  },
  set_tagid(context, data){
    context.commit('SET_TAGID', data)
  },
  set_typeid(context, data){
    context.commit('SET_TYPEID', data)
  },
  set_tagList(context, data){
    context.commit('SET_TAGLIST', data)
  },
  set_categoryList(context, data){
    context.commit('SET_CATEGORYLIST', data)
  }
}

const getters = {
  detail: (state) => state.detail,
  searchShow: (state) => state.searchShow,
  tagId: (state) => state.tagId,
  typeId: (state) => state.typeId,
  tagList: (state) => state.tagList,
  categoryList: (state) => state.categoryList,
}

const mutations = {
  SET_DETAIL(state, data){
    state.detail = data
  },
  SET_SHOW(state, data){
      state.searchShow = data
  },
  SET_TAGID(state, data){
      state.tagId = data
  },
  SET_TYPEID(state, data){
    state.typeId = data
  },
  SET_TAGLIST(state, data){
    state.tagList = data
  },
  SET_CATEGORYLIST(state, data){
    state.categoryList = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations
};