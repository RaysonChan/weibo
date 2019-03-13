import Vue from "vue";
import axios from 'axios';
import router from "./router";
import store from "./store";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import MintUI from "mint-ui";
Vue.use(MintUI);
Vue.prototype.axios = axios;
import {
    Header,
    Swipe,
    SwipeItem,
    Search
} from "mint-ui";
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Search.name, Search);

import "./lib/mui/css/mui.min.css";
import "./lib/mui/css/icons-extra.css";

import App from "./App.vue";
import moment from "moment";
Vue.filter("dateFormat", function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern);
});

//检测是否用户已登录
router.beforeEach((to, from, next) => {
    if (to.matched.some(m => m.meta.requireAuth)) {
        if (sessionStorage.getItem('isLogin')) {
            next();
        } else if (to.path === '/me') {
            next({
                path: '/login'
            });
            alert('检测到您还未登陆，请登录后再操作！');
        }
    } else {
        next();
    }
});




Vue.config.productionTip = false;


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')