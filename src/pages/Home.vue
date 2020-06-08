<template>
  <div class="home">
    <base-header>Bob健康小助手</base-header>
    <input-main></input-main>
    <suggest></suggest>
    <base-footer @showDrawer="showDrawer"></base-footer>
    <drawer ref="drawer" :class="[isShow]"></drawer>
  </div>
</template>

<script>
import BaseHeader from '../components/BaseHeader'
import InputMain from '../components/InputMain'
import Suggest from '../components/Suggest'
import BaseFooter from '../components/BaseFooter'
import Drawer from '../components/Drawer'

export default {
  data () {
    return {
      isShow: 'notShow'
    }
  },
  components: {
    BaseHeader,
    InputMain,
    Suggest,
    BaseFooter,
    Drawer
  },
  methods: {
    showDrawer () {
      this.isShow = 'show'
      // console.log(this.$refs, 123)
    }
  }
}
</script>

<style lang='scss' scoped>
.show {
  display: flex;
}
.notShow {
  display: none;
}
</style>
