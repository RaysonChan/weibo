import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        isLogin: false,
        articles: [],
        messages: [],
        weibos: [],
        follows: [],
        fans: [],
        comment: [],
        content: [],
        searchResultName: '',
        followUserMessage: '',
        likecount:0

    },
    mutations: {
        //设置登录状态
        setLogin(state, payload) {
            state.isLogin = payload.isLogin;
            sessionStorage.setItem('isLogin', payload.isLogin);
        },
        //设置用户名到session中
        setStorage(state, user) {
            state.user.name = user.name;
            sessionStorage.setItem('name', user.name);
        },
        //清除登录状态
        removeStorage(state) {
            state.user = {};
            state.isLogin = false;
            sessionStorage.removeItem('isLogin');
            sessionStorage.removeItem('name');
        },
        getArticle(state, condition) {
            Vue.prototype.axios.post('/api/', {
                isPublic: condition.isPublic,
                name: condition.name
            }).then(function (res) {
                state.articles = res.data;
            })
        },
        //获取服务器发送的默认消息
        getMessage(state) {
            Vue.prototype.axios.get('/api/msg').then((res) => {
                state.messages = res.data;
            })
        },
        //获取粉丝用户
        getFan(state, fan) {
            Vue.prototype.axios.post('/api/me/MyFollower', {
                name: fan.name
            }).then(function (res) {
                state.fans = res.data;
            })
        },
        //获取关注用户
        getFollow(state, follow) {
            Vue.prototype.axios.post('/api/me/MyFollow', {
                name: follow.name
            }).then(function (res) {
                state.follows = res.data;
            })
        },
        //获取个人微博的文章
        getWeibo(state, name) {
            Vue.prototype.axios.post('/api/me/MyWeibo', {
                name: name.name
            }).then(function (res) {
                state.weibos = res.data;
            })
        },
        //用户发表文章
        postArticle(state, article) {
            Vue.prototype.axios.post('/api/post', {
                article: article.article,
                name: article.name,
                isPublic: false
            }).then(function (res) {
                console.log(res.data);
            })
        },
        //获取comment的数据
        getComment2(state, payload) {
            state.comment = payload.comment;
        },
        //获取文章评论内容
        getContent(state) {
            Vue.prototype.axios.post('/api/weibos/weiboinfo', {
                comment: state.comment.comment
            }).then(function (res) {
                state.content = res.data;
            })
        },
        //发表评论内容
        postContent1(state, payload) {
            Vue.prototype.axios.post('/api/postContent', payload).then(function (res) {
                console.log(res.data);
            })
        },
        //分享文章
        shareArticle(state, payload) {
            Vue.prototype.axios.post('/api/share', payload.item).then(function (res) {
                console.log(res.data);
            })
        },
        //搜索用户
        searchUser(state, payload) {
            Vue.prototype.axios.post('api/searchUser', payload).then(function (res) {
                state.searchResultName = res.data;
            })
        },
        //关注用户
        followUser(state, payload) {
            Vue.prototype.axios.post('/api/followUser', payload).then(function (res) {
                console.log(res.data);
            })
        },
        //增加点赞数量
        addLike(state,length){
            state.likecount = length +1;
        },
        //增加点赞数量
        addCount(state){
            state.likecount ++;
        },
        deleteArticle1(state,payload){
            Vue.prototype.axios.post('/api/me/remove',payload).then(function (res) {
                state.weibos = res.data;
            })
        }
    },
    actions: {}
});