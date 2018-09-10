<template>
  <div class="vm-com-carousel">
    <div class="slide" ref="slide">
        <ul class="item" ref="item">
<!--
          <li><img src="../assets/img/1.jpg" @click="selectedItem()"/></li>
          <li><img src="../assets/img/2.jpg"/></li>
          <li><img src="../assets/img/3.jpg"/></li>
          <li><img src="../assets/img/4.jpg"/></li>
          <li><img src="../assets/img/5.jpg"/></li>
          <li><img src="../assets/img/4.jpg"/></li>
          <li><img src="../assets/img/3.jpg"/></li>
          <li><img src="../assets/img/2.jpg"/></li>
          <li><img src="../assets/img/5.jpg"/></li>
          <li><img src="../assets/img/logo.png"/></li>
          <li><img src="../assets/img/logo.png"/></li>
          <li><img src="../assets/img/logo.png"/></li>
-->

          <li v-for="item in this.items">
            <img v-bind:src="item.src"/>
          </li>
        </ul>
    </div>

    <div class="page">
        <span key="prev"
              class="preview"
              @click="prev">
          <slot name="prev">
              上一页
          </slot>
        </span>

      <span key="next"
            class="next"
            @click="next">
          <slot name="next">
              下一页
          </slot>
        </span>
    </div>
  </div>
</template>

<script>
  import { _debounce,_startMove } from "../util/public";
  export default {
    name: 'vm-com-carousel',
    mounted() {
      let marginSpace = 10;
      let showNum = 4;
      let aUiItem = this.$refs.item;
      let aLiSmall = aUiItem.getElementsByTagName("li");
      let oSlide = this.$refs.slide;
      this.moveWidth = showNum * aLiSmall[0].offsetWidth + (showNum)*marginSpace;
      this.totalPage = aLiSmall.length / showNum;
      oSlide.style.width = this.moveWidth + 'px';
      aUiItem.style.width = aLiSmall.length * aLiSmall[0].offsetWidth + (aLiSmall.length)*marginSpace + 'px';

    //  alert(this.items.length);
    },
    props: {
      items:{
        type:Array,
        default: []
      }
    },
    data() {
      return {
        moveWidth:0,
        curPage:1,
        totalPage:1
      }
    },
    methods: {
      prev:_debounce(function () {
        if (this.curPage <= 1){
          return;
        }
        _startMove(this.$refs.item, 'left', -(this.curPage-2)*this.moveWidth);
        this.curPage--;
      },300),

      next:_debounce(function () {
        if (this.curPage >= this.totalPage){
          return;
        }

        _startMove(this.$refs.item, 'left', -this.moveWidth*this.curPage);
        this.curPage++;
      },300),

      // 点击图片
      selectedItem() {
        this.$emit('selectedItem', null)
      }
    }
  };
</script>

<style scoped lang="less">
  .vm-com-carousel{
    .slide{
      width: 720px;
      height: 94px;
      position: relative;
      //top: 7px;
      margin: auto;
      //left: 10px;
      overflow: hidden; /**为了实现无缝滚动*/
      ul{
        height: 94px;
        position: absolute;
        top: 0;
        left: 0;
        li{
          width: 120px;
          height: 94px;
          float: left;
          margin-right: 10px;
          background: url(../assets/img/logo.png) no-repeat center center;
          cursor: pointer;
          display: inline;
          img {
            width: 120px;
            height: 94px;
          }
        }
      }
    }

    .page{
      position: relative;
    }
    .preview{
      position: absolute;
      font-size: 16px;
      color: #409eff;
      cursor: pointer;
      left: 0;
    }
    .next {
      position: absolute;
      font-size: 16px;
      color: #409eff;
      cursor: pointer;
      right: 0;
    }
  }
</style>
