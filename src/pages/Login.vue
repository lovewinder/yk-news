<template>
  <div class="login">
    <div class="close">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <yk-input
        placeholder="用户名/手机号码"
        v-model="username"
        :rules="/^1\d{4,10}$/"
        err-msg="输入的用户名格式错误"
      ></yk-input>
    </div>
    <div class="password">
      <yk-input
        type="password"
        placeholder="请输入密码"
        v-model="password"
        :rules="/^\d{3,22}$/"
        err-msg="输入的密码格式错误"
      ></yk-input>
    </div>
    <div class="login-btn">
      <yk-button @click="login">登录</yk-button>
    </div>
    <div class="go-register">
      没有账号? 立即
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  methods: {
    async login () {
      if (!this.username || !this.password) {
        return
      }
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      if (res.data.statusCode === 401) {
        // 全局注册时,会在Vue原型上添加一个$toast
        this.$toast.fail('用户名或密码错误')
      } else if (res.data.statusCode === 200) {
        this.$toast.success('登录成功')
        const { token, user } = res.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('user_id', user.id)
        this.$router.push('/profile')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
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
  .login-btn {
    margin-top: 20px;
  }
  .go-register {
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    margin-top: 10px;
  }
}
</style>
