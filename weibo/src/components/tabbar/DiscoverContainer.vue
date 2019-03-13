<template>
  <div class="page-discover">
    <div class="searchInput">
      <input type="search" v-model="searchName" placeholder="搜好友">
      <!-- <input type="button" class="btn searchbtn" value="搜索" @click="serach()"> -->
      <span class="mui-icon mui-icon-search searchbtn" @click="serach()"></span>
    </div>

    <!-- <div v-if="this.display">
      <ul>
        <li v-if="this.searchResultName">
          {{this.searchResultName.name}}
          <input
            type="button"
            value="关注"
            @click="follow()"
            class="right btn"
          >
        </li>
        <li v-else>您搜索的用户不存在！请重新输入</li>
      </ul>
    </div> -->

    <div v-if="this.display">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-if="this.searchResultName">
          <a href="javascript:;">
            <img class="mui-media-object mui-pull-left" src="../../assets/images/logo.jpg">
            <div class="mui-media-body">
              {{this.searchResultName.name}}
              <input
                type="button"
                value="关注"
                @click="follow()"
                class="right btn"
              >
            </div>
          </a>
        </li>
        <li class="NoUser" v-else>您搜索的用户不存在！请重新输入</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Discover",
  data() {
    return {
      searchName: "",
      display: false,
      name: sessionStorage.getItem("name")
    };
  },
  methods: {
    ...mapMutations(["searchUser", "followUser"]),
    serach() {
      this.display = true;
      this.searchUser({ name: this.searchName });
    },
    follow() {
      if (this.name) {
        this.followUser({ _id: this.searchResultName._id, name: this.name });
      } else {
        alert("您当前还未登陆账号，请登录后再重试！");
      }
    }
  },
  computed: {
    ...mapState(["searchResultName", "followUserMessage"])
  }
};
</script>

<style lang="scss">
.page-discover {
  .searchInput {
    // position: relative;
    margin-top: 5px;
  }
  .searchbtn {
    position: absolute;
    right: 2px;
    top: 54px;
    z-index: 99;
  }
  ul {
    position: relative;
  }
  ul li {
    list-style: none;
    vertical-align: middle;
    border:0;
  }
  .right {
    position: absolute;
    right: 1.5rem;
  }
  .btn {
    color: #fff;
    background-color: rgba(255, 165, 0, 0.8);
  }
  .NoUser{
    background-color: #EFEFF4;
    height: 50px;
    line-height: 50px;
    text-align: center;
    vertical-align: middle;
  }
}
</style>
