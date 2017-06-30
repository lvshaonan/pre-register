<template>
  <div class="slider" ref="slider">
      <div class="slider-wrapper" ref="sliderWrapper">
          <slot></slot>
      </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
  props: {
    loop: {
        type:Boolean,
        default:true
    },
    autoPlay: {
        type: Boolean,
        default:true
    },
    interval: {
        type:Number,
        default: 4000
    },
    bounce: {
        type: Boolean,
        default:true
    }
  },
  methods: {
    _initSetWidth() {
        this.children = this.$refs.sliderWrapper.children;
        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth;
        for(let i=0;i<this.children.length;i++){
            this.children[i].style.width = sliderWidth + 'px';
            width += sliderWidth;
        }
        if(this.loop){
            width += sliderWidth * 2;
        }
        this.$refs.sliderWrapper.style.width =width + 'px';
    },
    _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
            scrollX:true,
            scrollY:false,
            snap:true,
            snapLoop:this.loop,
            momentum:false,
            click:true,
            bounce: this.bounce
        });
        this.slider.on('scrollEnd', () => {
            let pageIndex = this.slider.getCurrentPage().pageX;
            if(this.loop){
                pageIndex -= 1;
            }
            this.currentPageIndex = pageIndex;
        });
        this.slider.on('beforeScrollStart', () => {
            
        });
    }
  },
  mounted() {
    this.$nextTick(() => {
        this._initSetWidth();
        this._initSlider();
    })
  }
}
</script>
<style lang="scss" scoped>
    .slider{
        width: 100%;
        position: relative;
        overflow: hidden;
        .slider-wrapper{
            .slider-item{
                float: left;
                a{
                    display: block;
                }
                img{
                    width: 100%;
                }
            }
        }
    }
</style>
