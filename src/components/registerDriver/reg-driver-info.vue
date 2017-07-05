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
                                <b class="delete" @click="onDelete('imageCarFront')"></b>
                            </span>
                            <span class="img-wrapper" v-else>
                                <img src="./u647.jpg" alt="" >
                                <i>示例照片</i>
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
                                <b class="delete" @click="onDelete('imageVehicle')"></b>
                            </span>
                            <span class="img-wrapper" v-else>
                                <img src="./u630.jpg" alt="" >
                                <i>示例照片</i>
                            </span>
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>车牌号</span>
                        <span class="item-value">
                            <input type="text" v-model="plateNum">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>所有人姓名</span>
                        <span class="item-value">
                            <input type="text" v-model="ownerName">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>发动机号</span>
                        <span class="item-value">
                            <input type="text" v-model="engineNum">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&nbsp;&nbsp;</b>车辆识别代码</span>
                        <span class="item-value">
                            <input type="text" v-model="identifyCode">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>车辆类型</span>
                        <span class="item-value input-short">
                            <input type="text" v-model="vehicleType">
                            <i class="tap-btn" @click="vehicleTypeShow">
                                <b></b>
                            </i>
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>产品介质</span>
                        <span class="item-value input-short">
                            <input type="text" v-model="medium">
                            <i @click="productMediaShow" class="tap-btn">
                                <b></b>
                            </i>
                        </span>
                    </li>
                    <li class="next">
                        <button @click="skip">跳过并提交</button>
                    </li>
                    <li>
                        <button @click="toSubmit">提交</button>
                    </li>
                    <li></li>
                </ul>
            </div>
            <v-dialog :title="dialogTit" v-show="isDialogShow"></v-dialog>
            <vehicle-type v-show="isVehicleTypeShow" @vehicleType="getVehicleType"></vehicle-type>
            <product-edia v-show="isProductMediaShow" @productMedia="getProductMedia"></product-edia>
            <loading v-show="isSubmitSuccess"></loading>
        </div>
    </transition>
</template>
<script>
import BScroll from 'better-scroll';
import dialog from '../../base/dialog/dialog';
import vehicleType from './vehicle-type';
import productMedia from './product-media';
import loading from '../../base/loading/loading';
export default {
    data() {
        return {
            isSubmitSuccess:false,
            isDialogShow:false,
            dialogTit: '',
            imageCarFront: '',
            imageVehicle: '',
            plateNum: '',
            ownerName: '',
            engineNum: '',
            identifyCode: '',
            vehicleType: '',
            medium: '',
            isProductMediaShow: false,
            isVehicleTypeShow: false
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
    components: {
        'v-dialog': dialog,
        vehicleType,
        'product-edia': productMedia,
        loading
    },
    watch: {
        isDialogShow() {
            if(this.isDialogShow) {
                setTimeout(() => {
                    this.isDialogShow = false
                }, 2000);
            }
        },
        isProductMediaShow(){
            if(this.isProductMediaShow){
                document.title = '产品介质';
            }else{
                document.title = '司机认证';
            }
        },
        isVehicleTypeShow(){
            if(this.isVehicleTypeShow){
                document.title = '车辆类型';
            }else{
                document.title = '司机认证';
            }
        }
    },
    methods: {
        toSubmit() {
            if(this._checkRules(this.imageCarFront, '请上传车辆45°照片')) return;
            if(this._checkRules(this.imageVehicle, '请上传行驶证正面照')) return;
            if(this._checkRules(this.plateNum, '请填写车牌号')) return;
            if(this._checkRules(this.ownerName, '请填写所有人姓名')) return;
            if(this._checkRules(this.engineNum, '请填写发动机号')) return;
            if(this._checkRules(this.vehicleType, '请填写车辆类型')) return;
            if(this._checkRules(this.medium, '请填写产品介质')) return;
            this.isSubmitSuccess = true;
            setTimeout(() => {
                this.isSubmitSuccess = false;
                this.$router.replace('/successfully');
            }, 2000);
        },
        skip() {
            this.$router.replace('/successfully');
        },
        vehicleTypeShow() {
            this.isVehicleTypeShow = true;
        },
        productMediaShow() {
            this.isProductMediaShow = true;
        },
        getVehicleType(val) {
            this.isVehicleTypeShow = val.isShow;
            this.vehicleType = val.typeVal;
        },
        getProductMedia(val) {
            this.isProductMediaShow = val.isShow;
            this.medium = val.value;
        },
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
        _checkRules(val, tit) {
            let that = this;
            if(val == ''){
                setTimeout(() => {
                    that.isDialogShow = true;
                },100);
                this.dialogTit = tit;
                return true;
            }
        },
        onDelete(f){
            this[f] = '';
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
                            position: relative;
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
                            .tap-btn{
                                height: 40px;
                                width: 40px;
                                position: absolute;
                                display: block;
                                top: 0;
                                right: 0;
                            }
                            b{
                                position: absolute;
                                display: block;
                                right: 8px;
                                width: 24px;
                                height: 24px;
                                background: url(./next.png) no-repeat;
                                background-size: cover;
                                top: 8px;
                            }
                            .img-wrapper{
                                position: relative;
                                width: 66px;
                                height: 54px;
                                margin-left: 10px;
                                vertical-align: middle;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                                .delete{
                                    display: inline-block;
                                    position: absolute;
                                    width: 16px;
                                    height: 16px;
                                    background: #fff url(../../assets/delete.png);
                                    background-size: cover;
                                    border-radius: 50%;
                                    top: -6px;
                                    right: -6px;
                                }
                                i{
                                    position: absolute;
                                    top: 0;
                                    color: #000;
                                    font-weight: bold;
                                    width: 100%;
                                    left: 0;
                                    z-index: 99;
                                    font-size: 14px;
                                    font-style: normal;
                                    text-align: center;
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
                        button{
                            background: #A1A1A1;
                        }
                    }
                    .input-short{
                        border: 1px solid #dfdfdf;
                        input{
                            width: 80% !important;
                            border: none !important;
                        }
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