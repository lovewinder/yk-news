<template>
  <div class="baseFooter">
    <div class="input-container">
      <cube-input class="inputValue" v-model="value"></cube-input>
      <cube-button class="buttonValue">发 送</cube-button>
    </div>
    <div class="skills-container" @click="showDrawer">skills</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '12'
    }
  },
  methods: {
    showDrawer () {
      this.$emit('showDrawer')
      // this.$refs.drawer.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.baseFooter {
  display: flex;
  color: #000;
  background-color: #fff;
  padding-left: 10px;
  height: 40px;
  .input-container {
    flex: 0 0 86%;
    display: flex;
    height: 30px;
    line-height: 40px;
    margin-top: 5px;
    border-radius: 50px;
    background-color: #f3f3f3;
    .inputValue {
      flex: 0 0 75%;
      margin-left: 20px;
      height: 30px;
      ::v-deep .cube-input-field {
        background-color: #f3f3f3;
        height: 30px;
        outline: none;
      }
    }
    .buttonValue {
      flex: 0 0 14%;
      height: 30px;
      padding: 0;
      color: #ff9c77;
      font-size: 14px;
      background-color: #f3f3f3;
    }
  }
  .skills-container {
    flex: 0 0 14%;
    text-align: center;
    line-height: 40px;
  }
}
</style>
