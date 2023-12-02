import Vue from 'vue';
import Vuex from 'vuex';
import type from './type';
import user from './user';

Vue.use(Vuex);
const store = () => new Vuex.Store({
  modules: {
    user,
    type
  }
});
export default store