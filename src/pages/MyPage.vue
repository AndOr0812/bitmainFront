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
    <vm-com-carousel @selectedItem="selectedItem" :items="iconItemLists"></vm-com-carousel>
    <div style="width: 502px; margin: auto">
      <vm-data-picker :picked="picked"></vm-data-picker>
    </div>
  </div>
</template>
<script>
  import VmComCarousel from '../components/vm-com-carousel';
  import VmChartBarLine from '../components/vm-chart-bar-line';
  import VmDataPicker from '../components/vm-date-picker'
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
      VmChartBarLine,
      VmDataPicker
    },
    methods:{
      selectedItem(item, index){
        alert(`点击了第${index}张图片`)
      },
      picked(year, month, date) {
        console.warn(`你选择了${year}年${month}月${date}日`)
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
        },
        iconItemLists:[
          {
            id: 1,
            src:
              '../assets/img/1.jpg'
          },
          {
            id: 2,
            src:
              '../assets/img/2.jpg'
          },
          {
            id: 3,
            src:
              '../assets/img/3.jpg'
          },
          {
            id: 4,
            src:
              '../assets/img/4.jpg'
          }
          ]
      }
    }
  }
</script>
