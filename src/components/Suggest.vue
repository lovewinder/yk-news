<template>
  <div class="suggest">
    <cube-scroll
      ref="scroll"
      :data="items"
      direction="horizontal"
      class="horizontal-scroll-list-wrap"
    >
      <ul class="list-wrapper">
        <li v-for="(item,index) in items" class="list-item" :key="index">{{ item }}</li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        '😀 😁 😂 🤣 😃 🙃 ',
        '👈🏻 scroll 👉🏻 ',
        '🙂 🤔 😄 🤨 😐 🙃 ',
        '👈🏻 scroll 👉🏻 ',
        '😔 😕 🙃 🤑 😲 ☹️ ',
        '👈🏻 scroll 👉🏻 ',
        '🐣 🐣 🐣 🐣 🐣 🐣 ',
        '👈🏻 scroll 👉🏻 ',
        '🐥 🐥 🐥 🐥 🐥 🐥 ',
        '👈🏻 scroll 👉🏻 ',
        '🤓 🤓 🤓 🤓 🤓 🤓 ',
        '👈🏻 scroll 👉🏻 ',
        '🦔 🦔 🦔 🦔 🦔 🦔 ',
        '👈🏻 scroll 👉🏻 ',
        '🙈 🙈 🙈 🙈 🙈 🙈 ',
        '👈🏻 scroll 👉🏻 ',
        '🚖 🚖 🚖 🚖 🚖 🚖 ',
        '👈🏻 scroll 👉🏻 ',
        '✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 '
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.suggest {
  color: #000;
}
.horizontal-scroll-list-wrap {
  height: 45px;
  border: 0px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  ::v-deep .cube-scroll-content {
    display: inline-block;
  }
  ::v-deep .list-wrapper {
    padding: 0 10px;
    line-height: 45px;
    white-space: nowrap;
  }
  ::v-deep .list-item {
    display: inline-block;
  }
}
</style>
