<template>
    <transition name="slider">
        <div class="reg-personal">
            <div class="reg-personal-content" ref="scrollWrapper">
                <ul>
                    <li class="input-img">
                        <span class="item"><b>&lowast;</b>营业执照</span>
                        <span class="item-value">
                            <a href="javascript:" class="input-img-btn" v-on:click="addBusinessLicense">+</a>
                            <input type="file" class="imgUp" @change="onBusinessLicenseChange" style="display: none;" ref="onBusinessLicenseChange" accept="image/*">
                            <span class="img-wrapper" v-if="imageLicense">
                                <img :src="imageLicense" alt="" >
                                <b class="delete" @click="onDelete('imageLicense')"></b>
                            </span>
                            <span class="img-wrapper" v-else>
                                <img src="./u230.png" alt="" >
                                <i>示例照片</i>
                            </span>
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>公司名称</span>
                        <span class="item-value">
                            <input type="text" v-model="companyName">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&lowast;</b>营业执照编码</span>
                        <span class="item-value">
                            <input type="text" v-model="licenseCode">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&nbsp;&nbsp;</b>法人姓名</span>
                        <span class="item-value">
                            <input type="text" v-model="legalPerson">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&nbsp;&nbsp;</b>公司地址</span>
                        <span class="item-value">
                            <input type="text" v-model="companyAddress">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&nbsp;&nbsp;</b>有效期</span>
                        <span class="item-value">
                            <input type="text" v-model="yingyeValidity">
                        </span>
                    </li>
                    <li class="input-img">
                        <span class="item"><b>&lowast;</b>危险品运输许可证</span>
                        <span class="item-value">
                            <a href="javascript:" class="input-img-btn" v-on:click="addDangerous">+</a>
                            <input type="file" class="imgUp" @change="onFileDangerousChange" style="display: none;" ref="onFileDangerousChange" accept="image/*">
                            <span class="img-wrapper" v-if="imageDangerous">
                                <img :src="imageDangerous" alt="" >
                                <b class="delete" @click="onDelete('imageDangerous')"></b>
                            </span>
                            <span class="img-wrapper" v-else>
                                <img src="./u830.jpg" alt="" >
                                <i>示例照片</i>
                            </span>
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&nbsp;&nbsp;</b>有效期</span>
                        <span class="item-value">
                            <input type="text" v-model="DangerousValidity">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&nbsp;&nbsp;</b>危险品运输许可证号</span>
                        <span class="item-value">
                            <input type="text" v-model="DangerousCode">
                        </span>
                    </li>
                    <li class="input-img">
                        <span class="item"><b>&lowast;</b>道路运输许可证</span>
                        <span class="item-value">
                            <a href="javascript:" class="input-img-btn" v-on:click="addRoad">+</a>
                            <input type="file" class="imgUp" @change="onFileRoadChange" style="display: none;" ref="onFileRoadChange" accept="image/*">
                            <span class="img-wrapper" v-if="imageRoad">
                                <img :src="imageRoad" alt="" >
                                <b class="delete" @click="onDelete('imageRoad')"></b>
                            </span>
                            <span class="img-wrapper" v-else>
                                <img src="./u847.jpg" alt="" >
                                <i>示例照片</i>
                            </span>
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&nbsp;&nbsp;</b>有效期</span>
                        <span class="item-value">
                            <input type="text" v-model="RoadValidity">
                        </span>
                    </li>
                    <li>
                        <span class="item"><b>&nbsp;&nbsp;</b>道路运输许可证号</span>
                        <span class="item-value">
                            <input type="text" v-model="RoadCode">
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
            <confirmBusiness @businessCard="getBusinessCard" v-show="dialogBusinessShow" :name="dialogName" :companyNum="dialogCompanyNum" :EndTime="dialogEndTime" :code="dialogCode" :address="dialogAddress" @clossBusiness="clossBusiness"></confirmBusiness>
            <validation v-show="isValidationShow"></validation>
        </div>
    </transition>
</template>
<script>
import BScroll from 'better-scroll';
import dialog from '../../base/dialog/dialog';
import validation from '../../base/validation/validation';
import loading from '../../base/loading/loading';
import axios from 'axios';
import {api} from '../../api/api.js';
import {isIPHONE, is_weixn, is_QQ} from '../../common/js/isIphone.js';
import {imgPreview} from '../../common/js/compress.js';
import confirmBusiness from '../../base/confirm/confirmBusiness';
export default {
    data() {
        return {
            isLoadingShow:false,
            isDialogShow:false,
            loadingTit: '',
            dialogTit: '',
            imageLicense: '',
            imageDangerous: '',
            imageRoad: '',
            imageLicensePath: '',
            imageDangerousPath: '',
            imageRoadPath: '',
            companyName: '',
            licenseCode: '',
            legalPerson: '',
            name: '',
            userId: '',
            address: '',
            phoneNum: '',
            userIdvalidity: '',
            companyAddress: '',
            yingyeValidity: '',
            DangerousCode: '',
            RoadCompanyName: '',
            RoadValidity: '',
            RoadCode: '',
            DangerousValidity: '',
            dialogBusinessShow: false,
            dialogName: '',
            dialogCode: '',
            dialogCompanyNum: '',
            dialogEndTime: '',
            dialogAddress: '',
            isBusinessSuccess:false,
            isDangerSuccess:false,
            isRoadSuccess:false,
            isValidationShow:false,
            submitAgain:false,
            temporaryUserName: '',
            temporaryUserId: ''
        }
    },
    created() {
        document.title = '车队认证';
    },
    mounted() {
        this.uId = localStorage.getItem('xiaohei_driver_team_uId');
        this.real_name = localStorage.getItem('xiaohei_driver_team_real_name');
        this.id_card_number = localStorage.getItem('xiaohei_driver_team_id_card_number');
        this.id_card_front_pic = localStorage.getItem('xiaohei_driver_team_id_card_front_pic');
        this.id_card_inverse_pic = localStorage.getItem('xiaohei_driver_team_id_card_inverse_pic');
        this.id_card_expiry_date = localStorage.getItem('xiaohei_driver_team_id_card_expiry_date');
        this.address = localStorage.getItem('xiaohei_driver_team_address');
        this.tel_phone = localStorage.getItem('xiaohei_driver_team_tel_phone');
        document.querySelector('body').style.overflow = 'auto';
        if(!isIPHONE){
            if(is_weixn() || is_QQ()){
                this.$refs.onBusinessLicenseChange.setAttribute("capture","camera");
                this.$refs.onFileDangerousChange.setAttribute("capture","camera");
                this.$refs.onFileRoadChange.setAttribute("capture","camera");
            }
        }
    },
    components: {
        'v-dialog': dialog,
        loading,
        confirmBusiness,
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
        isValidationShow() {
            if(this.isValidationShow){
                setTimeout(() => {
                    this.isValidationShow = false
                }, 3000);
            }
        }
    },
    methods: {
        toSubmit() {
            this.real_name = localStorage.getItem('xiaohei_driver_team_real_name');
            this.id_card_number = localStorage.getItem('xiaohei_driver_team_id_card_number');
            this.id_card_front_pic = localStorage.getItem('xiaohei_driver_team_id_card_front_pic');
            this.id_card_inverse_pic = localStorage.getItem('xiaohei_driver_team_id_card_inverse_pic');
            this.id_card_expiry_date = localStorage.getItem('xiaohei_driver_team_id_card_expiry_date');
            if(this._checkRules(this.imageLicense, '请上传营业执照')) return;
            if(this._checkRules(this.companyName, '请填写公司名称')) return;
            if(this._checkRules(this.licenseCode, '请填写营业执照编码')) return;
            if(this._checkRules(this.imageDangerous, '请上传危险品运输许可证')) return;
            if(this._checkRules(this.imageRoad, '请上传道路运输许可证')) return;
            if(!this.isBusinessSuccess){
                setTimeout(() => {
                    that.isDialogShow = true;
                },100);
                this.dialogTit = '请重新上传营业执照';
                return;
            }
            if(!this.isDangerSuccess){
                setTimeout(() => {
                    that.isDialogShow = true;
                },100);
                this.dialogTit = '请重新上传危险品运输许可证';
                return;
            }
            if(!this.isRoadSuccess){
                setTimeout(() => {
                    that.isDialogShow = true;
                },100);
                this.dialogTit = '请重新上传道路运输许可证';
                return;
            }
            if((this.temporaryUserName != this.real_name) || (this.temporaryUserId != this.id_card_number)){
                this.submitAgain = false;
            }
            if(this.submitAgain){
                this.isValidationShow = true;
                setTimeout(() => {
                    this.$router.back();
                }, 2800);
                return;
            }
            //ajax...
            this.isLoadingShow = true;

            axios({
                method: 'post',
                url: api + '/d/register/fleet/authc',
                data: {
                    uid:this.uId,
                    real_name:this.real_name,
                    id_card_number:this.id_card_number,
                    id_card_front_pic:this.id_card_front_pic,
                    id_card_inverse_pic:this.id_card_inverse_pic,
                    id_card_expiry_date:this.id_card_expiry_date,
                    address:this.address,
                    tel_phone:this.tel_phone,

                    company_name:this.companyName,
                    company_address:this.companyAddress,
                    business_license_number:this.licenseCode,
                    business_license_pic:this.imageLicensePath,
                    business_license_expiry_date:this.yingyeValidity,
                    legal_person:this.legalPerson,
                    hazardous_transport_license_number:this.DangerousCode,
                    hazardous_transport_license_pic:this.imageDangerousPath,
                    hazardous_transport_expiry_date:this.DangerousValidity,
                    road_transport_license_number:this.DangerousCode,
                    road_transport_license_pic:this.imageRoadPath,
                    road_transport_license_expiry_date:this.RoadValidity
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
                    this.clearStorage();
                }else if(res.data.code == 2){
                    this.isValidationShow = true;
                    this.isValidationShow = true;
                    this.submitAgain = true;
                    this.temporaryUserName = this.real_name;
                    this.temporaryUserId = this.id_card_number;
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
        },
        getBusinessCard(val){
            this.companyName = val.companyNum;
            this.legalPerson = val.name;
            this.yingyeValidity = val.EndTime;
            this.licenseCode = val.code;
            this.companyAddress = val.address;
            this.dialogBusinessShow = val.thisShow;
        },
        clossBusiness(val){
            this.dialogBusinessShow = val;
            this.companyName = '';
            this.legalPerson = '';
            this.yingyeValidity = '';
            this.licenseCode = '';
            this.companyAddress = '';
        },
        onDelete(f){
            this[f] = '';
        },
        addBusinessLicense(e){
            e.preventDefault();
            this.$refs.onBusinessLicenseChange.click();
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
            imgPreview(this, files[0], 'imageLicense');
            this.$refs.onBusinessLicenseChange.value = '';
            this.dialogName = '';
            this.dialogCompanyNum = '';
            this.dialogEndTime = '';
            this.dialogCode = '';
            this.dialogAddress = '';
        },
        onFileDangerousChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            imgPreview(this, files[0], 'imageDangerous');
            this.$refs.onFileDangerousChange.value = '';
        },
        onFileRoadChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            imgPreview(this, files[0], 'imageRoad');
            this.$refs.onFileRoadChange.value = '';
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
        clearStorage() {
            localStorage.removeItem('xiaohei_driver_team_uId');
            localStorage.removeItem('xiaohei_driver_team_real_name');
            localStorage.removeItem('xiaohei_driver_team_id_card_number');
            localStorage.removeItem('xiaohei_driver_team_id_card_front_pic');
            localStorage.removeItem('xiaohei_driver_team_id_card_inverse_pic');
            localStorage.removeItem('xiaohei_driver_team_id_card_expiry_date');
            localStorage.removeItem('xiaohei_driver_team_address');
            localStorage.removeItem('xiaohei_driver_team_tel_phone');
            localStorage.removeItem('xiaohei_shared_first_user');
            localStorage.removeItem('xiaohei_shared_second_user');
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
                            flex: 4.1;
                            b{
                                color: #f00;
                                padding-right: 5px;
                            }
                        }
                        &.item-value{
                            height: 100%;
                            width: 64%;
                            flex: 5.9;
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