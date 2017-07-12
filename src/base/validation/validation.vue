<template>
  <div class="validation">
    <div class="validation-msg">
        <h3>身份证信息认证失败</h3>
        <h3>请重新填写身份信息</h3>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  
</script>
<style scoped lang="scss">
  .validation{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.4);
    z-index: 999;
    .validation-msg{
        position: absolute;
        width: 80%;
        height: 60px;
        background: #fff;
        top: 30%;
        left: 10%;
        border-radius: 10px;
        padding: 20px 0;
        h3{
            text-align: center;
            height: 24px;
            line-height: 24px;
            font-size: 15px;
            font-weight: bold;
            color: #DB050D;
        }
    }
  }
</style>
