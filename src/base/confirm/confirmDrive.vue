<template>
  <div class="confirm">
    <transition name="fadea">
        <div class="confirm-msg">
            <b class="close-btn" @click="close"></b>
            <h2>请确认证件信息或修改</h2>
            <ul class="msg-box">
                <li>
                    <span>准驾车型：</span>
                    <input type="text" v-model="driveType">
                </li>
                <li>
                    <span>驾驶证有效期：</span>
                    <input type="text" v-model="driveEndTime">
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
export default {
  data() {
      return {
        cardVal: {
            driveEndTime: '',
            driveType: '',
            thisShow: false
        }
      }
  },
  mounted() {
  },
  props: {
    driveType: {
        type: String,
        default: ''
    },
    driveEndTime: {
        type: String,
        default: ''
    }
  },
  methods: {
    sendFather() {
        this.cardVal.driveEndTime = this.driveEndTime;
        this.cardVal.driveType = this.driveType;
        this.$emit('driveCard', this.cardVal);
    },
    close() {
        this.$emit('clossDriver', this.cardVal.thisShow);
    }
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
        height: 160px;
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
                    flex: 3.7;
                    text-align: left;
                    text-indent: 10px;
                }
                input{
                    flex: 6.3;
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
