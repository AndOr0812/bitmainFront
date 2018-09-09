<template>
  <div>
    <h1>我的主页</h1>
    <!--
    <VaCarousel total="4"
                :interval=1000
                :autoplay="false"
                :roll-num="4"
                prevText="上一张"
                nextText="下一张"
                arrow="always"
                @selectedItem="selectedItem"></VaCarousel>
                -->
    <vm-com-carousel @selectedItem="selectedItem"></vm-com-carousel>
  </div>
</template>
<script>
  //import VaCarousel from '../components/vm-image-carousel'
  import VmComCarousel from '../components/vm-com-carousel'
  export default {
    components:{
    //  VaCarousel
      VmComCarousel
    },
    methods:{
      selectedItem(item, index){
        alert(`点击了第${index}张图片`)
      }
    }
  }
</script>
