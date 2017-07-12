
<template>
  <div class="confirm">
    <transition name="fadea">
        <div class="confirm-msg">
            <b class="close-btn" @click="close"></b>
            <h2>请确认证件信息或修改</h2>
            <ul class="msg-box">
                <li>
                    <span>公司名称：</span>
                    <input type="text" v-model="companyNum">
                </li>
                <li>
                    <span>营业执照编码：</span>
                    <input type="text" v-model="code">
                </li>
                <li>
                    <span>法人姓名：</span>
                    <input type="text" v-model="name">
                </li>
                <li>
                    <span>公司地址：</span>
                    <input type="text" v-model="address">
                </li>
                <li>
                    <span>营业执照有效期：</span>
                    <input type="text" v-model="EndTime">
                </li>
                <li>
                    <button @click="sendFather">提交</button>
                </li>
            </ul>
        </div>
    </transition>
  </div>
</template>

<script>
// 营业执照
export default {
  data() {
      return {
        cardVal: {
            companyNum: '',
            name: '',
            EndTime: '',
            code: '',
            address: '',
            thisShow: false
        }
      }
  },
  props: {
    companyNum: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    EndTime: {
        type: String,
        default: ''
    },
    code: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    }
  },
  methods: {
    sendFather() {
        this.cardVal.companyNum = this.companyNum;
        this.cardVal.name = this.name;
        this.cardVal.EndTime = this.EndTime;
        this.cardVal.code = this.code;
        this.cardVal.address = this.address;
        this.$emit('businessCard', this.cardVal);
    },
    close() {
        this.$emit('clossBusiness', this.cardVal.thisShow);
    }
  },
  watch: {
      
  }
}
</script>

<style lang="scss" scoped>
  .confirm{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 99;
      background: rgba(0,0,0,0.3);
      .confirm-msg{
        position: absolute;
        width: 92%;
        height: 270px;
        background:#fff;
        z-index: 99;
        left: 4%;
        top: 20%;
        border-radius: 8px;
        padding-top: 20px;
        text-align: center;
        .close-btn{
            display: block;
            position: absolute;
            right: 10px;
            top: 10px;
            width: 24px;
            height: 24px;
            background: url(../../assets/delete.png);
            background-size: cover;
            border-radius: 50%;
        }
        h2{
            line-height: 20px;
            font-size: 15px;
            font-weight: 700;
            color: #c00211;
        }
        .msg-box{
            width: 90%;
            margin: 0 auto;
            li{
                height: 30px;
                line-height: 30px;
                display: flex;
                margin: 10px 0;
                span{
                    flex: 3.9;
                    text-align: left;
                    text-indent: 6px;
                }
                input, textarea{
                    flex: 6.1;
                    border: 1px solid #dfdfdf;
                    box-sizing: border-box;
                    text-indent: 10px;
                }
                button{
                    width: 60%;
                    margin: 0 auto;
                    background: orange;
                    border: none;
                    color: #fff;

                }
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
</style>
