<template>
  <div class="test">
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
</template>

<script>
import { VueCropper } from 'vue-cropper'
import img from '../asset/avatar.jpg'
export default {
  components: {
    // 局部注册了图片裁剪插件
    VueCropper
  },
  data () {
    return {
      src: '',
      option: {
        img: img, // 这个img应该要是上传的那张图片，只不过现在我写死了
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
  methods: {
    crop () {
      // vue中ref与$ref的使用
      this.$refs.cropper.getCropData(data => {
        this.src = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 // 需要指定父盒子的高度,因为这个插件基于父盒子高度的100%
 .test{
   position: fixed;
   width: 100%;
   height: 100%;
   z-index: 999;
   top:0;
   left:0;
   .van-button{
     position: fixed;
     bottom: 10px;
     left: 50%;
     transform: translateX(-50%)
   }
 }
</style>
