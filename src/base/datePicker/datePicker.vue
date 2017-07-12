<<<<<<< HEAD
<template>
  <div class="date-picker" ref="datePicker">
      <div class="input-picker" @click="timePicker">{{time}}</div>
  </div>
</template>
<script>
import Picker from 'better-picker';
export default {
    data() {
        return {
            timeVal: ''
        }
    },
    props: {
        time: {
            type:String,
            default: ''
        }
    },
    mounted() {
    },
    methods: {
        timePicker(e){
            let myDate = new Date();
            let year = myDate.getFullYear();
            let nowMonth = myDate.getMonth() + 1;
            let nowDate = myDate.getDate();
            let month = 1;
            let date = 1;
            let data1 = [];
            let data2 = [];
            let data3 = [];
            for(let i=0;i<20;i++){
                let json = {};
                json.text = year;
                json.value = year;
                data1.push(json);
                year++;
            }
            for(let i=0;i<12;i++){
                let json = {};
                json.text = month;
                json.value = month;
                data2.push(json);
                month++;
            }
            for(let i=0;i<31;i++){
                let json = {};
                json.text = date;
                json.value = date;
                data3.push(json);
                date++;
            }
            let selectedIndex = [0, nowMonth-1, nowDate-1];
            this.picker = new Picker({
                data: [data1, data2, data3],
                selectedIndex: selectedIndex
            });
            let that = this;
            this.picker.on('picker.select', function (selectedVal, selectedIndex) {
                let m = data2[selectedIndex[1]].text < 10 ? '0'+data2[selectedIndex[1]].text : data2[selectedIndex[1]].text;
                let d = data3[selectedIndex[2]].text < 10 ? '0'+data3[selectedIndex[2]].text : data3[selectedIndex[2]].text;
                e.target.innerHTML = data1[selectedIndex[0]].text + '-' + m + '-' + d;
                that.timeVal = data1[selectedIndex[0]].text + '-' + data2[selectedIndex[1]].text + '-' + data3[selectedIndex[2]].text;
                that.$emit('sendDate', that.timeVal);
            });
            this.picker.show();
        }
    },
    mounted() {
        
    },
    watch: {
        
    }
}
</script>
<style lang="scss">
    .date-picker{
        width: 100%;
        height: 100%;
        .input-picker{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 1px solid #dfdfdf;
            text-indent: 10px;
            display: inline-block;
            font-size: 12px;
        }
    }
</style>
=======
<template>
  <div class="date-picker" ref="datePicker">
      <div class="input-picker" @click="timePicker"></div>
  </div>
</template>
<script>
import Picker from 'better-picker';
export default {
    data() {
        return {
            timeVal: ''
        }
    },
    props: {
        
    },
    mounted() {
    },
    methods: {
        timePicker(e){
            let myDate = new Date();
            let year = myDate.getFullYear();
            let nowMonth = myDate.getMonth() + 1;
            let nowDate = myDate.getDate();
            let month = 1;
            let date = 1;
            let data1 = [];
            let data2 = [];
            let data3 = [];
            for(let i=0;i<20;i++){
                let json = {};
                json.text = year;
                json.value = year;
                data1.push(json);
                year++;
            }
            for(let i=0;i<12;i++){
                let json = {};
                json.text = month;
                json.value = month;
                data2.push(json);
                month++;
            }
            for(let i=0;i<31;i++){
                let json = {};
                json.text = date;
                json.value = date;
                data3.push(json);
                date++;
            }
            let selectedIndex = [0, nowMonth-1, nowDate-1];
            this.picker = new Picker({
                data: [data1, data2, data3],
                selectedIndex: selectedIndex
            });
            let that = this;
            this.picker.on('picker.select', function (selectedVal, selectedIndex) {
                let m = data2[selectedIndex[1]].text < 10 ? '0'+data2[selectedIndex[1]].text : data2[selectedIndex[1]].text;
                let d = data3[selectedIndex[2]].text < 10 ? '0'+data3[selectedIndex[2]].text : data3[selectedIndex[2]].text;
                e.target.innerHTML = data1[selectedIndex[0]].text + '-' + m + '-' + d;
                that.timeVal = data1[selectedIndex[0]].text + '-' + data2[selectedIndex[1]].text + '-' + data3[selectedIndex[2]].text;
                that.$emit('sendDate', that.timeVal);
            });
            this.picker.show();
        }
    },
    mounted() {
        
    },
    watch: {
        
    }
}
</script>
<style lang="scss">
    .date-picker{
        width: 100%;
        height: 100%;
        .input-picker{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 1px solid #dfdfdf;
            text-indent: 10px;
            display: inline-block;
            font-size: 12px;
        }
    }
</style>
>>>>>>> 6045335339b92ce7a4904f53d26a48b1de2137f1
