<template>
  <div class="input-main">
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll" :data="items" :options="options"></cube-scroll>
    </div>
  </div>
</template>

<script>
const _data = [
  '😀 😁 😂 🤣 😃 😄 😀 😁 😂 🤣 😃 😄',
  '🙂 🤗 🤩 🤔 🤨 😐 ',
  '👆🏻 scroll up/down 👇🏻 ',
  '😔 😕 🙃 🤑 😲 ☹️ ',
  '🐣 🐣 🐣 🐣 🐣 🐣 ',
  '👆🏻 scroll up/down 👇🏻 ',
  '🐥 🐥 🐥 🐥 🐥 🐥 ',
  '🤓 🤓 🤓 🤓 🤓 🤓 ',
  '👆🏻 scroll up/down 👇🏻 ',
  '🦔 🦔 🦔 🦔 🦔 🦔 ',
  '🙈 🙈 🙈 🙈 🙈 🙈 ',
  '👆🏻 scroll up/down 👇🏻 ',
  '🚖 🚖 🚖 🚖 🚖 🚖 ',
  '✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 '
]
export default {
  data () {
    return {
      items: _data
    }
  }
}
</script>

<style lang='scss' scoped>
.input-main {
  color: #000;
  .scroll-list-wrap {
    height: 530px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    overflow: hidden;
    border-bottom: 0;
    // ::v-deep .cube-scroll-wrapper {
    //   padding-bottom: 150px;
    // }
  }
}
</style>
