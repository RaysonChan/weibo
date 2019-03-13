<template>
  <div class="page-home">
    <div v-if="!isLogin">
      <div class="mui-card" v-for="(item, index) in this.articles" :key="index">
        <div class="mui-card-header mui-card-media">
          <img src="../../assets/images/logo.jpg">
          <div class="mui-media-body">
            {{item.name}}
            <p>发表于 {{item.data | dateFormat}}</p>
          </div>
        </div>
        <div class="mui-card-content">
          <h1>{{item.article}}</h1>
        </div>
        <div class="mui-card-footer">
          <a class="mui-card-link" @click="share(item)">分享</a>
          <router-link to="/weibos/weiboinfo" class="mui-card-link">
            <span @click="getComment1($event,item)">评论-{{item.comment.length}}</span>
          </router-link>
          <a class="mui-card-link" @click="getLikeLength($event,item)">
            <span v-if="bool">赞-{{item.like.length}}</span>
            <span v-else>赞-{{likecount}}</span>
          </a>
        </div>
      </div>
    </div>

    <div v-else v-for="(item, index) in this.articles" :key="index">
      <div class="mui-card" v-for="(item1, index1) in item" :key="index1">
        <div class="mui-card-header mui-card-media">
          <img src="../../assets/images/logo.jpg">
          <div class="mui-media-body">
            {{item1.name}}
            <p>发表于 {{item1.data | dateFormat}}</p>
          </div>
        </div>
        <div class="mui-card-content">
          <h1>{{item1.article}}</h1>
        </div>
        <div class="mui-card-footer">
          <a class="mui-card-link" @click="share(item1)">分享</a>
          <router-link to="/weibos/weiboinfo" class="mui-card-link">
            <span @click="getComment1($event,item1)">评论-{{item1.comment.length}}</span>
          </router-link>
          <a class="mui-card-link" @click="getLikeLength($event,item1)">
            <span v-if="bool">赞-{{item1.like.length}}</span>
            <span v-else>赞-{{likecount}}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  created() {
    if (!this.isLogin) {
      this.getArticle({ isPublic: true });
    } else {
      this.getArticle({ name: this.name });
    }
  },
  data() {
    return {
      isLogin: sessionStorage.getItem("isLogin"),
      name: sessionStorage.getItem("name"),
      bool: true
    };
  },
  methods: {
    ...mapMutations([
      "getArticle",
      "getLike",
      "getComment2",
      "shareArticle",
      "addLike",
      "addCount"
    ]),
    getLikeLength(e, item) {
      if (this.bool) {
        this.addLike(item.like.length);
        this.bool = false;
      } else {
        this.addCount();
      }
    },
    getComment1(e, item) {
      this.getComment2({ comment: item });
    },
    share(item) {
      this.shareArticle({ item });
    }
  },
  computed: {
    ...mapState(["articles", "likecount"])
  }
};
</script>

<style lang="scss" scoped>
.mui-card-link {
  color: orange;
}
h1 {
  font-size: 16px;
  font-weight: 300;
  padding: 5px;
}
.mui-card-content{
  padding: 10px;
  h1{
    font-style: "苹方";
    font-size: 18px;
    text-indent : 20px;
    letter-spacing:2px;
  }
}
</style>