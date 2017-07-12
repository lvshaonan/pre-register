<<<<<<< HEAD
<template>
    <transition name="slider">
        <div class="product-media">
            <ul class="product-media-content" ref="wrapper">
                <li @click="select(0)" class="active">
                    沥青
                </li>
                <li @click="select(1)">
                    成品油
                </li>
                <li @click="select(2)" class="other-product">
                    <h3>其他石化产品</h3>
                    <input type="text" v-model="otherVal">
                </li>
            </ul>
            <button class="confirm-btn" @click="toConfirm">确认</button>
        </div>
    </transition>
</template>
<script>
export default {
  data() {
      return {
        otherVal: '',
        dataVal: {
            value: '沥青',
            isShow: false,
            index: 0
        },
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
            if(t == 2){
                this.dataVal.value = this.otherVal;
            }else{
                this.dataVal.value = children[t].innerText;
            }
            for(let i=0;i<children.length;i++){
                var reg = new RegExp("(\\s|^)" + 'active' + "(\\s|$)");
                children[i].className = children[i].className.replace(reg, " ");
            }
            children[t].className = 'active';
        },
        toConfirm() {
            if(this.currentIndex == 2){
                this.dataVal.value = this.otherVal;
            }
            this.dataVal.index = this.currentIndex;
            this.$emit('productMedia', this.dataVal);
        }
    },
    computed: {

    },
    components: {

    }
}
</script>
<style lang="scss" scoped>
    .product-media{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 999;
        .product-media-content{
            padding-top: 28px;
            li{
                margin: 0 auto 10px; 
                height: 36px;
                width: 94%;
                line-height: 36px;
                border: 1px solid #dfdfdf;
                border-radius: 10px;
                text-indent: 3%;
                input{
                    width: 92%;
                    height: 40px;
                    border: 1px solid #dfdfdf;
                    text-indent: 10px;
                    margin: 0 auto;
                    display: block;
                }
                &:last-child{
                    height: 80px;
                    padding-bottom: 10px;
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
        <div class="product-media">
            <ul class="product-media-content" ref="wrapper">
                <li @click="select(0)" class="active">
                    沥青
                </li>
                <li @click="select(1)">
                    成品油
                </li>
                <li @click="select(2)" class="other-product">
                    <h3>其他石化产品</h3>
                    <input type="text" v-model="otherVal">
                </li>
            </ul>
            <button class="confirm-btn" @click="toConfirm">确认</button>
        </div>
    </transition>
</template>
<script>
export default {
  data() {
      return {
        otherVal: '',
        dataVal: {
            value: '沥青',
            isShow: false
        }
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
            if(t == 2){
                this.dataVal.value = this.otherVal;
            }else{
                this.dataVal.value = children[t].innerText;
            }
            for(let i=0;i<children.length;i++){
                var reg = new RegExp("(\\s|^)" + 'active' + "(\\s|$)");
                children[i].className = children[i].className.replace(reg, " ");
            }
            children[t].className = 'active';
        },
        toConfirm() {
            if(this.currentIndex == 2){
                this.dataVal.value = this.otherVal;
            }
            this.$emit('productMedia', this.dataVal);
        }
    },
    computed: {

    },
    components: {

    }
}
</script>
<style lang="scss" scoped>
    .product-media{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        .product-media-content{
            padding-top: 28px;
            li{
                margin: 0 auto 10px; 
                height: 36px;
                width: 94%;
                line-height: 36px;
                border: 1px solid #dfdfdf;
                border-radius: 10px;
                text-indent: 3%;
                input{
                    width: 92%;
                    height: 40px;
                    border: 1px solid #dfdfdf;
                    text-indent: 10px;
                    margin: 0 auto;
                    display: block;
                }
                &:last-child{
                    height: 80px;
                    padding-bottom: 10px;
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
