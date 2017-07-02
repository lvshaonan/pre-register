<template>
    <div class="welcome" ref="scrollWrapper">
        <div v-if="sliderData.length">
            <slider ref="slider" :loop="false" :bounce="false">
                <div class="slider-item">
                    <img src="../assets/1.jpg" alt="">
                </div>
                <div class="slider-item">
                    <img src="../assets/2.jpg" alt="">
                </div>
                <div class="slider-item">
                    <img src="../assets/3.jpg" alt="">
                    <router-link to="/registerUser" tag="button" class="enter" replace>欢迎</router-link>
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
                sliderData: imgData
            }
        },
        methods: {

        },
        components: {
            slider
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
        }
    }
</style>