<template>
  <div class="page-post">
    <form action method="get">
      <textarea name id rows="18" placeholder="分享新鲜事..." v-model="article" @click="login()"></textarea>
      <div class="postbtm">
        <a type="button" class="mui-icon mui-icon-image"></a>
        <!-- <a type="button" class="mui-icon mui-icon-camera"></a>
        <a type="button" class="mui-icon mui-icon-location-filled"></a>-->
        <button type="button" class="mui-btn mui-btn-warning" @click="postArticles(article,name)">发布</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      name: sessionStorage.getItem("name"),
      isLogin:sessionStorage.getItem('isLogin'),
      article: ""
    };
  },
  methods: {
    ...mapMutations(["postArticle"]),
    login(){
        if(!this.isLogin){
          alert('您当前还未登陆账号，请登录后再重试');
          this.$router.push('/')
          return;
      }
    },
    postArticles(article, name) {
      article = this.article;
      name = this.name;
      if(article.length == 0){
          window.alert('文章内容不能为空！请重新输入');
          return;
      }else if(!(article.length > 5)){
          window.alert('文章内容字数要大于5！请重新输入');
          return;
      }
      if (window.confirm("确定要发表该文章吗？")) {
        this.postArticle({ article: article, name: name });
        window.alert('发表成功！');
        this.$router.push('/me/MyWeibo');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
textarea {
  margin: 0;
}
.postbtm {
  padding-left: 10px;
  padding-right: 10px;

  a {
    color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  a:hover {
    color: orange;
  }
  button {
    float: right;
  }
}
</style>

