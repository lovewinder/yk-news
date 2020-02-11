<template>
  <div class="login">
    <div class="close">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <yk-input placeholder="请输入用户名" v-model="username" :rules="/^1\d{4,10}$/" err-msg="输入的用户名格式错误"></yk-input>
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
      <yk-button @click="login">注册</yk-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      if (!this.username || !this.password) {
        return
      }
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      console.log(res)
      if (res.data.statusCode === 401) {
        console.log('用户名')
      } else if (res.data.statusCode === 200) {
        console.log('succese')
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
}
</style>
