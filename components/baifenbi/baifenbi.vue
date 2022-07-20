<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <div class="step">
      <!-- 左边100%的时候不显示斜边三角形，并且增加右边角 -->
      <div
        class="left"
        :v-show="{leftPercent}"
        :class="[{ 'full-left': !rightPercent }, { 'tringle': rightPercent }]"
        :style="{ width: leftPercent+'%' }"
        @mouseover="onMouseTooltip(LEFT_BAR, SHOW_TIP)"
        @mouseleave="onMouseTooltip(LEFT_BAR, HIDE_TIP)"
      >
        <div class="bar-tip-box" v-show="leftBar.isShowTip">
          <p>总数：{{ totalNum }}</p>
          <p>红色所占的比例：{{ leftPercent }}%</p>
        </div>
        <div class="tip-arrow" v-show="leftBar.isShowTip"></div>
        {{ leftPercent }}%
      </div>
      <div
        class="right"
        v-show="rightPercent"
        :class="[{ 'full-right': !leftPercent }]"
        @mouseover="onMouseTooltip(RIGHT_BAR, SHOW_TIP)"
        @mouseleave="onMouseTooltip(RIGHT_BAR, HIDE_TIP)"
      >
        <div class="bar-tip-box" v-show="rightBar.isShowTip">
          <p>总数：{{ totalNum }}</p>
          <p>蓝色所占比例：{{ rightPercent }}%</p>
        </div>
        <div class="tip-arrow" v-show="rightBar.isShowTip"></div>
        {{ rightPercent }}%
      </div>
    </div>
  </div>
  
</template>
 
<script>
const LEFT_BAR = "left";
const RIGHT_BAR = "right";
const SHOW_TIP = "show";
const HIDE_TIP = "hide";
 
export default {
	props:{
			  leftPercent:{
				  type:Number,
				  default:50,
			  },
			  totalNum:{
				  type:Number,
				  default:0,
			  }
	},
  data() {
    return {
      LEFT_BAR: LEFT_BAR,
      RIGHT_BAR: RIGHT_BAR,
      SHOW_TIP: SHOW_TIP,
      HIDE_TIP: HIDE_TIP,
      // totalNum: 500,
      // leftPercent: 20,
      leftBar: {
        isShowTip: false,
        delayOut: null
      },
      rightBar: {
        isShowTip: false,
        delayOut: null
      }
    };
  },
  computed: {
    rightPercent: function(){
      return 100 - this.leftPercent;
    }
  },
  methods: {
    onMouseTooltip(tipType, actionType) {
      let bar = null;
      if (tipType == LEFT_BAR) {
        bar = this.leftBar;
      } else if (tipType == RIGHT_BAR) {
        bar = this.rightBar;
      } else {
        return;
      }
      if (actionType === SHOW_TIP) {
        this.showBarTooltip(bar);
      } else if (actionType === HIDE_TIP) {
        this.hideBarTooltip(bar);
      } else {
        return;
      }
    },
    showBarTooltip(bar) {
      if (bar.delayOut != null) {
        clearTimeout(bar.delayOut);
      }
      bar.delayOut = null;
      bar.isShowTip = true;
    },
    hideBarTooltip(bar) {
      clearTimeout(bar.delayOut);
      bar.delayOut = setTimeout(function() {
        bar.isShowTip = false;
      }, 100);
    },
  }
};
</script>
 
<style lang="less" scoped>
.step {
  position: relative;
  display: flex;
  margin: 20px 20px;
  width: 250px;
  font-size: 0;
  .left {
    flex-grow: 0;
    position: relative;
    display: inline-block;
    background: #fa3534;
    color: #fff;
    text-align: center;
    font-weight: bold;
    width: 70%;
    font-size: 12px;
    line-height: 20px;
    height: 20px;
    min-width: 30px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  // 百分百的时候不显示该伪类
  .tringle::after {
    content: " ";
    position: absolute;
    top: 0;
    right: -8px;
    border-width: 20px 8px;
    border-style: solid;
    border-color: #fa3534 transparent transparent transparent;
    z-index: 10;
  }
 
  .right {
    flex-grow: 1;
    position: relative;
    display: inline-block;
    /* width:30%; */
    background: #5677fc;
    color: #333;
    font-weight: bold;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    height: 20px;
    text-align: center;
    min-width: 35px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
 
  .full-left{
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
 
  .full-right{
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
 
  .tip-arrow {
    position: absolute;
    left: 50%;
    top: -10px;
    display: inline-block;
    width: 7px;
    height: 7px;
    transform: rotateZ(45deg);
    -webkit-transform: rotateZ(45deg);
    background-color: #5677fc;
    z-index: 10;
  }
 
  .bar-tip-box {
    position: absolute;
    top: -5px;
    right: 50%;
    transform: translate(50%, -100%);
    text-align: left;
    padding: 5px 10px;
    width: max-content;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    border-radius: 3px;
    background-color: #5677fc;
    z-index: 10;
 
    p {
      margin: 0;
      padding-bottom: 5px;
    }
  }
}
</style>