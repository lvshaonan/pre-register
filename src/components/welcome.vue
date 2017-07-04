<template>
    <div class="welcome" ref="scrollWrapper">
        <div v-if="sliderData.length">
            <slider ref="slider" :loop="false" :bounce="false">
                <div class="slider-item">
                    <img src="../assets/bg.jpg" alt="">
                    <transition name="fadeLeft">
                        <div class="car" v-show="isCarShow">
                            <img src="../assets/car.png" alt="">
                        </div>
                    </transition>
                    <transition name="fadeIn">
                        <div class="phone" v-show="isPhoneShow">
                            <img src="../assets/手机.gif" alt="">
                        </div>
                    </transition>
                </div>
                <div class="slider-item">
                    <img src="../assets/1.jpg" alt="">
                    <router-link to="/regDriver" tag="button" class="enter" replace>欢迎</router-link>
                </div>
            </slider>
        </div>
    </div>
</template>
<script>
    import slider from '../base/slider/slider.vue';
    import imgData from '../assets/data.js';
    export default {
        data() {
            return {
                sliderData: imgData,
                isCarShow: false,
                isPhoneShow: false
            }
        },
        methods: {

        },
        components: {
            slider
        },
        mounted() {
            this.isCarShow = true;
            this.isPhoneShow = true;
        }
    }
</script>
<style lang="scss">
    
    .welcome{
        height: 100%;
        .slider-item{
            position: relative;
            .enter{
                position: absolute;
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                bottom: 20%;
                left: 50%;
                margin-left: -50px;
                background: #f66;
                border: none;
                border-radius: 5px;
                color: #fff;
            }
            .car{
                position: absolute;
                width: 60%;
                height: 30%;
                top: 33%;
                left: 20%;
                img{
                    width: 100%;
                }
            }
            .phone{
                width: 50%;
                position: absolute;
                bottom: 14%;
                left: 25%;
                img{
                    width: 100%;
                }
            }
        }
    }
    .fadeLeft-leave-active, .fadeLeft-enter-active{
        transition: all 1.3s;
    }   
    .fadeLeft-enter, .fadeLeft-leave-to{
        transform: translate3d(100%, 0, 0);
    }
    .fadeIn-leave-active, .fadeIn-enter-active{
        transition: all 2s;
    }   
    .fadeIn-enter, .fadeIn-leave-to{
        opacity: 0;
    }
</style>