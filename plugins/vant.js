import Vue from "vue";
import enUS from 'vant/lib/locale/lang/en-US';
import { Pagination, Button, NavBar, Image as VanImage, Lazyload, PullRefresh, List, Popup, Switch, Toast, Tab, Tabs, Sticky, Checkbox, CheckboxGroup, Dialog, Loading, Overlay, Progress, Search, Skeleton, Locale  } from "vant";
import VueClipboard from 'vue-clipboard2';

Vue.use(Pagination).use(Button).use(NavBar).use(VanImage).use(Lazyload).use(PullRefresh).use(List).use(Popup).use(Switch).use(Toast).use(Tab).use(Tabs).use(Sticky).use(Sticky).use(Checkbox).use(CheckboxGroup).use(Dialog).use(Loading).use(Overlay).use(Progress).use(Search).use(Skeleton).use(VueClipboard);

Locale.use('en-US', enUS);
