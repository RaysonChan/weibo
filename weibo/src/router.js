import Vue from "vue";
import Router from "vue-router";

import HomeContainer from './components/tabbar/HomeContainer.vue';
import MsgContainer from './components/tabbar/MsgContainer.vue';
import PostContainer from './components/tabbar/PostContainer.vue';
import DiscoverContainer from './components/tabbar/DiscoverContainer.vue';
import MeContainer from './components/tabbar/MeContainer.vue';

import MyWeibo from './components/me/MyWeibo.vue';
import login from './components/me/login.vue';
import register from './components/me/register.vue';
import MyFollow from './components/me/MyFollow.vue';
import MyFollower from './components/me/MyFollower.vue';
import vip from './components/me/vip.vue';
import chat from './components/me/chat.vue';
import setting from './components/me/setting.vue';
import comment from './components/subcomponents/comment.vue';
import weiboinfo from './components/weibos/weiboinfo.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:HomeContainer},
    {path:'/msg',component:MsgContainer},
    {path:'/post',component:PostContainer},
    {path:'/discover',component:DiscoverContainer},
    {path:'/me',meta:{requireAuth: true},component:MeContainer},
    {path:'/login',meta: {navShow: false},component:login},
    {path:'/me/register',meta: { navShow: false},component:register},
    {path:'/me/MyWeibo',meta: { navShow: false},component:MyWeibo},
    {path:'/me/MyFollow',meta: { navShow: false},component:MyFollow},
    {path:'/me/MyFollower',meta: { navShow: false},component:MyFollower},
    {path:'/me/vip',meta: { navShow: false},component:vip},
    {path:'/me/chat',meta: { navShow: false},component:chat},
    {path:'/me/setting',meta: { navShow: false},component:setting},
    {path:'/subcomponents/comment',meta: { navShow: false},component:comment},
    {path:'/weibos/weiboinfo',meta: { navShow: false},component:weiboinfo}
  ],
   linkActiveClass:'mui-active'
});
