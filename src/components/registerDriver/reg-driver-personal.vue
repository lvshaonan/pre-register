<<<<<<< HEAD
<template>
    <transition name="slider">
        <div class="reg-personal">
            <div class="reg-personal-content" ref="scrollWrapper">
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
                            <input type="text" v-model="validity">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>联系电话</span>
                        <span class="item-value">
                            <input type="text" v-model="phoneNum" @keyup="checkPhoneNum">
                        </span>
                    </li>
                    <li class="input-img">
                        <span class="item"><b>&lowast;</b>驾驶证正面照</span>
                        <span class="item-value">
                            <a href="javascript:" class="input-img-btn" v-on:click="addLicense">+</a>
                            <input type="file" @change="onFileLicenseChange" style="display: none;" ref="onFileLicenseChange" accept="image/*">
                            <span class="img-wrapper" v-if="imageDriver">
                                <img :src="imageDriver" alt="" >
                                <b class="delete" @click="onDelete('imageDriver')"></b>
                            </span>
                            <span class="img-wrapper" v-else>
                                <img src="./u499.jpg" alt="" >
                                <i>示例照片</i>
                            </span>
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>准驾车型</span>
                        <span class="item-value">
                            <input type="text" v-model="drivingLicenceCar">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&nbsp;&nbsp;</b>有效期</span>
                        <span class="item-value">
                            <input type="text" v-model="drivingLicenceValidity">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&nbsp;&nbsp;</b>所属车队</span>
                        <span class="item-value">
                            <input type="text" v-model="team" class="carTeam">
                            <b class="add-team" @click="addTeam">
                                <i></i>
                            </b>
                        </span>
                    </li>
                    <li v-show="otherTeamShow">
                        <span class="item"></span>
                        <span class="item-value">
                            <input type="text" v-model="otherTeam" class="carTeam">
                            <b class="add-team minus" @click="minusTeam">
                                <i></i>
                            </b>
                        </span>
                    </li>
                    <li class="next">
                        <button @click="toNext">下一步</button>
                    </li>
                    <li></li>
                </ul>
            </div>
            <v-dialog :title="dialogTit" v-show="isDialogShow"></v-dialog>
            <loading v-show="isLoadingShow" :title="loadingTit"></loading>
            <v-confirmfront @clossFront="clossFront" @idCardFront="getIdCardFront" v-show="idCardFrontDialog" :name="idCardFrontDialogName" :cardId="idCardFrontDialogId" :cardAddress="idCardFrontDialogAddress"></v-confirmfront>
            <confirmReverse @clossRe="clossRe" @idCardRe="getIdCardRe" v-show="idCardReDialog" :idCardEndTime="idCardEndTime"></confirmReverse>
            <confirmDrive @driveCard="getDriveCard" v-show="driveCardDialog" :driveEndTime="driveCardEndTime" :driveType="driveType" @clossDriver="clossDriver"></confirmDrive>
        </div>
    </transition>
</template>
<script>
import BScroll from 'better-scroll';
import dialog from '../../base/dialog/dialog';
import loading from '../../base/loading/loading';
import axios from 'axios';
import {api} from '../../api/api.js';
import {imgPreview} from '../../common/js/compress.js';
import confirmFront from '../../base/confirm/confirmFront';
import confirmReverse from '../../base/confirm/confirmReverse';
import confirmDrive from '../../base/confirm/confirmDrive';
import {is_weixn, isIPHONE, is_QQ} from '../../common/js/isIphone.js';
export default {
    data() {
        return {
            isLoadingShow: false,
            imageFront: '',
            imageReverse: '',
            imageDriver: '',
            imageFrontPath: '',
            imageReversePath: '',
            imageDriverPath: '',
            name: '',
            userId: '',
            address: '',
            validity: '',
            phoneNum: '',
            drivingLicenceCar: '',
            drivingLicenceValidity: '',
            team: '',
            isDialogShow:false,
            dialogTit: '',
            loadingTit: '',
            otherTeamShow: false,
            otherTeam: '',
            uId: '',
            idCardFrontDialogName: '',
            idCardFrontDialogId: '',
            idCardFrontDialogAddress: '',
            idCardFrontDialog: false,
            idCardReDialog: false,
            idCardEndTime: '',
            driveCardDialog: false,
            driveCardEndTime: '',
            driveType: '',
            isFrontSuccess:false,
            isReSuccess:false,
            isDriverSuccess:false
        }
    },
    created() {
        document.title = '司机认证';
    },
    components: {
        'v-dialog': dialog,
        loading,
        'v-confirmfront' :confirmFront,
        confirmReverse,
        confirmDrive
    },
    mounted() {
        setTimeout(() => {
            this.uId = localStorage.getItem('xiaohei_driver_uId');
        }, 100);
        if(!isIPHONE){
            if(is_weixn() || is_QQ()){
                this.$refs.onFileFrontChange.setAttribute("capture","camera");
                this.$refs.onFileReverseChange.setAttribute("capture","camera");
                this.$refs.onFileLicenseChange.setAttribute("capture","camera");
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
        }
    },
    methods: {
        toNext() {
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
            if(this._checkRules(this.imageDriver, '请上传驾驶证正面照')) return;
            if(this._checkRules(this.drivingLicenceCar, '请填写准驾车型')) return;
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
            if(!this.isDriverSuccess){
                setTimeout(() => {
                    that.isDialogShow = true;
                },100);
                this.dialogTit = '请重新上传驾驶证';
                return;
            }
            //ajax...
            this.isLoadingShow = true;
            localStorage.setItem('xiaohei_driver_real_name', this.name);
            localStorage.setItem('xiaohei_driver_id_card_number', this.userId);
            localStorage.setItem('xiaohei_driver_id_card_front_path', this.imageFrontPath);
            localStorage.setItem('xiaohei_driver_id_card_inverse_path', this.imageReversePath);
            localStorage.setItem('xiaohei_driver_id_card_expiry_date', this.validity);
            localStorage.setItem('xiaohei_driver_address', this.address);
            localStorage.setItem('xiaohei_driver_tel_phone', this.phoneNum);
            localStorage.setItem('xiaohei_driver_driving_type', this.drivingLicenceCar);
            localStorage.setItem('xiaohei_driver_driving_licence_path', this.imageDriverPath);
            localStorage.setItem('xiaohei_driver_dirving_licence_expiry_date', this.drivingLicenceValidity);
            localStorage.setItem('xiaohei_driver_fleets', this.team);
            setTimeout(() => {
                this.isLoadingShow = false;
                this.$router.push('/regDriverInfo');
            }, 1000);
        },
        onDelete(f){
            this[f] = '';
        },
        //接收正面信息
        getIdCardFront(val) {
            this.name = val.name;
            this.userId = val.cardId;
            this.address = val.cardAddress;
            this.idCardFrontDialog = val.thisShow;
        },
        clossDriver(val){
            this.driveCardDialog = val;
            this.drivingLicenceCar = '';
            this.drivingLicenceValidity = '';
        },
        clossFront(val) {
            this.idCardFrontDialog = val;
            this.name = '';
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
        getDriveCard(val) {
            this.drivingLicenceCar = val.driveType;
            this.drivingLicenceValidity = val.driveEndTime
            this.driveCardDialog = val.thisShow;
        },
        _initScroll() {
            this.scroll = new BScroll(this.$refs.scrollWrapper, {
                click: true
            });
        },
        addTeam() {
            this.otherTeamShow = true;
        },
        minusTeam() {
            this.otherTeamShow = false;
        },
        addLicense(e){
            e.preventDefault();
            this.$refs.onFileLicenseChange.click();
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
        onFileLicenseChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            imgPreview(this, files[0], 'imageDriver');
            this.$refs.onFileLicenseChange.value = '';
            this.driveCardEndTime = '';
            this.driveType = '';
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
    }
}
</script>
<style lang="scss" scoped>
    .reg-personal{
        // position: absolute;
        // top: 0;
        // left: 0;
        // right: 0;
        // bottom: 0;
        background-color: #fff;
        // display: flex;
        // flex-direction: column;
        .reg-personal-content{
            // overflow: hidden;
            // flex: 1;
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
                            .carTeam{
                                width: 80%;
                            }
                            .add-team{
                                width: 40px;
                                height: 40px;
                                position: absolute;
                                top: 0;
                                right: 0;
                                i{
                                    display: inline-block;
                                    width: 26px;
                                    height: 26px;
                                    position: absolute;
                                    top: 7px;
                                    left: 5px;
                                    background: url(../../assets/add.png);
                                    background-size: cover;
                                }
                            }
                            .minus{
                                i{
                                    background: url(../../assets/minus.png);
                                    background-size: cover;
                                }
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
=======
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
                            <date-picker @sendDate="getValidity"></date-picker>
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>联系电话</span>
                        <span class="item-value">
                            <input type="number" v-model="phoneNum">
                        </span>
                    </li>
                    <li class="input-img">
                        <span class="item"><b>&lowast;</b>驾驶证正面照</span>
                        <span class="item-value">
                            <a href="javascript:" class="input-img-btn" v-on:click="addLicense">+</a>
                            <input type="file" @change="onFileLicenseChange" multiple style="display: none;" ref="onFileLicenseChange" accept="image/*">
                            <span class="img-wrapper" v-if="imageLicense">
                                <img :src="imageLicense" alt="" >
                                <b class="delete" @click="onDelete('imageLicense')"></b>
                            </span>
                            <span class="img-wrapper" v-else>
                                <img src="./u499.jpg" alt="" >
                                <i>示例照片</i>
                            </span>
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>准驾车型</span>
                        <span class="item-value">
                            <input type="text" v-model="drivingLicenceCar">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&nbsp;&nbsp;</b>有效期</span>
                        <span class="item-value">
                            <date-picker @sendDate="getDrivingLicenceValidity"></date-picker>
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&nbsp;&nbsp;</b>所属车队</span>
                        <span class="item-value">
                            <input type="text" v-model="team" class="carTeam">
                            <b class="add-team" @click="addTeam">
                                <i></i>
                            </b>
                        </span>
                    </li>
                    <li v-show="otherTeamShow">
                        <span class="item"></span>
                        <span class="item-value">
                            <input type="text" v-model="otherTeam" class="carTeam">
                            <b class="add-team minus" @click="minusTeam">
                                <i></i>
                            </b>
                        </span>
                    </li>
                    <li class="next">
                        <button @click="toNext">下一步</button>
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
import BScroll from 'better-scroll';
import dialog from '../../base/dialog/dialog';
import datePicker from '../../base/datePicker/datePicker';
import loading from '../../base/loading/loading';
export default {
    data() {
        return {
            isSubmitSuccess: false,
            imageFront: '',
            imageReverse: '',
            imageLicense: '',
            name: '',
            userId: '',
            address: '',
            validity: '',
            phoneNum: '',
            drivingLicenceCar: '',
            drivingLicenceValidity: '',
            team: '',
            isDialogShow:false,
            dialogTit: '',
            otherTeamShow: false,
            otherTeam: ''
        }
    },
    created() {
        document.title = '司机认证';
    },
    components: {
        'v-dialog': dialog,
        datePicker,
        loading
    },
    mounted() {
        this.$nextTick(() => {
            this._initScroll();
        });
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
        toNext() {
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
            if(this._checkRules(this.imageLicense, '请上传驾驶证正面照')) return;
            if(this._checkRules(this.drivingLicenceCar, '请填写准驾车型')) return;
            //ajax...
            this.isSubmitSuccess = true;
            setTimeout(() => {
                this.isSubmitSuccess = false;
                this.$router.push("/regDriverInfo");
            }, 2000);
        },
        onDelete(f){
            this[f] = '';
        },
        getValidity(val) {
            this.validity = val;
        },
        getDrivingLicenceValidity(val) {
            this.drivingLicenceValidity = val;
        },
        _initScroll() {
            this.scroll = new BScroll(this.$refs.scrollWrapper, {
                click: true
            });
        },
        addTeam() {
            this.otherTeamShow = true;
            setTimeout(() => {
                this.scroll.refresh();
            }, 200);
        },
        minusTeam() {
            this.otherTeamShow = false;
            setTimeout(() => {
                this.scroll.refresh();
            }, 200);
        },
        addLicense(e){
            e.preventDefault();
            this.$refs.onFileLicenseChange.click();
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
        onFileLicenseChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files, 'license');
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
                }else if(flag == 'license'){
                    that.imageLicense = e.target.result;
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
                            .carTeam{
                                width: 80%;
                            }
                            .add-team{
                                width: 40px;
                                height: 40px;
                                position: absolute;
                                top: 0;
                                right: 0;
                                i{
                                    display: inline-block;
                                    width: 26px;
                                    height: 26px;
                                    position: absolute;
                                    top: 7px;
                                    left: 5px;
                                    background: url(../../assets/add.png);
                                    background-size: cover;
                                }
                            }
                            .minus{
                                i{
                                    background: url(../../assets/minus.png);
                                    background-size: cover;
                                }
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
>>>>>>> 6045335339b92ce7a4904f53d26a48b1de2137f1
</style>