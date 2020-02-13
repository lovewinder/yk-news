<template>
  <div class="profile">
    <div class="user-info" @click="$router.push('/edit-profile')">
      <div class="avatar">
        <img v-show="loading" :src="avatar" alt />
      </div>
      <div class="info">
        <p>
          <i v-if="profile.gender" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
          <span>{{profile.nickname}}</span>
        </p>
        <p>{{profile.create_date | time}}</p>
      </div>
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="list">
      <yk-cell-nav name="我的关注" desc="关注的用户" @click="$router.push('/follow')"></yk-cell-nav>
      <yk-cell-nav name="我的跟帖" desc="跟帖/回复"></yk-cell-nav>
      <yk-cell-nav name="我的收藏" desc="文章/视频"></yk-cell-nav>
      <yk-cell-nav name="设置" desc="" @click="$router.push('/edit-profile')"></yk-cell-nav>
      <yk-cell-nav name='退出登录' @click='logout'></yk-cell-nav>
    </div>
  </div>
</template>

<script>
import img from '../asset/avatar.jpg'
export default {
  computed: {
    avatar () {
      if (this.profile.head_img) {
        return this.$axios.defaults.baseURL + this.profile.head_img
      } else {
        return img
      }
    }
  },
  data () {
    return {
      profile: {},
      loading: false
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确定要退出本系统吗'
        })
        // await只会等成功的结果,如果promise失败了,会抛出异常
        // 可以使用try...catch语法
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch {
        this.$toast('操作取消')
      }
    }
  },
  async created () {
    const userId = localStorage.getItem('user_id')
    const res = await this.$axios.get(`/user/${userId}`)
    this.loading = true
    if (res.data.statusCode === 200) {
      this.profile = res.data.data
    } else {
      console.log('验证失败')
    }
  }
}
</script>

<style lang='scss' scoped>
.profile {
  .user-info {
    display: flex;
    padding: 20px;
    border-bottom: 5px solid #ccc;
    .avatar {
      width: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .icon {
      width: 30px;
      i {
        line-height: 70px;
      }
    }
    .info {
      flex: 1;
      margin-left: 10px;
      p:first-child {
        height: 30px;
        line-height: 30px;
        font-size: 18px;
      }
      p:last-child {
        font-size: 14px;
        color: #999;
      }
      .iconxingbienan {
        color: skyblue;
      }
      .iconxingbienv {
        color: pink;
      }
    }
  }
  .list {
    padding: 0 20px;
  }
}
</style>
