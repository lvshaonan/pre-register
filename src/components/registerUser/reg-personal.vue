<template>
    <transition name="slider">
        <div class="reg-personal">
            <div class="header">
                <b class="back" @click="back">
                    &lt;
                </b>
                <h1>完善信息</h1>
            </div>
            <div class="reg-personal-content">
                <ul>
                    <li class="input-img">
                        <span class="item">身份证正面照</span>
                        <span class="item-value">
                            <a href="javascript:" class="input-img-btn" v-on:click="addPicFront">+</a>
                            <input type="file" @change="onFileFrontChange" multiple style="display: none;" ref="onFileFrontChange" accept="image/*" capture="camera">
                            <span class="img-wrapper" v-if="imageFront">
                                <img :src="imageFront" alt="" >
                            </span>
                        </span>
                    </li>
                    <li class="input-img">
                        <span class="item">
                            身份证反面照
                        </span>
                        <span class="item-value">
                            <a href="javascript:" class="input-img-btn" v-on:click="addPicReverse">+</a>
                            <input type="file" @change="onFileReverseChange" multiple style="display: none;" ref="onFileReverseChange" accept="image/*" capture="camera">
                            <span class="img-wrapper" v-if="imageReverse">
                                <img :src="imageReverse" alt="" >
                            </span>
                        </span>
                    </li>
                    <li>
                        <span class="item">
                            姓名
                        </span>
                        <span class="item-value">
                            <input type="text">
                        </span>
                    </li>
                    <li>
                        <span class="item">
                            身份证号
                        </span>
                        <span class="item-value">
                            <input type="text">
                        </span>
                    </li>
                    <li>
                        <span class="item">
                            地址
                        </span>
                        <span class="item-value">
                            <input type="text">
                        </span>
                    </li>
                    <li>
                        <span class="item">
                            身份证有效期
                        </span>
                        <span class="item-value">
                            <input type="text">
                        </span>
                    </li>
                    <li>
                        <span class="item">
                            联系电话
                        </span>
                        <span class="item-value">
                            <input type="text">
                        </span>
                    </li>
                    <li class="submit-li">
                        <button class="submit">提交</button>
                    </li>
                    <li>
                        <button class="later">跳过，稍后完善</button>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    data() {
        return {
            imageFront: '',
            imageReverse: ''
        }
    },
    methods: {
        back() {
            this.$router.back();
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
            this.createImage(files, 'front');
        },
        onFileReverseChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files, 'reverse');
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
            top: 44px;
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
                                width: 66px;
                                height: 54px;
                                margin-left: 10px;
                                vertical-align: middle;
                                img{
                                    width: 100%;
                                    height: 100%;
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