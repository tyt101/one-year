<template>
  <div id="app">
    <nav>
      <!-- <router-link to="/import">导入 Excel 数据</router-link> | <router-link to="/export">导出 Excel 文件</router-link> | -->
      <router-link to="/export">导出 Excel 文件</router-link> | <router-link to="/exportcsv">导出大数据</router-link>|
      <router-link to="/anchor">锚点</router-link>|
      <router-link to="/video">视频播放</router-link>
    </nav>
    <keep-alive>
      <router-view>
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      </router-view>
    </keep-alive>
    <!-- <router-view v-if="!$route.meta?.keepAlive"></router-view> -->
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
