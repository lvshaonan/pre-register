<template>
    <transition name="slider">
        <div class="reg-agreement">
            注册协议
        </div>
    </transition>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    created() {
        document.title = '注册协议';
    },
    methods: {
        
    }
}
</script>
<style lang="scss">
    .reg-agreement{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        .header{
            height: 44px;
            line-height: 44px;
            border-bottom: 1px solid #dfdfdf;
            text-align: center;
            font-size: 18px;
            position: relative;
            .back{
                position: absolute;
                padding: 0 16px;
                left: 0;
            }
        }
    }
    .slider-enter, .slider-leave-to{
        transform: translate3d(100%, 0, 0);
    }
    .slider-enter-active, .slider-leave-active{
        transition: all 0.2s;
    }
</style>