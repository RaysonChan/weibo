<template>
  <div>
    <div class="mui-card">
      <div class="mui-card-header mui-card-media">
        <img src="../../assets/images/logo.jpg">
        <div class="mui-media-body">
          {{this.comment.name}}
          <p>发表于 {{this.comment.data | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-content">
        <h1>{{this.comment.article}}</h1>
      </div>
      <div class="mui-card-footer">
        <a class="mui-card-link">分享</a>
        <a class="mui-card-link">评论-{{this.comment.comment.length}}</a>
        <a class="mui-card-link" @click="getLikeLength($event,item)">
          <span v-if="bool">赞-{{this.comment.like.length}}</span>
          <span v-else>赞-{{likecount}}</span>
        </a>
      </div>
    </div>

    <comment-box></comment-box>
  </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      bool: true
    };
  },
  created() {},
  methods: {
    ...mapMutations(["addLike", "addCount"]),
    getLikeLength(e, item) {
      if (this.bool) {
          console.log(item);
        this.addLike(item.like.length);
        this.bool = false;
      } else {
        this.addCount();
      }
    }
  },
  computed: {
    ...mapState(["comment", "likecount"])
  },
  components: {
    "comment-box": comment
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

