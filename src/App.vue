<<<<<<< HEAD
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
    if(this.$route.query.shared_first_user != undefined){
      localStorage.setItem('xiaohei_shared_first_user', this.$route.query.shared_first_user);
    }
    if(this.$route.query.shared_second_user != undefined){
      localStorage.setItem('xiaohei_shared_second_user', this.$route.query.shared_second_user);
    }
  }
}
</script>

<style>
  #app{
    height: 100%;
    width: 100%;
    /*overflow: hidden;*/
  }
</style>
=======
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
>>>>>>> 6045335339b92ce7a4904f53d26a48b1de2137f1
