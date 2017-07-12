<template>
    <transition name="slider">
        <div class="reg-success">
            <div class="reg-success-content">
                <div class="bg">
                    <img src="../assets/successful.png">
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import BScroll from 'better-scroll';
export default {
    data() {
        return {

        }
    },
    created() {
        document.title = '注册成功';
    },
    methods: {
    },
    mounted() {
    }
}
</script>
<style lang="scss">
    .reg-success{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        .reg-success-content{
            .bg{
                position: absolute;
                width: 60%;
                height: 100%;
                left: 20%;
                top: 40px;
                img{
                    width: 100%;
                }
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