<template>
  <div class="page-me">
    <!-- <header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-pull-left">添加好友</a>
			<h1 id="title" class="mui-title">我</h1>
      <a class="mui-action-back mui-icon mui-pull-right">设置</a>
    </header>-->
    <div class="data-header">
      <div class="header-top">
        <img src="../../assets/images/logo.jpg" class="header-top-left">
        <div class="header-top-center">
          <span class="username">{{this.userName}}</span>
        </div>
        <div class="header-top-right">
          <!-- <img src="../../images/logo.png" alt="" /> -->
          <router-link to="/me/vip" tag="span">👑会员中心 ></router-link>
        </div>
      </div>
      <div class="header-bottom">
        <router-link to="/me/MyWeibo" tag="span" class="header-btn">
          <span class="btn-up">{{this.weibos.length}}</span>
          <span class="btn-down">微博</span>
        </router-link>
        <router-link to="/me/MyFollow" tag="span" class="header-btn">
          <span class="btn-up">{{this.follows.length}}</span>
          <span class="btn-down">关注</span>
        </router-link>
        <router-link to="/me/MyFollower" tag="span" class="header-btn">
          <span class="btn-up">{{this.fans.length}}</span>
          <span class="btn-down">粉丝</span>
        </router-link>
      </div>
    </div>

    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">账号与安全</a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">新消息通知</a>
      </li>
    </ul>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">通用</a>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">隐私</a>
      </li>
    </ul>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">问题反馈</a>
      </li>
      <li class="mui-table-view-cell">
        <router-link to="/me/chat" class="mui-navigate-right">客服中心</router-link>
      </li>
      <li class="mui-table-view-cell">
        <a class="mui-navigate-right">关于微博</a>
      </li>
    </ul>
    <div class="btmbtn">
      <router-link to="/login">
        <button type="button" class="mui-btn mui-btn-warning mui-btn-block mui-btn-outlined">切换账号</button>
      </router-link>
      <button type="button" class="mui-btn mui-btn-danger mui-btn-block" @click="logOut()">退出微博</button>
    </div>
  </div>
</template>

<script>
import mHead from "../subcomponents/head.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "me",
  components: { mHead },
  data() {
    return {
      userName: sessionStorage.getItem("name"),
    };
  },
  created() {
    let name = sessionStorage.getItem("name");
    this.getWeibo({ name: name });
    this.getFollow({ name: name });
    this.getFan({ name: name });
  },
  methods: {
    ...mapMutations(["removeStorage", "getWeibo", "getFollow", "getFan"]),
    //退出登录
    logOut() {
      this.removeStorage();
      if (window.confirm("你确定要退出当前账户吗？")) {
        this.$router.push("/");
      }
    }
  },
  computed: {
    ...mapState(["weibos", "user", "follows", "fans"])
  }
};
</script>

<style lang="scss">
.page-me {
  .data-header {
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .data-header .header-top {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0.5rem;
    box-sizing: border-box;
  }
  .data-header .header-top .header-top-left {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  .data-header .header-top .header-top-center {
    flex: 1;
    height: 4rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 0.6rem;
  }
  .data-header .header-top .header-top-center .userintro {
    font-size: 0.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #a0a0a0;
  }
  .data-header .header-top .header-top-right {
    width: 5.5rem;
    display: flex;
    align-items: center;
  }
  .data-header .header-top .header-top-right img {
    width: 1.4rem;
    height: 1.4rem;
    display: inline-block;
  }
  .data-header .header-top .header-top-right span {
    font-size: 0.8rem;
    color: orange;
  }
  .data-header .header-bottom {
    width: 100%;
    border-top: 1px solid #e6e6e6;
    display: flex;
    padding: 0.5rem 0;
  }
  .data-header .header-bottom .header-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .data-header .header-bottom .header-btn .btn-down {
    color: #a0a0a0;
    font-size: 0.8rem;
  }
  .mui-account {
    height: 80px;
    padding-top: 18px;
  }
  .mui-grid-view.mui-grid-9 {
    height: 50px;
    background-color: #fff;
    border: none;
    img {
      width: 60px;
      height: 60px;
    }
    li {
      padding: 0;
    }
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }
  .mui-table-view {
    margin-bottom: 10px;
    li a {
      font-size: 14px;
    }
  }
  .mui-btn {
    padding: 6px 0 6px 0;
  }
  .btmbtn {
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style>