<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    console.log(this.$route.query);
    // alert(this.$route.query.phone);
  }
}
</script>

<style>
  #app{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
