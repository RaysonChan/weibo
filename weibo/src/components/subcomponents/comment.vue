<template>
  <div class="page-comments">
    <div style="margin: 5px 5px;">
      <textarea rows="4" placeholder="写下您的评论..." v-model="textValue"></textarea>
      <button
        type="button"
        class="mui-btn mui-btn-warning"
        style="height:34px"
        @click="postContent()"
      >✈发布</button>
    </div>
    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
      <li class="mui-table-view-cell" v-for="(item, index) in this.content" :key="index">
        <div class="mui-table">
          <div class="mui-table-cell mui-col-xs-10">
            <img class="mui-media-object mui-pull-left" src="../../assets/images/logo.jpg">
            <div class="mui-media-body">
              <h4 class="user">{{item.name}}</h4>
              <p>{{item.content}}</p>
              <div class="cmtbtm">
                <div class="mui-table-cell mui-col-xs-2 mui-text-left">
                  <span class="mui-h5">{{item.date | dateFormat}}</span>
                </div>
                <div class="mui-table-cell mui-col-xs-2 mui-text-right">
                  <a class="mui-icon-extra mui-icon-extra-comment mui-h5">{{item.comment}}</a>
                  <a class="mui-icon-extra mui-icon-extra-like mui-h5">{{item.like}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      textValue: ""
    };
  },
  created() {
    this.getContent();
  },
  methods: {
    ...mapMutations(["getContent", "postContent1"]),
    postContent() {
      let isLogin = sessionStorage.getItem("isLogin");
      if (!isLogin) {
        alert("您当前还没有登录账号，请登录后再重试！");
        if (confirm("现在要跳转到登录页面吗？")) {
          this.$router.push("/login");
        }
      } else {
        if (this.textValue.length == 0) {
          alert("评论内容不能为空，请重新输入！");
          return;
        }
        this.postContent1({
          name: sessionStorage.getItem("name"),
          content: this.textValue,
          like: 0,
          comment: 0,
          articleID: this.comment._id
        });
        alert("发表评论成功！");
        this.$router.push("/");
      }
    }
  },
  computed: {
    ...mapState(["content", "comment"])
  }
};
</script>

<style lang="scss">
.page-comments {
  form {
    height: 144px;
    textarea {
      margin: 0;
    }
    button {
      float: right;
    }
  }
  ul {
    // margin-top: -12px;
    img {
      border-radius: 50%;
    }
    h4.user {
      font-size: 14px;
      color: orange;
    }
    .cmtbtm {
      padding: 2px;

      .mui-icon-extra {
        font-size: 14px;
      }
    }
  }
  button{
    margin-top: -14px;
    right: -290px;
  }
}
</style>
