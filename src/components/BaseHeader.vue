<template>
  <div class="base-header">
    <span class="title">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {}
</script>

<style lang='scss' scoped>
.base-header {
  height: 50px;
  border: 1px #ccc solid;
  text-align: center;
  line-height: 50px;

  .title {
    font-weight: 600;
    font-size: 18px;
    color: #030303;
  }

  z-index: 1;
}
</style>
