<template>
  <div class="dialog">
    {{title}}
  </div>
</template>
<script>
export default {
  props: {
      title: {
          type: String
      }
  }
}
</script>
<style lang="scss">
    .dialog {
        position: absolute;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        text-align: center;
        height: 34px;
        line-height: 34px;
        display: inline-block;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
        padding: 0 20px;
        border-radius: 17px;
        font-size: 14px;
    }
</style>


