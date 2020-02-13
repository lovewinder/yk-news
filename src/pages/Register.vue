<template>
  <div class="register">
    <div class="close" @click="$router.go(-1)">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <yk-input
        placeholder="用户名/手机号码"
        v-model="form.username"
        :rules="/^1\d{4,10}$/"
        err-msg="输入的用户名格式错误"
      ></yk-input>
    </div>
    <div class="nickname">
      <yk-input
        placeholder="请输入昵称"
        v-model="form.nickname"
        :rules="/^[\u4e00-\u9fa5]{3,8}$/"
        err-msg="昵称必须是3-8位的中文"
      ></yk-input>
    </div>
    <div class="password">
      <yk-input type="password" placeholder="请输入密码" v-model="form.password" :rules="/^\d{3,12}$/" err-msg="输入的密码称格式错误"></yk-input>
    </div>
    <div class="register-btn">
      <yk-button @click="register">注册</yk-button>
    </div>
    <div class="go-login">
      已有账号?立即<router-link to='/login'>登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        nickname: '',
        password: ''
      }
    }
  },
  methods: {
    async register () {
      if (!this.form.username || !this.form.password || !this.form.nickname) {
        return
      }
      const res = await this.$axios.post('http://localhost:3000/register', this.form)

      const { data } = res
      if (data.statusCode === 401) {
        this.$toast.fail(data.message)
      } else if (data.statusCode === 200) {
        this.$toast.success(data.message)
        this.$router.push({
          name: 'login',
          params: {
            username: this.form.username,
            password: this.form.password
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  padding: 20px;
  .close {
    i {
      font-size: 27px;
    }
  }
  .logo {
    text-align: center;
    i {
      font-size: 126px;
      color: #d81e06;
    }
  }
  .register-btn {
    margin-top: 20px;
  }
  .go-login {
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    margin-top: 10px;
  }
}
</style>
