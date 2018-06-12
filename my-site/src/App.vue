<template>
  <div id="app">
    <div class="layout-bg">
    </div>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "assets/style/index.scss";
  #app {
    height: 100%;
  }

  .layout-bg {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: url("./images/background-code2.png") no-repeat fixed top;
    background-size: cover;
    opacity: 0.1;
    filter: blur(2px);
  }
</style>
