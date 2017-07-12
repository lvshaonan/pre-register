<template>
  <div class="slider" ref="slider">
      <div class="slider-wrapper" ref="sliderWrapper">
          <slot></slot>
      </div>
      <div class="dots">
        <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
      </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
    data() {
        return {
            currentPageIndex: 0,
            dots: []
        }
    },
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
    },
    _initDots() {
        this.dots = new Array(2);
    },
    nextPage() {
        this.currentPageIndex++;
        this.slider.goToPage(this.currentPageIndex, 0, 400);
    }
  },
  mounted() {
    this.$nextTick(() => {
        this._initSetWidth();
        this._initSlider();
        this._initDots();
    })
  },
  watch: {
      currentPageIndex() {
          this.$emit('sendIndex', this.currentPageIndex);
      }
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
        .dots{
            position: absolute;
            right: 0;
            left: 0;
            bottom: 12%;
            text-align: center;
            font-size: 0;
            .dot{
                display: inline-block;
                margin: 0 4px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.4);
                &.active{
                    width: 20px;
                    border-radius: 5px;
                    background: rgba(0, 0, 0, 0.6);
                }
            }
        }
    }
</style>
