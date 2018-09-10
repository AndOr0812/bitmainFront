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
    <VmChartBarLine title="Line Chart" :xAxisData="dataBar1.xAxisData" :series="dataBar1.series">
    </VmChartBarLine>
    <vm-com-carousel @selectedItem="selectedItem"></vm-com-carousel>
  </div>
</template>
<script>
  import VmComCarousel from '../components/vm-com-carousel';
  import VmChartBarLine from '../components/vm-chart-bar-line';
  import {cityGuess} from '../service/getData';
  export default {
    mounted(){
      /**
      cityGuess().then(res => {
        alert(res);
      })*/
    },
    components:{
      VmComCarousel,
      VmChartBarLine
    },
    methods:{
      selectedItem(item, index){
        alert(`点击了第${index}张图片`)
      }
    },
    data:function () {
      return {
        dataBar1: {
          xAxisData: ['比特币', '以太币', '莱特币', '星云币', 'EOS', '人民币'],
          series: [
            {
              name: '销量',
              type: 'bar',
              data: [50, 200, 360, 100, 100, 200]
            }
          ]
        }
      }
    }
  }
</script>
