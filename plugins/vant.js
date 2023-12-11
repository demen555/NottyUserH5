import Vue from "vue";
import enUS from "vant/es/locale/lang/en-US.js";
import zhCN from "vant/es/locale/lang/zh-CN.js";
import { Button, NavBar, Image as VanImage, Lazyload, PullRefresh, List, Popup, Switch, Toast, Tab, Tabs, Sticky, Checkbox, CheckboxGroup, Dialog, Loading, Overlay, Progress, Search, Skeleton, Locale  } from "vant";

Vue.use(Button).use(NavBar).use(VanImage).use(Lazyload).use(PullRefresh).use(List).use(Popup).use(Switch).use(Toast).use(Tab).use(Tabs).use(Sticky).use(Sticky).use(Checkbox).use(CheckboxGroup).use(Dialog).use(Loading).use(Overlay).use(Progress).use(Search).use(Skeleton)
if(process.client) {
  let navigatorLanguage = navigator.language;
  if( navigatorLanguage ){
    navigatorLanguage = navigatorLanguage.replaceAll('-', '_')
  }
  const language = localStorage.getItem("language") || navigatorLanguage ||  'en_US';
  console.log( "vantlanguage:", language )
  if(language.replace('_', '') === 'zhCN'){
    Locale.use(language, zhCN)
  } else {
    Locale.use(language, enUS)
  }
}
