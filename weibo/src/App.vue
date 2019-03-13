<template>
  <div class="app-container">
    <header class="mui-bar mui-bar-nav">
      <a
        class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"
        @click="goBack"
        v-show="flag"
      ></a>
      <h1 id="title" class="mui-title">微博</h1>
    </header>

    <transition>
      <router-view></router-view>
    </transition>

    <nav class="mui-bar mui-bar-tab" v-show="$route.meta.navShow==undefined||$route.meta.navShow">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/msg">
        <span class="mui-icon mui-icon-email">
          <span class="mui-badge">{{this.messages.length}}</span>
        </span>
        <span class="mui-tab-label">消息</span>
      </router-link>
      <router-link class="mui-tab-item" to="/post">
        <span class="mui-icon mui-icon-plusempty"></span>
      </router-link>
      <router-link class="mui-tab-item" to="/discover">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">发现</span>
      </router-link>
      <router-link class="mui-tab-item" to="/me">
        <span class="mui-icon mui-icon-person-filled"></span>
        <span class="mui-tab-label">我</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      flag: false
    };
  },
  created() {
    this.flag = this.$route.path === "/home" ? false : true;
    this.getMessage();
  },
  methods: {
    ...mapMutations(["getMessage"]),
    goBack() {
      // 点击后退
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapState(["messages"])
  },
  watch: {
    "$route.path": function(newVal) {
      if (
        newVal === "/home" ||
        newVal === "/msg" ||
        newVal === "/discover" ||
        newVal === "/me" ||
        newVal === "/login"
      ) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  padding-top: 44px;
  padding-bottom: 52px;
  overflow: hidden;
  .mui-icon-plusempty {
    width: 52px;
    height: 52px;
    top: -2px;
    color: white;
    background-color: orange;
    font-size: 52px;
  }
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.mui-active,
a,
router-link {
  color: orange;
}
.mint-header {
  background-color: #f7f7f7;
  color: #929292;
}
</style>
