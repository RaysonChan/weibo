<template>
  <div>
    <div v-for="(item, index) in this.messages" :key="index">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p>{{item.date | dateFormat}}</p>
            <p style="color: #333;">{{item.message}}</p>
          </div>
        </div>
        <div class="mui-card-footer">
          <a class="mui-card-link">赞-{{item.like}}</a>
          <a class="mui-card-link">查看更多</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["messages"])
  }
};
</script>

<style lang="scss" scoped>
img {
  height: 50vw;
}
.mui-card-link {
  color: orange;
}
</style>