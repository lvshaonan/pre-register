<template>
    <transition name="slider">
        <div class="register-user">
            <ul class="register-user-content">
                <li>
                    <input type="text" placeholder="请输入手机号" v-model="phoneNumber" @keyup="_checkPhoneNumber">
                </li>
                <li>
                    <input type="text" placeholder="请输入验证码" class="verification" v-model="verification" @keyup="_checkVerification">
                    <div class="verification-btn" v-if="flag" @click="sendVerification">{{sendTxt}}</div>
                    <div class="verification-btn disable" v-else>{{countdown}}s</div>
                </li>
                <li>
                    <input type="password" placeholder="请输入密码，至少六位" v-model="password" @keyup="_checkPassword">
                </li>
                <li>
                    <input type="password" placeholder="确认密码"  v-model="passwordAgain" @keyup="_checkPasswordAgain">
                </li>
                <li>
                    <input type="button" value="注册" class="register-btn" @click="toRegister">
                </li>
                <li>
                    <input type="checkbox" class="check" v-model="isCheck.state" @click="onCheck(isCheck)">
                    <span class="check-text">
                        已同意
                        <router-link to="/regAgreement">《小黑师傅》</router-link>
                        注册协议
                    </span>
                </li>
            </ul>
            <transition name="fadea">
                <div class="reg-classes" v-show="isMarkShow">
                    <h2>注册成功，请选择身份</h2>
                    <ul class="classes">
                        <router-link to="/regPersonal" tag="li">
                            <img src="./u44.png">
                            <p>个人</p>
                        </router-link>
                        <router-link to="/regCompany" tag="li">
                            <img src="./u49.png">
                            <p>企业</p>
                        </router-link>
                    </ul>
                </div>
            </transition>
            <div class="mark" v-show="isMarkShow" @click="MarkHide"></div>
            <v-dialog :title="dialogTit" v-show="isDialogShow"></v-dialog>
            <loading v-show="isSubmitSuccess"></loading>
        </div>
    </transition>
</template>
<script>
import dialog from '../../base/dialog/dialog';
import loading from '../../base/loading/loading';
export default {
  data() {
      return {
          phoneNumber: '',
          verification: '',
          password: '',
          passwordAgain: '',
          countdown: 59,
          flag: true,
          sendTxt: '获取验证码',
          isMarkShow: false,
          isCheck: {state: true},
          isDialogShow:false,
          dialogTit: '',
          checkPhoneNumber:false,
          checkVerification:false,
          checkPasswordAgain:false,
          checkPassword:false,
          checkIsCheck:true,
          isSubmitSuccess: false
      }
  },
    created() {
        document.title = '注册';
    },
    mounted() {
        
    },
    methods: {
        _checkPhoneNumber() {
            let re = /^\d{11}$/;
            this.checkPhoneNumber = false;
            if(re.test(this.phoneNumber)){
                this.checkPhoneNumber = true;
            }
        },
        _checkVerification() {
            let re = /^\d{4}$/;
            this.checkVerification = false;
            if(re.test(this.verification)){
                this.checkVerification = true;
            }
        },
        _checkPassword() {
            let re = /^[a-zA-Z0-9]{6,}$/;
            this.checkPassword = false;
            if(re.test(this.password)){
                this.checkPassword = true;
            }
        },
        _checkPasswordAgain() {
            this.checkPasswordAgain = false;
            if(this.password == this.passwordAgain){
                this.checkPasswordAgain = true;
            }
        },
        sendVerification() {
            this.timer = setInterval(() => {
                this.countdown--;
            }, 1000);
            if(this.flag){
                this.flag = false
            }
        },
        MarkHide() {
            this.isMarkShow = false;
        },
        toRegister() {
            if(this.phoneNumber && this.verification && this.password && this.passwordAgain && this.isCheck.state){
                if(!this.checkPhoneNumber){
                    setTimeout(() => {
                        this.isDialogShow = true;
                    },100);
                    this.dialogTit = '手机号填写错误';
                    return;
                }
                if(!this.checkVerification){
                    setTimeout(() => {
                        this.isDialogShow = true;
                    },100);
                    this.dialogTit = '验证码填写错误';
                    return;
                }
                if(!this.checkPassword){
                    setTimeout(() => {
                        this.isDialogShow = true;
                    },100);
                    this.dialogTit = '请输入六位以上密码';
                    return;
                }
                if(!this.checkPasswordAgain){
                    setTimeout(() => {
                        this.isDialogShow = true;
                    },100);
                    this.dialogTit = '两次密码不一致';
                    return;
                }
                if(!this.checkIsCheck){
                    setTimeout(() => {
                        this.isDialogShow = true;
                    },100);
                    this.dialogTit = '请阅读注册协议';
                    return;
                }
                //ajax...
                this.isSubmitSuccess = true;
                setTimeout(() => {
                    this.isSubmitSuccess = false;
                    this.isMarkShow = true;
                }, 2000);
            }else{
                setTimeout(() => {
                    this.isDialogShow = true;
                },100);
                this.dialogTit = '请填写完整信息';
            }
        },
        onCheck(isCheck) {
            isCheck.state = !isCheck.state;
        }
    },
    watch: {
        countdown() {
            if(this.countdown === -1){
                this.flag = true;
                this.sendTxt = '重新发送';
                clearInterval(this.timer);
                this.countdown = 59;
                return;
            }
        },
        isDialogShow() {
            if(this.isDialogShow) {
                setTimeout(() => {
                    this.isDialogShow = false
                }, 1300);
            }
        },
        password() {
            if(this.password != this.passwordAgain){
                this.checkPasswordAgain = false;
            }else{
                this.checkPasswordAgain = true;
            }
        }
    },
    computed: {

    },
    components: {
        'v-dialog': dialog,
        loading
    }
}
</script>
<style lang="scss" scoped>
    .slider-enter, .slider-leave-to{
        transform: translate3d(100%, 0, 0);
    }
    .slider-enter-active, .slider-leave-active{
        transition: all 0.2s;
    }
    .register-user{
        .register-user-content{
            padding-top: 28px;
            li{
                margin: 0 auto; 
                height: 56px;
                width: 94%;
                input{
                    width: 100%;
                    border: 1px solid #dfdfdf;
                    height: 40px;
                    text-indent: 10px;
                    box-sizing: border-box;
                    &.verification{
                        width: 60%;
                        
                    }
                    &.register-btn{
                        background-color: orangered;
                        border: none;
                        color: #fff;
                        font-size: 14px;
                    }
                    &.register-btn-disable{
                        background-color: #ccc;
                    }
                    &.check{
                        width: 14px;
                        height: 14px;
                        vertical-align: middle;
                    }
                }
                .tip{
                    font-size: 10px;
                    color: #f00;
                    line-height: 16px;
                    display: inline-block;
                }
                .verification-btn{
                    float: right;
                    width: 35%;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    border: 1px solid orangered;
                    color: orangered;
                    box-sizing: border-box;
                    &.disable{
                        border: 1px solid #dfdfdf;
                        color: #ccc;
                    }
                }
                .check-text{
                    vertical-align: middle;
                }
            }
        }
        .reg-classes{
            position: absolute;
            width: 92%;
            height: 30%;
            background:#fff;
            z-index: 99;
            left: 4%;
            top: 34%;
            border-radius: 8px;
            padding-top: 20px;
            text-align: center;
            h2{
                line-height: 40px;
                font-size: 18px;
                font-weight: 500;
            }
            .classes{
                display: flex;
                padding-top: 20px;
                li{
                    flex: 1;
                    text-align: center;
                    img{
                        width: 50px;
                        height: 50px;
                        margin-bottom: 14px;
                    }
                }
            }
        }
        .fadea-leave-active, .fadea-enter-active{
            transition: all 0.2s;
        }   
        .fadea-enter, .fadea-leave-to{
            transform: translate3d(0, 200%, 0);
        }
        .mark{
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0,0,0,0.4);

        }
    }
</style>


