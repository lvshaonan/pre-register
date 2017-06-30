<template>
    <transition name="slider">
        <div class="reg-personal">
            <div class="reg-personal-content" ref="scrollWrapper">
                <ul>
                    <li class="input-img">
                        <span class="item"><b>&lowast;</b>车辆45°照片</span>
                        <span class="item-value">
                            <a href="javascript:" class="input-img-btn" v-on:click="addCarFront">+</a>
                            <input type="file" @change="onCarFrontChange" multiple style="display: none;" ref="onCarFrontChange" accept="image/*">
                            <span class="img-wrapper" v-if="imageCarFront">
                                <img :src="imageCarFront" alt="" >
                            </span>
                        </span>
                    </li>
                    <li class="input-img">
                        <span class="item"><b>&lowast;</b>行驶证正面照</span>
                        <span class="item-value">
                            <a href="javascript:" class="input-img-btn" v-on:click="addVehicle">+</a>
                            <input type="file" @change="onFileVehicleChange" multiple style="display: none;" ref="onFileVehicleChange" accept="image/*">
                            <span class="img-wrapper" v-if="imageVehicle">
                                <img :src="imageVehicle" alt="" >
                            </span>
                        </span>
                    </li>
                    
                    <li>
                        <span class="item"><b>&lowast;</b>车牌号</span>
                        <span class="item-value">
                            <input type="text">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>所有人姓名</span>
                        <span class="item-value">
                            <input type="text">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>发动机号</span>
                        <span class="item-value">
                            <input type="text">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&nbsp;&nbsp;</b>车辆识别代码</span>
                        <span class="item-value">
                            <input type="text">
                        </span>
                    </li>
                    <li class="next">
                        <button>跳过并提交</button>
                    </li>
                    <li>
                        <button>提交</button>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>
<script>
import BScroll from 'better-scroll';
export default {
    data() {
        return {
            imageCarFront: '',
            imageVehicle: ''
        }
    },
    created() {
        document.title = '司机认证';
    },
    mounted() {
        this.$nextTick(() => {
            this._initScroll();
        });
    },
    methods: {
        _initScroll() {
            this.scroll = new BScroll(this.$refs.scrollWrapper, {
                click: true
            });
        },
        addVehicle(e){
            e.preventDefault();
            this.$refs.onFileVehicleChange.click();
            return false;
        },
        addCarFront(e){
            e.preventDefault();
            this.$refs.onCarFrontChange.click();
            return false;
        },
        addPicReverse(e){
            e.preventDefault();
            this.$refs.onFileReverseChange.click();
            return false;
        },
        onFileVehicleChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files, 'vehicle');
        },
        onCarFrontChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files, 'carFront');
        },
        createImage(file, flag) {
            if (typeof FileReader === 'undefined') {
                alert('您的浏览器不支持图片上传，请升级您的浏览器');
                return false;
            }
            let image = new Image();
            let that = this;
            let leng = file.length;
            let reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.onload = function (e) {
                if(flag == 'carFront'){
                    that.imageCarFront = e.target.result;
                }else if(flag == 'vehicle'){
                    that.imageVehicle = e.target.result;
                }
            };
        },
        uploadImage: function () {
            console.log(this.images);
            return false;
            var obj = {};
            obj.images = this.images
            // $.ajax({
            //     type: 'post',
            //     url: "upload.php",
            //     data: obj,
            //     dataType: "json",
            //     success: function(data) {
            //         if(data.status){
            //             alert(data.msg);
            //             return false;
            //         }else{
            //             alert(data.msg);
            //             return false;
            //         }
            //     }
            //   });
        }
    }
}
</script>
<style lang="scss" scoped>
    .reg-personal{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        .reg-personal-content{
            overflow: hidden;
            flex: 1;
            ul{
                width: 94%;
                padding: 20px 3% 0;
                li{
                    height: 40px;
                    line-height: 40px;
                    font-size: 0;
                    margin-bottom: 10px;
                    display: flex;
                    &.input-img{
                        height: 54px;
                        line-height: 54px;
                    }
                    span{
                        display: inline-block;
                        &.item{
                            width: 35%;
                            font-size: 12px;
                            flex: 3;
                            b{
                                color: #f00;
                                padding-right: 5px;
                            }
                        }
                        &.item-value{
                            height: 100%;
                            width: 64%;
                            flex: 7;
                            input{
                                width: 100%;
                                height: 100%;
                                box-sizing: border-box;
                                border: 1px solid #dfdfdf;
                                text-indent: 10px;
                                display: inline-block;
                                font-size: 12px;
                            }
                            .input-img-btn{
                                width: 54px;
                                height: 54px;
                                border: 1px solid #dfdfdf;
                                text-align: center;
                                box-sizing: border-box;
                                display: inline-block;
                                font-size: 24px;
                                vertical-align: middle;
                            }
                            .img-wrapper{
                                width: 66px;
                                height: 54px;
                                margin-left: 10px;
                                vertical-align: middle;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                    }
                    button{
                        height: 100%;
                        width: 100%;
                        border: none;
                        color: #fff;
                        font-size: 14px;
                        background: #FF6633;
                        &.later{
                            background:#A1A1A1;
                        }
                    }
                    &.next{
                        padding-top: 20px;
                    }
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