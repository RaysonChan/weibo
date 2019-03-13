<template>
  <div class="page-home">
    <div class="mui-card" v-for="(item, index) in this.weibos" :key="index">
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
        <a class="mui-card-link">
          <span @click="deleteArticle(item)">删除</span>
        </a>
        <router-link to="/weibos/weiboinfo" class="mui-card-link">
          <span @click="getcom(item)">评论-{{item.comment.length}}</span>
        </router-link>
        <a class="mui-card-link" @click="getLikeLength($event,item)">
          <span v-if="bool">赞-{{item.like.length}}</span>
          <span v-else>赞-{{likecount}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      bool: true
    };
  },
  created() {
    var name = sessionStorage.getItem("name");
    this.getWeibo({ name: name });
  },
  methods: {
    ...mapMutations([
      "getWeibo",
      "getComment2",
      "addLike",
      "addCount",
      "deleteArticle1"
    ]),
    getcom(item) {
      this.getComment2({ comment: item });
    },
    getLikeLength(e, item) {
      if (this.bool) {
        this.addLike(item.like.length);
        this.bool = false;
      } else {
        this.addCount();
      }
    },
    deleteArticle(item) {
      console.log(item);
      this.deleteArticle1(item);
    }
  },
  computed: {
    ...mapState(["weibos", "likecount"])
  }
};
</script>

<style lang="scss" scoped>
.mui-card-link {
  color: orange;
}
// h1 {
//   font-size: 16px;
//   padding: 5px;
// }
.mui-card-content {
  padding: 10px;
  h1 {
    font-style: "苹方";
    font-size: 18px;
    text-indent: 20px;
    letter-spacing: 2px;
    font-weight: 300;
  }
}
</style>

