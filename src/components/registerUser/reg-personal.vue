<template>
    <transition name="slider">
        <div class="reg-personal">
            <div class="reg-personal-content">
                <ul>
                    <li class="input-img">
                        <span class="item"><b>&lowast;</b>身份证正面照</span>
                        <span class="item-value">
                            <a href="javascript:" class="input-img-btn" v-on:click="addPicFront">+</a>
                            <input type="file" @change="onFileFrontChange" style="display: none;" ref="onFileFrontChange" accept="image/*">
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
                            <input type="file" @change="onFileReverseChange" style="display: none;" ref="onFileReverseChange" accept="image/*">
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
                            <!--<date-picker @sendDate="getValidity" :time="backDate"></date-picker>-->
                            <input type="text" v-model="validity">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>联系电话</span>
                        <span class="item-value">
                            <input type="text" v-model="phoneNum" @keyup="checkPhoneNum">
                        </span>
                    </li>
                    <li class="submit-li">
                        <button class="submit" @click="toSubmit">提交</button>
                    </li>
                    <li></li>
                </ul>
            </div>
            <v-dialog :title="dialogTit" v-show="isDialogShow"></v-dialog>
            <loading v-show="isLoadingShow" :title="loadingTit"></loading>
            <v-confirmfront @clossFront="clossFront" @idCardFront="getIdCardFront" v-show="idCardFrontDialog" :name="idCardFrontDialogName" :cardId="idCardFrontDialogId" :cardAddress="idCardFrontDialogAddress"></v-confirmfront>
            <confirmReverse @clossRe="clossRe" @idCardRe="getIdCardRe" v-show="idCardReDialog" :idCardEndTime="idCardEndTime"></confirmReverse>
            <validation v-show="isValidationShow"></validation>
        </div>
    </transition>
</template>
<script>
import dialog from '../../base/dialog/dialog';
import loading from '../../base/loading/loading';
import validation from '../../base/validation/validation';
import axios from 'axios';
import {api} from '../../api/api.js';
import {imgPreview} from '../../common/js/compress.js';
import confirmFront from '../../base/confirm/confirmFront';
import confirmReverse from '../../base/confirm/confirmReverse';
import {is_weixn, isIPHONE, is_QQ} from '../../common/js/isIphone.js';
export default {
    data() {
        return {
            isLoadingShow: false,
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
            isUpload1:false,
            backDate: '',
            loadingTit: '',
            idCardFrontDialogName: '',
            idCardFrontDialogId: '',
            idCardFrontDialogAddress: '',
            idCardFrontDialog: false,
            idCardReDialog: false,
            idCardEndTime: '',
            isFrontSuccess:false,
            isReSuccess:false,
            isValidationShow:false,
            submitAgain:false,
            temporaryUserName: '',
            temporaryUserId: ''
        }
    },
    created() {
        document.title = '完善信息';
    },
    mounted() {
        this.uId = localStorage.getItem('xiaohei_personal_uId');
        if(!isIPHONE){
            if(is_weixn() || is_QQ()){
                this.$refs.onFileFrontChange.setAttribute("capture","camera");
                this.$refs.onFileReverseChange.setAttribute("capture","camera");
            }
        }
    },
    components: {
        'v-dialog': dialog,
        loading,
        'v-confirmfront' :confirmFront,
        confirmReverse,
        validation
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
            if(!this.isFrontSuccess){
                setTimeout(() => {
                    that.isDialogShow = true;
                },100);
                this.dialogTit = '请重新上传身份证正面';
                return;
            }
            if(!this.isReSuccess){
                setTimeout(() => {
                    that.isDialogShow = true;
                },100);
                this.dialogTit = '请重新上传身份证背面';
                return;
            }
            if((this.temporaryUserName != this.userName) || (this.temporaryUserId != this.userId)){
                this.submitAgain = false;
            }
            if(this.submitAgain){
                this.isValidationShow = true;
                return;
            }
            //ajax...
            this.isLoadingShow = true;
            axios({
                method: 'post',
                url: api + '/u/register/user/authc',
                data: {
                    uid: this.uId,
                    real_name: this.userName,
                    id_card_number:this.userId,
                    id_card_front_pic:this.imageFrontPath,
                    id_card_inverse_pic:this.imageReversePath,
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
                console.log(res.data);
                this.isLoadingShow = false;
                if(res.data.code === 0){
                    this.$router.replace('/successfully');
                    localStorage.removeItem('xiaohei_personal_uId');
                    localStorage.removeItem('xiaohei_shared_first_user');
                    localStorage.removeItem('xiaohei_shared_second_user');
                }else if(res.data.code == 2){
                    this.isValidationShow = true;
                    this.submitAgain = true;
                    this.temporaryUserName = this.userName;
                    this.temporaryUserId = this.userId;
                }else{
                    setTimeout(() => {
                        this.isDialogShow = true;
                    },100);
                    this.dialogTit = res.data.message;
                    localStorage.removeItem('xiaohei_personal_uId');
                    localStorage.removeItem('xiaohei_shared_first_user');
                    localStorage.removeItem('xiaohei_shared_second_user');
                    return;
                }
            })
            .catch((error) => {
                this.isLoadingShow = false;
                setTimeout(() => {
                    this.isDialogShow = true;
                },100);
                this.dialogTit = '服务器错误';
                console.log('错误了'+ error);
                localStorage.removeItem('xiaohei_personal_uId');
                localStorage.removeItem('xiaohei_shared_first_user');
                localStorage.removeItem('xiaohei_shared_second_user');
            });
        },
        //接收正面信息
        getIdCardFront(val) {
            this.userName = val.name;
            this.userId = val.cardId;
            this.address = val.cardAddress;
            this.idCardFrontDialog = val.thisShow;
        },
        clossFront(val) {
            this.idCardFrontDialog = val;
            this.userName = '';
            this.userId = '';
            this.address = '';
        },
        clossRe(val) {
            this.idCardReDialog = val;
            this.validity = '';
        },
        getIdCardRe(val) {
            this.validity = val.idCardEndTime;
            this.idCardReDialog = val.thisShow;
        },
        onDelete(f){
            this[f] = '';
        },
        addPicFront(e){
            this.imageFront = '';
            e.preventDefault();
            this.$refs.onFileFrontChange.click();
            return false;
        },
        addPicReverse(e){
            this.imageRevserse = '';
            e.preventDefault();
            this.$refs.onFileReverseChange.click();
            return false;
        },
        onFileFrontChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            imgPreview(this, files[0], 'imageFront');
            this.$refs.onFileFrontChange.value = '';
            this.idCardFrontDialogName = '';
            this.idCardFrontDialogId = '';
            this.idCardFrontDialogAddress = '';
        },
        onFileReverseChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            imgPreview(this, files[0], 'imageReverse');
            this.$refs.onFileReverseChange.value = '';
            this.idCardEndTime = '';
        },
        checkPhoneNum() {
            this.phoneNum = this.phoneNum.replace(/[^-\/\d]/g,'');
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
        isLoadingShow() {
            if(!this.isLoadingShow){
                this.loadingTit = '';
            }
        },
        isValidationShow() {
            if(this.isValidationShow){
                setTimeout(() => {
                    this.isValidationShow = false
                }, 2000);
            }
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