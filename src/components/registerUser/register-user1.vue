<template>
    <transition name="slider">
        <div class="register-user">
            <ul class="register-user-content">
                <li>
                    <input type="text" placeholder="请输入手机号" v-model="phoneNumber" @blur="checkPhoneNumber">
                    <span class="tip" v-show="tipPhone.isShow">{{tipPhone.text}}</span>
                </li>
                <li>
                    <input type="text" placeholder="请输入验证码" class="verification" v-model="verification" @blur="checkVerification">
                    <div class="verification-btn" v-if="flag" @click="sendVerification">{{sendTxt}}</div>
                    <div class="verification-btn disable" v-else>{{countdown}}s</div>
                    <span class="tip" v-show="tipVerification.isShow">{{tipVerification.text}}</span>
                </li>
                <li>
                    <input type="password" placeholder="请输入密码，至少六位" v-model="password" @blur="checkPassword">
                    <span class="tip" v-show="tipPass.isShow">{{tipPass.text}}</span>
                </li>
                <li>
                    <input type="password" placeholder="确认密码"  v-model="passwordAgain" @blur="checkPasswordAgain">
                    <span class="tip" v-show="tipPassAgain.isShow">{{tipPassAgain.text}}</span>
                </li>
                <li>
                    <input type="button" v-if="btnFlag" value="注册" class="register-btn" @click="toRegister">
                    <input type="button" v-else value="注册" class="register-btn register-btn-disable">
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
                        <router-link to="/regPersonal" tag="li">个人</router-link>
                        <router-link to="/regCompany" tag="li">企业</router-link>
                    </ul>
                </div>
            </transition>
            <div class="mark" v-show="isMarkShow" @click="MarkHide"></div>
            <v-dialog :title="dialogTit" v-show="isDialogShow"></v-dialog>
        </div>
    </transition>
</template>
<script>
import dialog from '../../base/dialog/dialog';
export default {
  data() {
      return {
          tipPhone:{
              isShow: false,
              text: ''
          },
          tipVerification: {
              isShow: false,
              text: ''
          },
          tipPass: {
              isShow: false,
              text: ''
          },
          tipPassAgain: {
              isShow: false,
              text: ''
          },
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
          dialogTit: '密码不能为空'
      }
  },
    created() {
        document.title = '注册';
    },
    mounted() {
        
    },
    methods: {
        checkPhoneNumber() {
            let re = /^\d{11}$/;
            this.tipPhone.isShow = this._checkRules(this.phoneNumber, '手机号', re).isShow;
            this.tipPhone.text = this._checkRules(this.phoneNumber, '手机号', re).text;
        },
        checkVerification() {
            let re = /^\d{4}$/;
            this.tipVerification.isShow = this._checkRules(this.verification, '验证码', re).isShow;
            this.tipVerification.text = this._checkRules(this.verification, '验证码', re).text;
        },
        checkPassword() {
            let re = /^[a-zA-Z0-9]{6,}$/;
            this.tipPass.isShow = this._checkRules(this.password, '密码', re).isShow;
            this.tipPass.text = this._checkRules(this.password, '密码', re).text;
        },
        checkPasswordAgain() {
            this.tipPassAgain.isShow = this._checkRules(this.passwordAgain, '密码', '', this.password).isShow;
            this.tipPassAgain.text = this._checkRules(this.passwordAgain, '密码', '', this.password).text;
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
            this.isDialogShow = true;
            if(this.phoneNumber && this.verification && this.password && this.passwordAgain && this.isCheck.state){
                this.isMarkShow = true;
            }
        },
        onCheck(isCheck) {
            isCheck.state = !isCheck.state;
        },
        _checkRules(val, tip, re, val2) {
            if(val != ''){
                if(re){
                    if(!re.test(val)){
                        return {
                            isShow: true,
                            text: `${tip}格式错误`
                        }
                    }else{
                        return {
                            isShow: false
                        }
                    }
                }else{
                    if(val != val2){
                        return {
                            isShow: true,
                            text: `两次${tip}不一致`
                        }
                    }else{
                        return {
                            isShow: false
                        }
                    }
                }
            }else{
                return {
                    isShow: true,
                    text: `${tip}不能为空`
                }
            }
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
                }, 3000);
            }
        }
    },
    computed: {
        btnFlag() {
            if(!this.tipPhone.isShow && !this.tipVerification.isShow && !this.tipPass.isShow && !this.tipPassAgain.isShow && this.isCheck.state){
                return true;
            }
        }
    },
    components: {
        'v-dialog': dialog
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


