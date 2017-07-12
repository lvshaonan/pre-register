<template>
    <transition name="slider">
        <div class="reg-personal">
            <div class="reg-personal-content" ref="scrollWrapper">
                <ul>
                    <li class="input-img">
                        <span class="item"><b>&lowast;</b>车辆45°照片</span>
                        <span class="item-value">
                            <a href="javascript:" class="input-img-btn" v-on:click="addCarFront">+</a>
                            <input type="file" @change="onCarFrontChange" style="display: none;" ref="onCarFrontChange" accept="image/*">
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
                            <input type="file" @change="onFileVehicleChange" style="display: none;" ref="onFileVehicleChange" accept="image/*">
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
            <div class="warn-dialog" v-show="isWarnShow">
                <div class="warn-message">
                    <h3>您已填写车辆信息</h3>
                    <h3>确定跳过提交？</h3>
                    <ul>
                        <li>
                            <button @click="onSkip" class="onSkip">跳过</button>
                        </li>
                        <li>
                            <button @click="noSkip" class="noSkip">不跳过</button>
                        </li>
                    </ul>
                </div>
            </div>
            <v-dialog :title="dialogTit" v-show="isDialogShow"></v-dialog>
            <vehicle-type v-show="isVehicleTypeShow" @vehicleType="getVehicleType"></vehicle-type>
            <product-edia v-show="isProductMediaShow" @productMedia="getProductMedia"></product-edia>
            <loading v-show="isLoadingShow" :title="loadingTit"></loading>
            <confirmRun v-show="confirmRunShow" @cardRun="getCardRun" :plateNum="dialogPlateNum" :owner="dialogOwner" :engineNum="dialogEngineNum" :discernCode="dialogDiscernCode" @clossRun="clossRun"></confirmRun>
            <validation v-show="isValidationShow"></validation>
        </div>
    </transition>
</template>
<script>
import BScroll from 'better-scroll';
import dialog from '../../base/dialog/dialog';
import validation from '../../base/validation/validation';
import vehicleType from './vehicle-type';
import productMedia from './product-media';
import loading from '../../base/loading/loading';
import axios from 'axios';
import {api} from '../../api/api.js';
import {imgPreview} from '../../common/js/compress.js';
import confirmRun from '../../base/confirm/confirmRun';
import {is_weixn, isIPHONE, is_QQ} from '../../common/js/isIphone.js';
export default {
    data() {
        return {
            isLoadingShow:false,
            isDialogShow:false,
            isWarnShow:false,
            dialogTit: '',
            imageCarFront: '',
            imageVehicle: '',
            imageCarFrontPath: '',
            imageVehiclePath: '',
            plateNum: '',
            ownerName: '',
            engineNum: '',
            identifyCode: '',
            vehicleType: '',
            medium: '',
            isProductMediaShow: false,
            isVehicleTypeShow: false,
            sendIndex: 0,
            sendJieIndex: 0,
            otherType: '',
            otherJiezhi: '',
            confirmRunShow: false,
            dialogPlateNum: '',
            dialogEngineNum: '',
            dialogOwner: '',
            dialogDiscernCode: '',
            loadingTit: '',
            isCarFrontSuccess: false,
            isRunSuccess:false,
            isValidationShow:false,
            submitNext:false,
            submitAgain:false,
            temporaryUserName: '',
            temporaryUserId: ''
        }
    },
    created() {
        document.title = '司机认证';
    },
    mounted() {
        this.uId = localStorage.getItem('xiaohei_driver_uId');
        this.xiaohei_driver_real_name = localStorage.getItem('xiaohei_driver_real_name');
        this.xiaohei_driver_id_card_number = localStorage.getItem('xiaohei_driver_id_card_number');
        this.xiaohei_driver_id_card_front_path = localStorage.getItem('xiaohei_driver_id_card_front_path');
        this.xiaohei_driver_id_card_inverse_path = localStorage.getItem('xiaohei_driver_id_card_inverse_path');
        this.xiaohei_driver_id_card_expiry_date = localStorage.getItem('xiaohei_driver_id_card_expiry_date');
        this.xiaohei_driver_address = localStorage.getItem('xiaohei_driver_address');
        this.xiaohei_driver_tel_phone = localStorage.getItem('xiaohei_driver_tel_phone');
        this.xiaohei_driver_driving_type = localStorage.getItem('xiaohei_driver_driving_type');
        this.xiaohei_driver_driving_licence_path = localStorage.getItem('xiaohei_driver_driving_licence_path');
        this.xiaohei_driver_dirving_licence_expiry_date = localStorage.getItem('xiaohei_driver_dirving_licence_expiry_date');
        this.xiaohei_driver_fleets = localStorage.getItem('xiaohei_driver_fleets');
        
        if(!isIPHONE){
            if(is_weixn() || is_QQ()){
                this.$refs.onCarFrontChange.setAttribute("capture","camera");
                this.$refs.onFileVehicleChange.setAttribute("capture","camera");
            }
        }
    },
    components: {
        'v-dialog': dialog,
        vehicleType,
        'product-edia': productMedia,
        loading,
        confirmRun,
        validation
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
        },
        isValidationShow() {
            if(this.isValidationShow){
                setTimeout(() => {
                    this.isValidationShow = false
                }, 3000);
            }
        },
        submitNext() {
            if(this.submitNext){
                axios({
                    method: 'post',
                    url: api + '/d/register/driver/vehicle/authc',
                    data: {
                        uid: this.uId,
                        vehicle_plate_number:this.plateNum,
                        vehicle_front_pic:this.imageCarFrontPath,
                        vehicle_license_front_pic:this.imageVehiclePath,
                        vehicle_holder_name:this.ownerName,
                        vehicle_engine_number:this.engineNum,
                        vehicle_id_code:this.identifyCode,
                        vehicle_type:this.sendIndex,
                        vehicle_type_custom:this.otherType,
                        vehicle_transport_medium: this.sendJieIndex,
                        vehicle_transport_medium_custom:this.otherJiezhi
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
                        this.isLoadingShow = false;
                        this.$router.replace('/successfully');
                        this.clearStorage();
                    }else{
                        setTimeout(() => {
                            this.isDialogShow = true;
                        },100);
                        this.dialogTit = res.data.message;
                        this.clearStorage();
                        return;
                    }
                })
                .catch((error) => {
                    this.isLoadingShow = false;
                    this.dialogTit = '服务器错误';
                    console.log('错误'+ error);
                    this.clearStorage();
                });
            }
        }
    },
    methods: {
        toSubmit() {
            this.xiaohei_driver_real_name = localStorage.getItem('xiaohei_driver_real_name');
            this.xiaohei_driver_id_card_number = localStorage.getItem('xiaohei_driver_id_card_number');
            this.xiaohei_driver_id_card_front_path = localStorage.getItem('xiaohei_driver_id_card_front_path');
            this.xiaohei_driver_id_card_inverse_path = localStorage.getItem('xiaohei_driver_id_card_inverse_path');
            this.xiaohei_driver_id_card_expiry_date = localStorage.getItem('xiaohei_driver_id_card_expiry_date');
            if(this._checkRules(this.imageCarFront, '请上传车辆45°照片')) return;
            if(this._checkRules(this.imageVehicle, '请上传行驶证正面照')) return;
            if(this._checkRules(this.plateNum, '请填写车牌号')) return;
            if(this._checkRules(this.ownerName, '请填写所有人姓名')) return;
            if(this._checkRules(this.engineNum, '请填写发动机号')) return;
            if(this._checkRules(this.vehicleType, '请填写车辆类型')) return;
            if(this._checkRules(this.medium, '请填写产品介质')) return;
            if(!this.isCarFrontSuccess){
                setTimeout(() => {
                    that.isDialogShow = true;
                },100);
                this.dialogTit = '请重新上传车辆照片';
                return;
            }
            if(!this.isRunSuccess){
                setTimeout(() => {
                    that.isDialogShow = true;
                },100);
                this.dialogTit = '请重新上传行驶证';
                return;
            }
            if((this.temporaryUserName != this.xiaohei_driver_real_name) || (this.temporaryUserId != this.xiaohei_driver_id_card_number)){
                this.submitAgain = false;
            }
            if(this.submitAgain){
                this.isValidationShow = true;
                setTimeout(() => {
                    this.$router.back();
                }, 2800);
                return;
            }
            console.log('请求了1');
            //ajax...
            this.isLoadingShow = true;
            axios({
                method: 'post',
                url: api + '/d/register/driver/authc',
                data: {
                    uid: this.uId,
                    real_name: this.xiaohei_driver_real_name,
                    id_card_number: this.xiaohei_driver_id_card_number,
                    id_card_front_pic: this.xiaohei_driver_id_card_front_path,
                    id_card_inverse_pic: this.xiaohei_driver_id_card_inverse_path,
                    id_card_expiry_date: this.xiaohei_driver_id_card_expiry_date,
                    address: this.xiaohei_driver_address,
                    tel_phone: this.xiaohei_driver_tel_phone,
                    driving_type: this.xiaohei_driver_driving_type,
                    driving_licence_pic: this.xiaohei_driver_driving_licence_path,
                    dirving_licence_expiry_date: this.xiaohei_driver_dirving_licence_expiry_date,
                    fleets: this.xiaohei_driver_fleets
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
                    this.submitNext = true;
                    // this.isLoadingShow = false;
                    // this.$router.replace('/successfully');
                    // this.clearStorage();
                }else if(res.data.code == 2){
                    this.isValidationShow = true;
                    this.submitAgain = true;
                    this.temporaryUserName = this.xiaohei_driver_real_name;
                    this.temporaryUserId = this.xiaohei_driver_id_card_number;
                    setTimeout(() => {
                        this.$router.back();
                    }, 2800);
                }else{
                    setTimeout(() => {
                        this.isDialogShow = true;
                    },100);
                    this.dialogTit = res.data.message;
                    this.clearStorage();
                    return;
                }
            })
            .catch((error) => {
                this.isLoadingShow = false;
                this.dialogTit = '服务器错误';
                console.log('错误'+ error);
                this.clearStorage();
            });
            // axios({
            //     method: 'post',
            //     url: api + '/d/register/driver/vehicle/authc',
            //     data: {
            //         uid: this.uId,
            //         vehicle_plate_number:this.plateNum,
            //         vehicle_front_pic:this.imageCarFrontPath,
            //         vehicle_license_front_pic:this.imageVehiclePath,
            //         vehicle_holder_name:this.ownerName,
            //         vehicle_engine_number:this.engineNum,
            //         vehicle_id_code:this.identifyCode,
            //         vehicle_type:this.sendIndex,
            //         vehicle_type_custom:this.otherType,
            //         vehicle_transport_medium: this.sendJieIndex,
            //         vehicle_transport_medium_custom:this.otherJiezhi
            //     },  
            //     transformRequest: [function (data) {
            //         let ret = ''
            //         for (let it in data) {
            //         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            //         }
            //         return ret
            //     }],
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            // })
            // .then((res) => {
            //     console.log(res.data);
            //     this.isLoadingShow = false;
            //     if(res.data.code === 0){
            //         this.isLoadingShow = false;
            //         this.$router.replace('/successfully');
            //         this.clearStorage();
            //     }else if(res.data.code == 2){
            //         this.isValidationShow = true;
            //         setTimeout(() => {
            //             this.$router.back();
            //         }, 2000);
            //     }else{
            //         setTimeout(() => {
            //             this.isDialogShow = true;
            //         },100);
            //         this.dialogTit = res.data.message;
            //         this.clearStorage();
            //         return;
            //     }
            // })
            // .catch((error) => {
            //     this.isLoadingShow = false;
            //     this.dialogTit = '服务器错误';
            //     console.log('错误'+ error);
            //     this.clearStorage();
            // });
        },
        onSkip() {
            this.xiaohei_driver_real_name = localStorage.getItem('xiaohei_driver_real_name');
            this.xiaohei_driver_id_card_number = localStorage.getItem('xiaohei_driver_id_card_number');
            this.xiaohei_driver_id_card_front_path = localStorage.getItem('xiaohei_driver_id_card_front_path');
            this.xiaohei_driver_id_card_inverse_path = localStorage.getItem('xiaohei_driver_id_card_inverse_path');
            this.xiaohei_driver_id_card_expiry_date = localStorage.getItem('xiaohei_driver_id_card_expiry_date');
            this.isWarnShow = false;
            if((this.temporaryUserName != this.xiaohei_driver_real_name) || (this.temporaryUserId != this.xiaohei_driver_id_card_number)){
                this.submitAgain = false;
            }
            if(this.submitAgain){
                this.isValidationShow = true;
                setTimeout(() => {
                    this.$router.back();
                }, 2800);
                return;
            }
            console.log('请求了2');
            //ajax...
            this.isLoadingShow = true;
            axios({
                method: 'post',
                url: api + '/d/register/driver/authc',
                data: {
                    uid: this.uId,
                    real_name: this.xiaohei_driver_real_name,
                    id_card_number: this.xiaohei_driver_id_card_number,
                    id_card_front_pic:this.xiaohei_driver_id_card_front_path,
                    id_card_inverse_pic:this.xiaohei_driver_id_card_inverse_path,
                    id_card_expiry_date:this.xiaohei_driver_id_card_expiry_date,
                    address:this.xiaohei_driver_address,
                    tel_phone:this.xiaohei_driver_tel_phone,
                    driving_type:this.xiaohei_driver_driving_type,
                    driving_licence_pic:this.xiaohei_driver_driving_licence_path,
                    dirving_licence_expiry_date:this.xiaohei_driver_dirving_licence_expiry_date,
                    fleets: this.xiaohei_driver_fleets
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
                    this.isLoadingShow = false;
                    this.$router.replace('/successfully');
                }else if(res.data.code == 2){
                    this.isValidationShow = true;
                    this.submitAgain = true;
                    this.temporaryUserName = this.xiaohei_driver_real_name;
                    this.temporaryUserId = this.xiaohei_driver_id_card_number;
                    setTimeout(() => {
                        this.$router.back();
                    }, 2800);
                }else{
                    setTimeout(() => {
                        this.isDialogShow = true;
                    },100);
                    this.dialogTit = res.data.message;
                    return;
                }
            })
            .catch((error) => {
                this.isLoadingShow = false;
                this.dialogTit = '服务器错误';
                console.log('错误'+ error)
            });
        },
        noSkip() {
            this.isWarnShow = false;
        },
        skip() {
            this.xiaohei_driver_real_name = localStorage.getItem('xiaohei_driver_real_name');
            this.xiaohei_driver_id_card_number = localStorage.getItem('xiaohei_driver_id_card_number');
            this.xiaohei_driver_id_card_front_path = localStorage.getItem('xiaohei_driver_id_card_front_path');
            this.xiaohei_driver_id_card_inverse_path = localStorage.getItem('xiaohei_driver_id_card_inverse_path');
            this.xiaohei_driver_id_card_expiry_date = localStorage.getItem('xiaohei_driver_id_card_expiry_date');
            if(this.imageCarFront || this.imageVehicle || this.plateNum || this.ownerName || this.engineNum || this.vehicleType || this.medium){
                this.isWarnShow = true;
            }else{
                if((this.temporaryUserName != this.xiaohei_driver_real_name) || (this.temporaryUserId != this.xiaohei_driver_id_card_number)){
                    this.submitAgain = false;
                }
                if(this.submitAgain){
                    this.isValidationShow = true;
                    setTimeout(() => {
                        this.$router.back();
                    }, 2800);
                    return;
                }
                console.log('请求了3');
                //ajax...
                this.isLoadingShow = true;
                axios({
                    method: 'post',
                    url: api + '/d/register/driver/authc',
                    data: {
                        uid: this.uId,
                        real_name: this.xiaohei_driver_real_name,
                        id_card_number: this.xiaohei_driver_id_card_number,
                        id_card_front_pic:this.xiaohei_driver_id_card_front_path,
                        id_card_inverse_pic:this.xiaohei_driver_id_card_inverse_path,
                        id_card_expiry_date:this.xiaohei_driver_id_card_expiry_date,
                        address:this.xiaohei_driver_address,
                        tel_phone:this.xiaohei_driver_tel_phone,
                        driving_type:this.xiaohei_driver_driving_type,
                        driving_licence_pic:this.xiaohei_driver_driving_licence_path,
                        dirving_licence_expiry_date:this.xiaohei_driver_dirving_licence_expiry_date,
                        fleets: this.xiaohei_driver_fleets
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
                        this.isLoadingShow = false;
                        this.$router.replace('/successfully');
                    }else if(res.data.code == 2){
                        this.isValidationShow = true;
                        this.submitAgain = true;
                        this.temporaryUserName = this.xiaohei_driver_real_name;
                        this.temporaryUserId = this.xiaohei_driver_id_card_number;
                        setTimeout(() => {
                            this.$router.back();
                        }, 2800);
                    }else{
                        setTimeout(() => {
                            this.isDialogShow = true;
                        },100);
                        this.dialogTit = res.data.message;
                        return;
                    }
                })
                .catch((error) => {
                    this.isLoadingShow = false;
                    this.dialogTit = '服务器错误';
                    console.log('错误'+ error)
                });
            }
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
            this.sendIndex = val.index;
            if(this.sendIndex == 4){
                this.otherType = this.vehicleType;
            }
        },
        getProductMedia(val) {
            this.isProductMediaShow = val.isShow;
            this.medium = val.value;
            this.sendJieIndex = val.index;
            if(this.sendJieIndex == 2){
                this.otherJiezhi = this.medium;
            }
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
        onFileVehicleChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            imgPreview(this, files[0], 'imageVehicle');
            this.$refs.onFileVehicleChange.value = '';
            this.dialogPlateNum = '';
            this.dialogOwner = '';
            this.dialogEngineNum = '';
        },
        onCarFrontChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            imgPreview(this, files[0], 'imageCarFront');
            this.$refs.onCarFrontChange.value = '';
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
        getCardRun(val) {
            this.plateNum = val.plateNum;
            this.ownerName = val.owner;
            this.engineNum = val.engineNum;
            this.identifyCode = val.discernCode;
            this.confirmRunShow = val.thisShow;
        },
        clossRun(val) {
            this.confirmRunShow = val;
            this.plateNum = '';
            this.ownerName = '';
            this.engineNum = '';
            this.identifyCode = '';
        },
        clearStorage() {
            localStorage.removeItem('xiaohei_driver_uId');
            localStorage.removeItem('xiaohei_driver_real_name');
            localStorage.removeItem('xiaohei_driver_id_card_number');
            localStorage.removeItem('xiaohei_driver_id_card_front_path');
            localStorage.removeItem('xiaohei_driver_id_card_inverse_path');
            localStorage.removeItem('xiaohei_driver_id_card_expiry_date');
            localStorage.removeItem('xiaohei_driver_address');
            localStorage.removeItem('xiaohei_driver_tel_phone');
            localStorage.removeItem('xiaohei_driver_driving_type');
            localStorage.removeItem('xiaohei_driver_driving_licence_path');
            localStorage.removeItem('xiaohei_driver_dirving_licence_expiry_date');
            localStorage.removeItem('xiaohei_driver_fleets');
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
        .warn-dialog{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.4);
            .warn-message{
                position: absolute;
                width: 80%;
                height: 100px;
                background: #fff;
                top: 30%;
                left: 10%;
                border-radius: 10px;
                padding: 20px 0;
                h3{
                    text-align: center;
                    height: 24px;
                    line-height: 24px;
                    font-size: 15px;
                    font-weight: bold;
                    color: #DB050D;
                }
                ul{
                    display: flex;
                    margin-top: 20px;
                    li{
                        flex: 1;
                        text-align: center;
                        button{
                            border: none;
                            width: 60px;
                            height: 30px;
                            border-radius: 8px;
                            color: #fff;
                            &.onSkip{
                                background: #D84C47;
                            }
                            &.noSkip{
                                background: #3BAD3B;
                            }
                        }
                    }
                }
            }
        }
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