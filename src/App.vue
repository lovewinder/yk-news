<template>
  <div id="app">
    <!-- 匹配到的组件被keep-alive包裹了,所以这个组件就不会被销毁
    include用于指定 需要被缓存的组件的名字
    exclude用于指定 不需要被缓存的组件的名字
    -->
    <!-- <keep-alive include="home">
      <router-view></router-view>
    </keep-alive> -->
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
#app{
    height: 100vh
  }
</style>
