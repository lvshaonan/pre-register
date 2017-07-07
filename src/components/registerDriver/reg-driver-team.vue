<template>
    <transition name="slider">
        <div class="reg-personal">
            <div class="reg-personal-content" ref="scrollWrapper">
                <ul>
                    <li class="input-img">
                        <span class="item"><b>&lowast;</b>身份证正面照</span>
                        <span class="item-value">
                            <a href="javascript:" class="input-img-btn" v-on:click="addPicFront">+</a>
                            <input type="file" @change="onFileFrontChange" multiple style="display: none;" ref="onFileFrontChange" accept="image/*">
                            <span class="img-wrapper" v-if="imageFront">
                                <img :src="imageFront" alt="" >
                                <b class="delete" @click="onDelete('imageFront')"></b>
                            </span>
                            <span class="img-wrapper" v-else>
                                <img src="./u111.png" alt="" >
                                <i>示例照片</i>
                            </span>
                        </span>
                    </li>
                    <li class="input-img">
                        <span class="item"><b>&lowast;</b>身份证反面照</span>
                        <span class="item-value">
                            <a href="javascript:" class="input-img-btn" v-on:click="addPicReverse">+</a>
                            <input type="file" @change="onFileReverseChange" multiple style="display: none;" ref="onFileReverseChange" accept="image/*">
                            <span class="img-wrapper" v-if="imageReverse">
                                <img :src="imageReverse" alt="" >
                                <b class="delete" @click="onDelete('imageReverse')"></b>
                            </span>
                            <span class="img-wrapper" v-else>
                                <img src="./u125.jpg" alt="" >
                                <i>示例照片</i>
                            </span>
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>姓名</span>
                        <span class="item-value">
                            <input type="text" v-model="name">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>身份证号</span>
                        <span class="item-value">
                            <input type="text" v-model="userId">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&nbsp;&nbsp;</b>地址</span>
                        <span class="item-value">
                            <input type="text" v-model="address">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&nbsp;&nbsp;</b>有效期</span>
                        <span class="item-value">
                            <date-picker @sendDate="getuserIdvalidity"></date-picker>
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>联系电话</span>
                        <span class="item-value">
                            <input type="number" v-model="phoneNum">
                        </span>
                    </li>
                    <li class="submit-li">
                        <button class="submit" @click="toSubmit">下一步</button>
                    </li>
                    <li></li>
                </ul>
            </div>
            <v-dialog :title="dialogTit" v-show="isDialogShow"></v-dialog>
            <loading v-show="isLoadingShow"></loading>
        </div>
    </transition>
</template>
<script>
import BScroll from 'better-scroll';
import dialog from '../../base/dialog/dialog';
import loading from '../../base/loading/loading';
import datePicker from '../../base/datePicker/datePicker';
export default {
    data() {
        return {
            isDialogShow:false,
            isLoadingShow: false,
            dialogTit: '',
            imageFront: '',
            imageReverse: '',
            imageBusinessLicense: '',
            imageDangerous: '',
            imageRoad: '',
            companyName: '',
            licenseCode: '',
            legalPerson: '',
            name: '',
            userId: '',
            address: '',
            phoneNum: ''
        }
    },
    created() {
        document.title = '车队认证';
    },
    mounted() {
        this.$nextTick(() => {
            this._initScroll();
        });
    },
    components: {
        'v-dialog': dialog,
        loading,
        datePicker
    },
    watch: {
        isDialogShow() {
            if(this.isDialogShow) {
                setTimeout(() => {
                    this.isDialogShow = false
                }, 2000);
            }
        }
    },
    methods: {
        toSubmit() {
            if(this._checkRules(this.imageFront, '请上传身份证正面照')) return;
            if(this._checkRules(this.imageReverse, '请上传身份证背面照')) return;
            if(this._checkRules(this.name, '请填写姓名')) return;
            if(this._checkRules(this.userId, '请填写身份证号')){
                return;
            }else if(this.userId.length != 18){
                setTimeout(() => {
                    this.isDialogShow = true;
                },100);
                this.dialogTit = '请填写18位身份证号';
                return;
            }
            if(this._checkRules(this.phoneNum, '请填写联系电话')) return;
            //ajax...
            this.isLoadingShow = true;
            setTimeout(() => {
                this.isLoadingShow = false;
                this.$router.push('/enterpriseInfo');
            }, 1500);
        },
        getDangerousValidity(val) {
            this.DangerousValidity = val;
        },
        getuserIdvalidity(val) {
            this.userIdvalidity = val;
        },
        getyingyeValidity(val) {
            this.yingyeValidity = val;
        },
        getRoadValidity(val) {
            this.RoadValidity = val;
        },
        _initScroll() {
            this.scroll = new BScroll(this.$refs.scrollWrapper, {
                click: true
            });
        },
        onDelete(f){
            this[f] = '';
        },
        addBusinessLicense(e){
            e.preventDefault();
            this.$refs.onBusinessLicenseChange.click();
            return false;
        },
        addPicFront(e){
            e.preventDefault();
            this.$refs.onFileFrontChange.click();
            return false;
        },
        addPicReverse(e){
            e.preventDefault();
            this.$refs.onFileReverseChange.click();
            return false;
        },
        addDangerous(e) {
            e.preventDefault();
            this.$refs.onFileDangerousChange.click();
            return false;
        },
        addRoad(e){
            e.preventDefault();
            this.$refs.onFileRoadChange.click();
            return false;
        },
        onBusinessLicenseChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files, 'BusinessLicense');
        },
        onFileFrontChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files, 'front');
        },
        onFileReverseChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files, 'reverse');
        },
        onFileDangerousChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files, 'dangerous');
        },
        onFileRoadChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files, 'road');
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
                if(flag == 'front'){
                    that.imageFront = e.target.result;
                }else if(flag == 'reverse'){
                    that.imageReverse = e.target.result;
                }else if(flag == 'BusinessLicense'){
                    that.imageBusinessLicense = e.target.result;
                }else if(flag == 'dangerous'){
                    that.imageDangerous = e.target.result;
                }else if(flag == 'road'){
                    that.imageRoad = e.target.result;
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
                            flex: 3.6;
                            b{
                                color: #f00;
                                padding-right: 5px;
                            }
                        }
                        &.item-value{
                            height: 100%;
                            width: 64%;
                            flex: 6.4;
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
                    &.submit-li{
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