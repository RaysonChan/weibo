<template>
  <div class="page-login">
    <div class="mui-content">
      <img src="../../assets/images/logo.jpg" alt>
      <form id="login-form" class="mui-input-group">
        <div class="mui-input-row">
          <label>账号</label>
          <input
            id="account"
            type="text"
            v-model="email"
            class="mui-input-clear mui-input"
            placeholder="请输入账号"
          >
        </div>
        <div class="mui-input-row mui-password">
          <label>密码</label>
          <input id='password' type="password" v-model="password" class="mui-input-clear mui-input" placeholder="请输入密码">
        </div>
      </form>
      <div class="mui-content-padded">
        <button
          id="login"
          type="button"
          class="mui-btn mui-btn-block mui-btn-warning"
          @click="login()"
        >登录</button>
        <div class="link-area">
          <router-link to="/me/register" id="reg">注册账号</router-link>
          <span class="spliter">|</span>
          <a id="forgetPassword">忘记密码</a>
        </div>
      </div>
      <div class="mui-content-padded oauth-area"></div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      //邮箱
      email: "",
      //密码
      password: ""
    };
  },
  methods: {
    //点击按钮时触发
    login() {
      this.axios
        .post("/api/login", {
          //post请求的查询字符串
          email: this.email,
          password: this.password
        })
        .then(res => {
          //取得响应数据的数据并把它存储在data中
          const data = res.data;
          //用户名错误
          if (data.code == 110) {
            alert(data.message);
          }
          //用户密码正确
          if (data.code == 111) {
            alert(data.message);
            //存储用户的姓名到session中
            this.$store.commit("setStorage", data);
            this.$store.commit("setLogin", { isLogin: true });
            //登录成功跳转到首页
            this.$router.push("/");
          }
          //密码错误
          if (data.code == 112) {
            alert(data.message);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-content {
  margin-top: 80px;
}
.area {
  margin: 20px auto 0px auto;
}

.mui-input-group {
  margin-top: 10px;
}

.mui-input-group:first-child {
  margin-top: 20px;
}

.mui-input-group label {
  width: 22%;
}

.mui-input-row label ~ input,
.mui-input-row label ~ select,
.mui-input-row label ~ textarea {
  width: 78%;
}

.mui-checkbox input[type="checkbox"],
.mui-radio input[type="radio"] {
  top: 6px;
}

.mui-content-padded {
  margin-top: 25px;
}

.mui-btn {
  padding: 10px;
}

.link-area {
  display: block;
  margin-top: 25px;
  text-align: center;
}

.spliter {
  color: #bbb;
  padding: 0px 8px;
}

.oauth-area {
  position: absolute;
  bottom: 20px;
  left: 0px;
  text-align: center;
  width: 100%;
  padding: 0px;
  margin: 0px;
}

.oauth-area .oauth-btn {
  display: inline-block;
  width: 50px;
  height: 50px;
  background-size: 30px 30px;
  background-position: center center;
  background-repeat: no-repeat;
  margin: 0px 20px;
  /*-webkit-filter: grayscale(100%); */
  border: solid 1px #ddd;
  border-radius: 25px;
}

.oauth-area .oauth-btn:active {
  border: solid 1px #aaa;
}

.oauth-area .oauth-btn.disabled {
  background-color: #ddd;
}
a,
router-link {
  color: orange;
}
img {
  width: 60px;
  height: 60px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
