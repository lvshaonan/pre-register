<template>
  <div class="loading">
    <img width="40" height="40" src="./loading.gif">
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    // props: {
    //   title: {
    //     type: String,
    //     default: '正在载入...'
    //   }
    // }
  }
</script>
<style scoped lang="scss">
  .loading{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.2);
    z-index: 999;
    img{
      position: absolute;
      top: 40%;
      left: 50%;
      margin-left: -20px;
    }
  }
</style>
