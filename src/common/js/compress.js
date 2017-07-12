import {api} from '../../api/api.js';
import axios from 'axios';
export function imgPreview (that, file, type) {  
    let self = that;  
    let Orientation;  
    if (!file || !window.FileReader) return;  
    if (/^image/.test(file.type)) {  
        // 创建一个reader  
        let reader = new FileReader();  
        // 将图片2将转成 base64 格式  
        reader.readAsDataURL(file);  
        // 读取成功后的回调  
        reader.onloadend = function () {  
            let result = this.result;  
            let img = new Image();  
            img.src = result;  
            //判断图片是否大于100K,是就直接上传，反之压缩图片  
            if (this.result.length <= (100 * 1024)) {  
                // self[type] = this.result;
                if(type == 'imageFront'){
                    upImgFront(self, this.result);
                    // self.imageFront = this.result;
                }
                if(type == 'imageReverse'){
                    upImgReverse(self, this.result);
                    // self.imageReverse = this.result;
                }
                if(type == 'imageLicense'){
                    upImgLicense(self, this.result);
                    // self.imageLicense = this.result;
                }
                if(type == 'imageDangerous'){
                    upImgDangerous(self, this.result);
                    // self.imageDangerous = this.result;
                }
                if(type == 'imageRoad'){
                    upImgRoad(self, this.result);
                    // self.imageRoad = this.result;
                }
                if(type == 'imageDriver'){
                    upImgDriver(self, this.result);
                    // self.imageDriver = this.result;
                }
                if(type == 'imageCarFront'){
                    upImgCarFront(self, this.result);
                    // self.imageCarFront = this.result;
                }
                if(type == 'imageVehicle'){
                    upImgRun(self, this.result);
                    // self.imageVehicle = this.result;
                }
                
            }else {  
                img.onload = function () {  
                    // self[type] = compress(img,Orientation);
                    let src = compress(img,Orientation);
                    if(type == 'imageFront'){
                        upImgFront(self, src);
                        // self.imageFront = src;
                    }
                    if(type == 'imageReverse'){
                        upImgReverse(self, src);
                        // self.imageReverse = src;
                    }
                    if(type == 'imageLicense'){
                        upImgLicense(self, src);
                        // self.imageLicense = src;
                    }
                    if(type == 'imageDangerous'){
                        upImgDangerous(self, src);
                        // self.imageDangerous = src;
                    }
                    if(type == 'imageRoad'){
                        upImgRoad(self, src);
                        // self.imageRoad = src;
                    }
                    if(type == 'imageDriver'){
                        upImgDriver(self, src);
                        // self.imageDriver = src;
                    }
                    if(type == 'imageCarFront'){
                        upImgCarFront(self, src);
                        // self.imageCarFront = src;
                    }
                    if(type == 'imageVehicle'){
                        upImgRun(self, src);
                        // self.imageVehicle = src;
                    }
                }  
            }  
        }   
    }  
}
function compress(img,Orientation) {  
    let canvas = document.createElement("canvas");  
    let ctx = canvas.getContext('2d');  
        //瓦片canvas  
    let tCanvas = document.createElement("canvas");  
    let tctx = tCanvas.getContext("2d");  
    let initSize = img.src.length;  
    let width = img.width;  
    let height = img.height;  
    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下  
    let ratio;  
    if ((ratio = width * height / 4000000) > 1) {  
        console.log("大于400万像素")  
        ratio = Math.sqrt(ratio);  
        width /= ratio;  
        height /= ratio;  
    } else {  
        ratio = 1;  
    }  
    canvas.width = width;  
    canvas.height = height;  
//        铺底色  
    ctx.fillStyle = "#fff";  
    ctx.fillRect(0, 0, canvas.width, canvas.height);  
    //如果图片像素大于100万则使用瓦片绘制  
    let count;  
    if ((count = width * height / 1000000) > 1) {  
        console.log("超过100W像素");  
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片  
//            计算每块瓦片的宽和高  
        let nw = ~~(width / count);  
        let nh = ~~(height / count);  
        tCanvas.width = nw;  
        tCanvas.height = nh;  
        for (let i = 0; i < count; i++) {  
        for (let j = 0; j < count; j++) {  
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);  
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);  
        }  
        }  
    } else {  
        ctx.drawImage(img, 0, 0, width, height);  
    }   
    //进行最小压缩  
    let ndata = canvas.toDataURL('image/jpeg', 0.3);  
    console.log('压缩前：' + initSize);  
    console.log('压缩后：' + ndata.length);  
    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");  
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;  
    return ndata;  
}
// 身份证正面
function upImgFront(that, src) {
    that.isLoadingShow = true;
    that.loadingTit = '图片上传中...';
    axios({
        method: 'post',
        url: api + '/upload/image/base64',
        data: {
            fileBase64: src,
            authType: '1'
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
        that.isLoadingShow = false;
        if(res.data.code == 0){
            that.imageFrontPath = res.data.data.path;
            if(res.data.data.info){
                if(res.data.data.info.address){
                    that.idCardFrontDialogAddress = res.data.data.info.address;
                }
                if(res.data.data.info.name){
                    that.idCardFrontDialogName = res.data.data.info.name;
                }
                if(res.data.data.info.number){
                    that.idCardFrontDialogId = res.data.data.info.number;
                }
            }
            that.idCardFrontDialog = true;
            that.isFrontSuccess = true;
            that.imageFront = src;
        }else{
            setTimeout(() => {
                that.isDialogShow = true;
            },100);
            that.dialogTit = '图片上传失败';
        }
    })
    .catch((error) => {
        // that.isLoadingShow = false;
        // setTimeout(() => {
        //     that.isDialogShow = true;
        // },100);
        // that.dialogTit = '服务器错误';
        // console.log('错误了'+ error);
    });
}
// 身份证反面
function upImgReverse(that, src){
    that.isLoadingShow = true;
    that.loadingTit = '图片上传中...';
    axios({
        method: 'post',
        url: api + '/upload/image/base64',
        data: {
            fileBase64: src,
            authType: '2'
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
        that.isLoadingShow = false;
        if(res.data.code === 0){
            if(res.data.data.info){
                if(res.data.data.info.enddate){
                    that.idCardEndTime = res.data.data.info.enddate;
                }
            }
            that.imageReversePath = res.data.data.path;
            that.idCardReDialog = true;
            that.isReSuccess = true;
            that.imageReverse = src;
        }else{
            setTimeout(() => {
                that.isDialogShow = true;
            },100);
            that.dialogTit = '图片上传失败';
        }
    })
    .catch((error) => {
        // that.isLoadingShow = false;
        // setTimeout(() => {
        //     that.isDialogShow = true;
        // },100);
        // that.dialogTit = '服务器错误';
    });
}
//营业执照
function upImgLicense(that, src){
    that.isLoadingShow = true;
    that.loadingTit = '图片上传中...';
    axios({
        method: 'post',
        url: api + '/upload/image/base64',
        data: {
            fileBase64: src,
            authType: '5'
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
        that.isLoadingShow = false;
        if(res.data.code === 0){
            that.imageLicensePath = res.data.data.path;
            console.log(res.data);
            if(res.data.data.info){
                if(res.data.data.info.person){
                    that.dialogName = res.data.data.info.person;
                }
                if(res.data.data.info.name){
                    that.dialogCompanyNum = res.data.data.info.name;
                }
                if(res.data.data.info.valid_period){
                    that.dialogEndTime = res.data.data.info.valid_period;
                }
                if(res.data.data.info.reg_num){
                    that.dialogCode = res.data.data.info.reg_num;
                }
                if(res.data.data.info.address){
                    that.dialogAddress = res.data.data.info.address;
                }
            }
            that.dialogBusinessShow = true;
            that.isBusinessSuccess = true;
            that.imageLicense = src;
        }else{
            setTimeout(() => {
                that.isDialogShow = true;
            },100);
            that.dialogTit = '图片上传失败';
        }
    })
    .catch((error) => {
        // that.isLoadingShow = false;
        // setTimeout(() => {
        //     that.isDialogShow = true;
        // },100);
        // that.dialogTit = '服务器错误';
        // console.log('错误了'+ error)
    });
}
// 危险品运输许可证
function upImgDangerous(that, src){
    that.isLoadingShow = true;
    that.loadingTit = '图片上传中...';
    axios({
        method: 'post',
        url: api + '/upload/image/base64',
        data: {
            fileBase64: src
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
        that.isLoadingShow = false;
        if(res.data.code === 0){
            that.imageDangerousPath = res.data.data.path;
            setTimeout(() => {
                that.isDialogShow = true;
            },100);
            that.dialogTit = '图片上传成功';
            that.isDangerSuccess = true;
            that.imageDangerous = src;
        }else{
            setTimeout(() => {
                that.isDialogShow = true;
            },100);
            that.dialogTit = '图片上传失败';
        }
    })
    .catch((error) => {
        // that.isLoadingShow = false;
        // setTimeout(() => {
        //     that.isDialogShow = true;
        // },100);
        // that.dialogTit = '服务器错误';
    });
}
// 道路运输许可证
function upImgRoad(that, src){
    that.isLoadingShow = true;
    that.loadingTit = '图片上传中...';
    axios({
        method: 'post',
        url: api + '/upload/image/base64',
        data: {
            fileBase64: src
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
        that.isLoadingShow = false;
        if(res.data.code === 0){
            that.imageRoadPath = res.data.data.path;
            setTimeout(() => {
                that.isDialogShow = true;
            },100);
            that.dialogTit = '图片上传成功';
            that.isRoadSuccess = true;
            that.imageRoad = src;
        }else{
            setTimeout(() => {
                that.isDialogShow = true;
            },100);
            that.dialogTit = '图片上传失败';
        }
    })
    .catch((error) => {
        // that.isLoadingShow = false;
        // setTimeout(() => {
        //     that.isDialogShow = true;
        // },100);
        // that.dialogTit = '服务器错误';
    });
}

//驾照
function upImgDriver(that, src){
    that.isLoadingShow = true;
    that.loadingTit = '图片上传中...';
    axios({
        method: 'post',
        url: api + '/upload/image/base64',
        data: {
            fileBase64: src,
            authType: '3'
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
        that.isLoadingShow = false;
        if(res.data.code === 0){
            that.imageDriverPath = res.data.data.path;
            if(res.data.data.info){
                if(res.data.data.info.enddate){
                    let str = res.data.data.info.enddate;
                    if(str.length == 14){
                        let str1 = str.substring(4,0);
                        let str2 = str.substring(8);
                        let last = str1 + str2;
                        that.driveCardEndTime = last;
                    }else{
                        that.driveCardEndTime = str;
                    }
                }
                if(res.data.data.info.type){
                    that.driveType = res.data.data.info.type;
                }
            }
            that.imageLicensePath = res.data.data.path;
            that.driveCardDialog = true;
            that.isDriverSuccess = true;
            that.imageDriver = src;
        }else{
            setTimeout(() => {
                that.isDialogShow = true;
            },100);
            that.dialogTit = '图片上传失败';
        }
    })
    .catch((error) => {
        // that.isLoadingShow = false;
        // setTimeout(() => {
        //     that.isDialogShow = true;
        // },100);
        // that.dialogTit = '服务器错误';
    });
}
// 车辆正面照
function upImgCarFront(that, src){
    that.isLoadingShow = true;
    that.loadingTit = '图片上传中...';
    axios({
        method: 'post',
        url: api + '/upload/image/base64',
        data: {
            fileBase64: src
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
        that.isLoadingShow = false;
        if(res.data.code === 0){
            that.imageCarFrontPath = res.data.data.path;
            setTimeout(() => {
                that.isDialogShow = true;
            },100);
            that.dialogTit = '图片上传成功';
            that.isCarFrontSuccess = true;
            that.imageCarFront = src;
        }else{
            setTimeout(() => {
                that.isDialogShow = true;
            },100);
            that.dialogTit = '图片上传失败';

        }
    })
    .catch((error) => {
        // that.isLoadingShow = false;
        // setTimeout(() => {
        //     that.isDialogShow = true;
        // },100);
        // that.dialogTit = '服务器错误';
    });
}

//行驶证
function upImgRun(that, src){
    that.isLoadingShow = true;
    that.loadingTit = '图片上传中...';
    axios({
        method: 'post',
        url: api + '/upload/image/base64',
        data: {
            fileBase64: src,
            authType: '4'
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
        that.isLoadingShow = false;
        if(res.data.code === 0){
            that.imageVehiclePath = res.data.data.path;
            if(res.data.data.info){
                if(res.data.data.info.realname){
                    that.dialogOwner = res.data.data.info.realname;
                }
                if(res.data.data.info.engineno){
                    that.dialogEngineNum = res.data.data.info.engineno;
                }
                if(res.data.data.info.frameno){
                    that.dialogDiscernCode = res.data.data.info.frameno;
                }
                if(res.data.data.info.lsprefix){
                    that.dialogPlateNum = res.data.data.info.lsprefix;
                }
                if(res.data.data.info.lsnum){
                    that.dialogPlateNum += res.data.data.info.lsnum;
                }
            }
            that.confirmRunShow = true;
            that.isRunSuccess = true;
            that.imageVehicle = src;
        }else{
            setTimeout(() => {
                that.isDialogShow = true;
            },100);
            that.dialogTit = '图片上传失败';
        }
    })
    .catch((error) => {
        // that.isLoadingShow = false;
        // setTimeout(() => {
        //     that.isDialogShow = true;
        // },100);
        // that.dialogTit = '服务器错误';
    });
}