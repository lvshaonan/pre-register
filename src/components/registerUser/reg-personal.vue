<template>
    <transition name="slider">
        <div class="reg-personal">
            <div class="reg-personal-content">
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
                                <span class="img-upload" v-show="isUpload">
                                    <i></i>
                                </span>
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
                                <span class="img-upload" v-show="isUpload1">
                                    <i></i>
                                </span>
                            </span>
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>姓名</span>
                        <span class="item-value">
                            <input type="text" v-model="userName">
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
                        <span class="item"><b>&nbsp;&nbsp;</b>身份证有效期</span>
                        <span class="item-value">
                            <date-picker @sendDate="getValidity"></date-picker>
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>联系电话</span>
                        <span class="item-value">
                            <input type="number" v-model="phoneNum">
                        </span>
                    </li>
                    <li class="submit-li">
                        <button class="submit" @click="toSubmit">提交</button>
                    </li>
                    <li></li>
                </ul>
            </div>
            <v-dialog :title="dialogTit" v-show="isDialogShow"></v-dialog>
            <loading v-show="isSubmitSuccess"></loading>
        </div>
    </transition>
</template>
<script>
import dialog from '../../base/dialog/dialog';
import datePicker from '../../base/datePicker/datePicker';
import loading from '../../base/loading/loading';
import axios from 'axios';
import {api} from '../../api/api.js';
import {imgPreview} from '../../common/js/compress.js';
export default {
    data() {
        return {
            isSubmitSuccess: false,
            imageFront: '',
            imageFrontFinal: '',
            imageReverse: '',
            isDialogShow:false,
            dialogTit: '',
            userName: '',
            userId: '',
            address: '',
            validity: '',
            phoneNum: '',
            uId: '',
            imageFrontPath: '',
            imageReversePath: '',
            picValue: '',
            isUpload:false,
            isUpload1:false
        }
    },
    created() {
        document.title = '完善信息';
    },
    mounted() {
        this.uId = this.$route.query.uId;
    },
    components: {
        'v-dialog': dialog,
        datePicker,
        loading
    },
    methods: {
        toSubmit() {
            if(this._checkRules(this.imageFront, '请上传身份证正面照')) return;
            if(this._checkRules(this.imageReverse, '请上传身份证背面照')) return;
            if(this._checkRules(this.userName, '请填写姓名')) return;
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
            this.isSubmitSuccess = true;
            axios({
                method: 'post',
                url: api + '/u/register/user/authc',
                data: {
                    uid: this.uId,
                    real_name: this.userName,
                    id_card_number:this.userId,
                    id_card_front_pic:this.imageFrontPath,
                    id_card_inverse_pic:this.imageReverse,
                    id_card_expiry_date:this.validity,
                    address:this.address,
                    tel_phone:this.phoneNum
                },  
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((res) => {
                this.isSubmitSuccess = false;
                if(res.data.code === 0){
                    this.$router.replace('/successfully');
                }else{
                    setTimeout(() => {
                        this.isDialogShow = true;
                    },100);
                    this.dialogTit = res.data.message;
                    return;
                }
            })
            .catch((error) => {
                this.isSubmitSuccess = false;
                setTimeout(() => {
                    this.isDialogShow = true;
                },100);
                this.dialogTit = '服务器错误';
                console.log('错误了'+ error)
            });
        },
        getValidity(val) {
            this.validity = val;
        },
        onDelete(f){
            this[f] = '';
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
        onFileFrontChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            imgPreview(this, files[0], 'imageFront');
        },
        onFileReverseChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            imgPreview(this, files[0], 'imageReverse');
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
        }
    },
    watch: {
        isDialogShow() {
            if(this.isDialogShow) {
                setTimeout(() => {
                    this.isDialogShow = false
                }, 2000);
            }
        },
        imageFront() {
            this.isUpload = true;
            axios({
                method: 'post',
                url: api + '/upload/image/base64',
                data: {
                    fileBase64: this.imageFront,
                },  
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((res) => {
                this.isUpload = false;
                if(res.data.code === 0){
                    this.imageFrontPath = res.data.data.path;
                    console.log(res.data);
                }else{
                    setTimeout(() => {
                        that.isDialogShow = true;
                    },100);
                    this.dialogTit = '图片上传失败';
                }
            })
            .catch((error) => {
                setTimeout(() => {
                    that.isDialogShow = true;
                },100);
                this.dialogTit = '服务器错误';
                console.log('错误了'+ error)
            });
        },
        imageReverse() {
            this.isUpload1 = true;
            axios({
                method: 'post',
                url: api + '/upload/image/base64',
                data: {
                    fileBase64: this.imageReverse,
                },  
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((res) => {
                this.isUpload1 = false;
                if(res.data.code === 0){
                    this.imageReversePath = res.data.data.path;
                    console.log(res.data);
                }else{
                    setTimeout(() => {
                        that.isDialogShow = true;
                    },100);
                    this.dialogTit = '图片上传失败';
                }
            })
            .catch((error) => {
                setTimeout(() => {
                    that.isDialogShow = true;
                },100);
                this.dialogTit = '服务器错误';
                console.log('错误了'+ error)
            });
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
        .header{
            height: 44px;
            line-height: 44px;
            border-bottom: 1px solid #dfdfdf;
            text-align: center;
            font-size: 18px;
            position: relative;
            box-sizing: border-box;
            .back{
                position: absolute;
                padding: 0 16px;
                left: 0;
            }
        }
        .reg-personal-content{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            ul{
                width: 94%;
                padding: 0 3%;
                padding-top: 20px;
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
                            .img-wrapper, .img-upload{
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
                            .img-upload{
                                margin: 0;
                                background: #fff;
                                position: absolute;
                                top: 0;
                                left: 0;
                                z-index: 999;
                                i{
                                    width: 20px;
                                    height: 20px;
                                    left: 50%;
                                    top: 50%;
                                    margin: -10px 0 0 -10px;
                                    background: url(../../assets/imgUpLoad.gif);
                                    background-size: cover;
                                    z-index: 999;
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