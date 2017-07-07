<template>
    <transition name="slider">
        <div class="reg-personal">
            <div class="reg-personal-content" ref="scrollWrapper">
                <ul>
                    <li class="input-img">
                        <span class="item"><b>&lowast;</b>营业执照</span>
                        <span class="item-value">
                            <a href="javascript:" class="input-img-btn" v-on:click="addLicense">+</a>
                            <input type="file" @change="onFileLicenseChange" multiple style="display: none;" ref="onFileLicenseChange" accept="image/*">
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
                        <span class="item"><b>&nbsp;&nbsp;</b>有效期</span>
                        <span class="item-value">
                            <date-picker @sendDate="getvalidity"></date-picker>
                        </span>
                    </li>
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
                            <date-picker @sendDate="getuserIdValidity"></date-picker>
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
                    <!--<li>
                        <button class="later">跳过，稍后完善</button>
                    </li>-->
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
import {api} from '../../api/api.js';
import {imgPreview} from '../../common/js/compress.js';
export default {
    data() {
        return {
            isSubmitSuccess: false,
            imageFront: '',
            imageReverse: '',
            imageLicense: '',
            isDialogShow:false,
            dialogTit: '',
            companyName: '',
            licenseCode: '',
            legalPerson: '',
            validity: '',
            name: '',
            userId: '',
            address: '',
            userIdValidity: '',
            phoneNum: '',
            uId: '',
            imageReversePath: '',
            imageFrontPath: ''
        }
    },
    created() {
        document.title = '完善信息';
    },
    components: {
        'v-dialog': dialog,
        datePicker,
        loading
    },
    mounted() {
        this.uId = this.$route.query.uId;
        this.$nextTick(() => {
            this._initScroll();
        });
    },
    methods: {
        toSubmit() {
            if(this._checkRules(this.imageLicense, '请上传营业执照')) return;
            if(this._checkRules(this.companyName, '请填写公司名称')) return;
            if(this._checkRules(this.licenseCode, '请填写营业执照编码')) return;
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
            // ajax...
            this.isSubmitSuccess = true;
            axios({
                method: 'post',
                url: api+'/u/register/company/authc',
                data: {
                    uid: this.uId,
                    real_name: this.name,
                    id_card_number: this.userId,
                    id_card_front_pic: this.imageFront,
                    id_card_inverse_pic: this.imageReverse,
                    id_card_expiry_date: this.userIdValidity,
                    address: this.address,
                    tel_phone: this.phoneNum,
                    company_name: this.companyName,
                    company_address: this.address,
                    business_license_number: this.licenseCode,
                    business_license_pic: this.imageLicense,
                    business_license_expiry_date: this.validity,
                    legal_person: this.legalPerson
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
                this.dialogTit = '服务器错误';
                console.log('错误了'+ error)
            });

        },
        onDelete(f){
            this[f] = '';
        },
        getuserIdValidity(val) {
            this.userIdValidity = val;
        },
        getvalidity(val) {
            this.validity = val;
        },
        _initScroll() {
            this.scroll = new BScroll(this.$refs.scrollWrapper, {
                click: true
            });
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
            imgPreview(this, files[0], 'imageLicense');
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
        },
        imageLicense() {
            this.isUpload1 = true;
            axios({
                method: 'post',
                url: api + '/upload/image/base64',
                data: {
                    fileBase64: this.imageLicense,
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