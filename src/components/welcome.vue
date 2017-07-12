<<<<<<< HEAD
<template>
    <div class="welcome" ref="scrollWrapper">
        <slider ref="slider" :loop="false" :bounce="false" @sendIndex="getIndex">
            <div class="slider-item">
                <img src="../assets/bg.jpg" alt="">
                <transition name="fadeLeft">
                    <div class="car" v-show="isCarShow">
                        <img src="../assets/car.png" alt="">
                    </div>
                </transition>
                <transition name="fadeIn">
                    <div class="phone" v-show="isPhoneShow" @click="toNext">
                        <img src="../assets/phone.gif" alt="">
                    </div>
                </transition>
            </div>
            <div class="slider-item">
                <img src="../assets/bg2.jpg" alt="">
                <transition name="btnFade">
                    <router-link to="/registerUser" tag="div" class="owner" v-show="isBtnShow" replace>
                        <img src="../assets/btn_03.png" alt="">
                    </router-link>
                </transition>
                <transition name="btnFade1">
                    <router-link to="/regDriver" tag="div" class="driver" v-show="isBtnShow" replace>
                        <img src="../assets/btn_06.png" alt="">
                    </router-link>
                </transition>
            </div>
        </slider>
    </div>
</template>
<script>
    import slider from '../base/slider/slider.vue';
    export default {
        data() {
            return {
                isCarShow: false,
                isPhoneShow: false,
                isBtnShow: false,
                currentPageIndex: 0
            }
        },
        methods: {
            getIndex(val) {
                this.currentPageIndex = val;
            },
            toNext() {
                this.$refs.slider.nextPage();
            }
        },
        components: {
            slider
        },
        mounted() {
            this.isCarShow = true;
            this.isPhoneShow = true;
        },
        watch: {
            currentPageIndex() {
                if(this.currentPageIndex){
                    this.isBtnShow = true;
                    this.isCarShow = false;
                    this.isPhoneShow = false;
                }else{
                    this.isBtnShow = false;
                    this.isCarShow = true;
                    this.isPhoneShow = true;
                }
            }
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
            .owner, .driver{
                width: 56%;
                top: 40%;
                left: 22%;
                position: absolute;
                img{
                    width: 100%;
                }
            }
            .driver{
                top: 60%;
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
    .btnFade-leave-active, .btnFade-enter-active{
        transition: all 0.8s;
    }   
    .btnFade-enter, .btnFade-leave-to{
        opacity: 0;
    }
    .btnFade1-leave-active, .btnFade1-enter-active{
        transition: all 2.8s;
    }   
    .btnFade1-enter, .btnFade1-leave-to{
        opacity: 0;
    }
=======
<template>
    <div class="welcome" ref="scrollWrapper">
        <slider ref="slider" :loop="false" :bounce="false" @sendIndex="getIndex">
            <div class="slider-item">
                <img src="../assets/bg.jpg" alt="">
                <transition name="fadeLeft">
                    <div class="car" v-show="isCarShow">
                        <img src="../assets/car.png" alt="">
                    </div>
                </transition>
                <transition name="fadeIn">
                    <div class="phone" v-show="isPhoneShow" @click="toNext">
                        <img src="../assets/phone.gif" alt="">
                    </div>
                </transition>
            </div>
            <div class="slider-item">
                <img src="../assets/bg2.jpg" alt="">
                <transition name="btnFade">
                    <router-link to="/registerUser" tag="div" class="owner" v-show="isBtnShow" replace>
                        <img src="../assets/btn_03.png" alt="">
                    </router-link>
                </transition>
                <transition name="btnFade1">
                    <router-link to="/regDriver" tag="div" class="driver" v-show="isBtnShow" replace>
                        <img src="../assets/btn_06.png" alt="">
                    </router-link>
                </transition>
            </div>
        </slider>
    </div>
</template>
<script>
    import slider from '../base/slider/slider.vue';
    export default {
        data() {
            return {
                isCarShow: false,
                isPhoneShow: false,
                isBtnShow: false,
                currentPageIndex: 0
            }
        },
        methods: {
            getIndex(val) {
                this.currentPageIndex = val;
            },
            toNext() {
                this.$refs.slider.nextPage();
            }
        },
        components: {
            slider
        },
        mounted() {
            this.isCarShow = true;
            this.isPhoneShow = true;
        },
        watch: {
            currentPageIndex() {
                if(this.currentPageIndex){
                    this.isBtnShow = true;
                    this.isCarShow = false;
                    this.isPhoneShow = false;
                }else{
                    this.isBtnShow = false;
                    this.isCarShow = true;
                    this.isPhoneShow = true;
                }
            }
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
            .owner, .driver{
                width: 56%;
                top: 40%;
                left: 22%;
                position: absolute;
                img{
                    width: 100%;
                }
            }
            .driver{
                top: 60%;
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
    .btnFade-leave-active, .btnFade-enter-active{
        transition: all 0.8s;
    }   
    .btnFade-enter, .btnFade-leave-to{
        opacity: 0;
    }
    .btnFade1-leave-active, .btnFade1-enter-active{
        transition: all 2.8s;
    }   
    .btnFade1-enter, .btnFade1-leave-to{
        opacity: 0;
    }
>>>>>>> 6045335339b92ce7a4904f53d26a48b1de2137f1
</style>