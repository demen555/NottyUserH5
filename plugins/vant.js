import Vue from "vue";
import { Button, NavBar, Image as VanImage, Lazyload, PullRefresh, List, Popup, Switch, Toast, Tab, Tabs, Sticky, Checkbox, CheckboxGroup, Dialog, Loading, Overlay, Progress, Search, Skeleton, Locale  } from "vant";
import VueClipboard from 'vue-clipboard2';

Vue.use(Button).use(NavBar).use(VanImage).use(Lazyload).use(PullRefresh).use(List).use(Popup).use(Switch).use(Toast).use(Tab).use(Tabs).use(Sticky).use(Sticky).use(Checkbox).use(CheckboxGroup).use(Dialog).use(Loading).use(Overlay).use(Progress).use(Search).use(Skeleton).use(VueClipboard);
if(process.client) {
  Locale.use('en_US', require('vant/es/locale/lang/en-US.js'))
}
