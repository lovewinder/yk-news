<template>
  <div class="follow">
    <yk-header>我的关注</yk-header>
    <div class="item" v-for="item in followList" :key="item.id">
      <div class="left">
        <img :src="$axios.defaults.baseURL + item.head_img" />
      </div>
      <div class="center">
        <p class="name">{{item.nickname}}</p>
        <p class="time">{{item.create_data | time}}</p>
      </div>
      <div class="right" @click="unfollow(item.id)">取消关注</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      followList: {}
    }
  },
  created () {
    this.getFollowList()
    // this.follow(8)
    // this.follow(3)
  },
  methods: {
    async getFollowList () {
      const res = await this.$axios.get('/user_follows')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.followList = data
      }
    },
    async unfollow (id) {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '你确定要取关该用户么'
        })
        // 发送请求,取消关注
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        const { statusCode } = res.data
        if (statusCode === 200) {
          this.$toast.success('取关成功')
          this.getFollowList()
        }
      } catch {
        this.$toast('取消操作')
      }
    },
    async follow (id) {
      const res = await this.$axios.get(`/user_follows/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.getFollowList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.follow {
  .item {
    border-bottom: 1px solid #ccc;
    display: flex;
    padding: 20px;
    align-items: center;
    .left {
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
      }
    }
    .center {
      flex: 1;
      padding-left: 10px;
      .name {
        font-size: 18px;
        color: #000;
      }
      .time {
        color: #999;
        font-size: 14px;
      }
    }
    .right {
      height: 30px;
      line-height: 30px;
      background-color: #ddd;
      padding: 0 10px;
      border-radius: 15px;
      color: #000;
    }
  }
}
</style>
