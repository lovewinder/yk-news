<template>
  <div class="edit-profile">
    <yk-header>编辑资料</yk-header>
    <div class="box">
      <div class="avatar">
        <img v-show="loading" :src="avatar" alt />
        <van-uploader :after-read="afterRead" />
      </div>
      <yk-cell-nav @click="showNickname" name="昵称" :desc="profile.nickname"></yk-cell-nav>
      <yk-cell-nav @click="showPassword" name="密码" desc="******"></yk-cell-nav>
      <yk-cell-nav @click="showGender" name="性别" :desc="profile.gender===1?'男':'女'"></yk-cell-nav>
    </div>
    <van-dialog v-model="isShowNickname" title="修改昵称" show-cancel-button @confirm="editNickname">
      <van-field v-model="nickname"></van-field>
    </van-dialog>
    <van-dialog v-model="isShowPassword" title="修改密码" show-cancel-button @confirm="editPassword">
      <van-field v-model="password" type="password"></van-field>
    </van-dialog>
    <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm="editGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0" :name="0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <div v-show="isShowMask" class="mask">
      <vueCropper
        ref="cropper"
        :img="option.img"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
      ></vueCropper>
      <van-button type="primary" @click="crop">裁剪</van-button>
    </div>
  </div>
</template>

<script>
import img from '../asset/avatar.jpg'
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
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
      loading: false,
      isShowNickname: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowGender: false,
      gender: 0,
      isShowMask: false,
      option: {
        img: '', // 这个img应该要是上传的那张图片，只不过现在我写死了
        // info: true, // 裁剪框的大小信息
        // outputSize: 1, // 裁剪生成图片的质量
        // outputType: 'jpeg', // 裁剪生成图片的格式
        // canScale: true, // 图片是否允许滚轮缩放,移动端不支持
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 150, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [4, 4] // 截图框的宽高比例
      }
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    // 可以把图片的base64编码转成一个file文件
    convertBase64UrlToBlob (urlData) {
      const bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      const ab = new ArrayBuffer(bytes.length)
      const ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/jpeg' })
    },
    // 图片裁剪方法
    crop () {
      // vue中ref与$ref的使用
      this.$refs.cropper.getCropData(async imgData => {
        // 将裁剪后的图片转成file文件,才能上传到服务器
        const file = this.convertBase64UrlToBlob(imgData)
        if (file.type !== 'image/jpeg' && file.file.type !== 'image/gif') {
          this.$toast.fail('修改失败,只支持jpg格式的图片')
          return
        }

        if (file.size / 1024 / 1024 >= 20) {
          this.$toast.fail('修改失败,上传图片不能超过20MB')
          return
        }
        const fd = new FormData()
        // 参数1: name属性,后端用于获取文件,由接口决定
        // 参数2: 需要上传你的文件
        fd.append('file', file)

        const res = await this.$axios.post('/upload', fd)

        // 文件上传只负责上传文件,文件上传成功后,需要获取到上传图片的地址,发送请求修改数据库中的头像地址
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.editProfile({ head_img: data.url })
          this.$toast.success('头像修改成功')
        }
        this.isShowMask = false
      })
    },
    async getProfile () {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('user_id')
      const res = await this.$axios.get(`/user/${userId}`, {
        headers: {
          Authorization: token
        }
      })
      this.profile = res.data.data
      this.loading = true
    },

    // 用于修改个人信息
    // data是需要修改的数据
    async editProfile (data) {
      const userId = localStorage.getItem('user_id')
      const res = await this.$axios.post(`user_update/${userId}`, data)

      if (res.data.statusCode === 200) {
        // 修改昵称成功
        // 重新渲染页面
        this.$toast.success(res.data.message)
        this.getProfile()
      }
    },
    showNickname () {
      console.log('show nickname')
      this.isShowNickname = true
      console.log(this.isShowNickname)
      this.nickname = this.profile.nickname
    },
    showPassword () {
      this.isShowPassword = true
      this.password = this.profile.password
    },
    showGender () {
      this.isShowGender = true
      this.gender = this.profile.gender
    },
    editNickname () {
      this.editProfile({ nickname: this.nickname })
    },
    editPassword () {
      this.editProfile({ password: this.password })
    },
    editGender () {
      this.editProfile({ gender: this.gender })
    },
    async afterRead (file) {
      // after-read 代表上传后的回调函数, 通过这个函数可以获取到文件
      // uploader组件不会自动帮我们上传图片, 需要自己手动上传至服务器
      // 这个组件能获取到上传文件的相关信息
      this.isShowMask = true
      // 设置需要裁剪的图片为上传的图片
      this.option.img = file.content
    }
  }
}
</script>

<style lang='scss' scoped>
.edit-profile {
  .box {
    padding: 0 20px;
    .avatar {
      padding: 30px 0;
      position: relative;
      img {
        width: 70px;
        height: 70px;
        margin: 0 auto;
        border-radius: 50%;
      }
      .van-uploader {
        position: absolute;
        left: 50%;
        top: 30px;
        transform: translateX(-50%);
        opacity: 0;
      }
    }
  }
  .van-dialog {
    padding: 10px;
    .van-field {
      border: 1px solid #ccc;
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
    .van-button {
      position: fixed;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
