<<<<<<< HEAD
<template>
    <transition name="slider">
        <div class="vehicle-type">
            <ul class="vehicle-type-content" ref="wrapper">
                <li @click="select(0)" class="active">
                    <span>罐车</span>
                    <img src="./guanche.png" alt="">
                </li>
                <li @click="select(1)">
                    <span>板车</span>
                    <img src="./banche.png" alt="">
                </li>
                <li @click="select(2)">
                    <span>高栏车</span>
                    <img src="./gaolanche.png" alt="">
                </li>
                <li @click="select(3)">
                    <span>集装箱</span>
                    <img src="./jizhuangxiang.png" alt="">
                </li>
                <li @click="select(4)">
                    <span>其他</span>
                    <input type="text" placeholder="请输入其他车型" v-model="otherVal">
                </li>
                <button class="confirm-btn" @click="toConfirm">确认</button>
                <li style="border:none;height: 20px;"></li>
            </ul>
        </div>
    </transition>
</template>
<script>
export default {
  data() {
      return {
        typeData: {
            typeVal: '罐车',
            isShow: false,
            index:0
        },
        otherVal: '',
        currentIndex: 0
      }
    },
    created() {
    },
    methods: {
        select(t){
            this._tab(t);
            this.currentIndex = t;
        },
        _tab(t) {
            let children = this.$refs.wrapper.children;
            if(t == 4){
                this.typeData.typeVal = this.otherVal;
            }else{
                this.typeData.typeVal = children[t].innerText;
            }
            for(let i=0;i<children.length;i++){
                var reg = new RegExp("(\\s|^)" + 'active' + "(\\s|$)");
                children[i].className = children[i].className.replace(reg, " ");
            }
            children[t].className = 'active';
        },
        toConfirm() {
            if(this.currentIndex == 4){
                this.typeData.typeVal = this.otherVal;
            }
            this.typeData.index = this.currentIndex;
            this.$emit('vehicleType', this.typeData);
        }
    },
    computed: {

    },
    components: {

    }
}
</script>
<style lang="scss" scoped>
    .vehicle-type{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background-color: #fff;
        .vehicle-type-content{
            padding-top: 28px;
            li{
                margin: 0 auto 10px; 
                height: 80px;
                width: 94%;
                border: 1px solid #dfdfdf;
                border-radius: 10px;
                span{
                    display: inline-block;
                    height: 100%;
                    width: 26%;
                    float: left;
                    line-height: 80px;
                    text-align: center;
                }
                img{
                    width: 66px;
                    height: 66px;
                    margin-top: 8px;
                }
                input{
                    margin-top: 24px;
                    vertical-align: middle;
                    width: 60%;
                    height: 30px;
                    border: 1px solid #dfdfdf;
                    text-indent: 10px;
                }
                &.active{
                    border-color: #F66936;
                }
            }
        }
        .confirm-btn{
            width: 94%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color: #fff;
            font-size: 14px;
            border: none;
            background: #F66936;
            margin: 20px auto;
            display: block;
        }
    }
    .slider-enter, .slider-leave-to{
        transform: translate3d(100%, 0, 0);
    }
    .slider-enter-active, .slider-leave-active{
        transition: all 0.2s;
    }
</style>


=======
<template>
    <transition name="slider">
        <div class="vehicle-type">
            <ul class="vehicle-type-content" ref="wrapper">
                <li @click="select(0)" class="active">
                    <span>罐车</span>
                    <img src="./guanche.png" alt="">
                </li>
                <li @click="select(1)">
                    <span>板车</span>
                    <img src="./banche.png" alt="">
                </li>
                <li @click="select(2)">
                    <span>高栏车</span>
                    <img src="./gaolanche.png" alt="">
                </li>
                <li @click="select(3)">
                    <span>集装箱</span>
                    <img src="./jizhuangxiang.png" alt="">
                </li>
                <li @click="select(4)">
                    <span>其他</span>
                    <input type="text" placeholder="请输入其他车型" v-model="otherVal">
                </li>
                <button class="confirm-btn" @click="toConfirm">确认</button>
                <li style="border:none;height: 20px;"></li>
            </ul>
        </div>
    </transition>
</template>
<script>
export default {
  data() {
      return {
        typeData: {
            typeVal: '罐车',
            isShow: false
        },
        otherVal: '',
        currentIndex: 0
      }
    },
    created() {
    },
    methods: {
        select(t){
            this._tab(t);
            this.currentIndex = t;
        },
        _tab(t) {
            let children = this.$refs.wrapper.children;
            if(t == 4){
                this.typeData.typeVal = this.otherVal;
            }else{
                this.typeData.typeVal = children[t].innerText;
            }
            for(let i=0;i<children.length;i++){
                var reg = new RegExp("(\\s|^)" + 'active' + "(\\s|$)");
                children[i].className = children[i].className.replace(reg, " ");
            }
            children[t].className = 'active';
        },
        toConfirm() {
            if(this.currentIndex == 4){
                this.typeData.typeVal = this.otherVal;
            }
            this.$emit('vehicleType', this.typeData);
        }
    },
    computed: {

    },
    components: {

    }
}
</script>
<style lang="scss" scoped>
    .vehicle-type{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        .vehicle-type-content{
            padding-top: 28px;
            li{
                margin: 0 auto 10px; 
                height: 80px;
                width: 94%;
                border: 1px solid #dfdfdf;
                border-radius: 10px;
                span{
                    display: inline-block;
                    height: 100%;
                    width: 26%;
                    float: left;
                    line-height: 80px;
                    text-align: center;
                }
                img{
                    width: 66px;
                    height: 66px;
                    margin-top: 8px;
                }
                input{
                    margin-top: 24px;
                    vertical-align: middle;
                    width: 60%;
                    height: 30px;
                    border: 1px solid #dfdfdf;
                    text-indent: 10px;
                }
                &.active{
                    border-color: #F66936;
                }
            }
        }
        .confirm-btn{
            width: 94%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color: #fff;
            font-size: 14px;
            border: none;
            background: #F66936;
            margin: 20px auto;
            display: block;
        }
    }
    .slider-enter, .slider-leave-to{
        transform: translate3d(100%, 0, 0);
    }
    .slider-enter-active, .slider-leave-active{
        transition: all 0.2s;
    }
</style>


>>>>>>> 6045335339b92ce7a4904f53d26a48b1de2137f1
