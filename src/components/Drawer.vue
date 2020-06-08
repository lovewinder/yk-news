<template>
  <div class="drawer">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
    <div class="item">7</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='scss' scoped>
.drawer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-start;
  z-index: 9999;
  .item {
    height: 100px;
    flex: 0 0 25%;
    background-color: orange;
    padding: 0 30px;
  }
}
</style>
