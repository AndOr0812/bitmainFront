<template>
  <div class="vm-chart-bar">
    <div class="panel-body" :id="this.id" :style="{ height: height + 'px', width: width + 'px'}">
    </div>
  </div>
</template>
<script>
  import chartTheme from '@/theme/chartTheme.js'
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts')
  // 引入柱状图
  require('echarts/lib/chart/bar')
  require('echarts/lib/chart/line')
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require('echarts/lib/component/legend')

  export default {
    name: 'VmChartBarLine',
    props: {
      // 图表区域高度
      title: {
        type: String,
        default: '柱形图'
      },
      height: {
        type: Number,
        default: 400
      },
      width:{
        type:Number,
        default:400
      },
      // 图表形状颜色, ecahrt依次选择颜色渲染
      color: {
        type: Array,
        default: function () {
          return chartTheme.color
        }
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: '#fff'
      },
      // 横坐标数据
      xAxisData: {
        type: Array,
        required: true,
        default: function () {
          return ['比特币', '以太币', '莱特币', '星云币', 'EOS', '人民币']
        }
      },
      // 纵坐标数据
      series: {
        type: Array,
        required: true,
        default: function () {
          return [{
            name: '百分比',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        }
      }
    },
    data: function () {
      return {
        // 刻度颜色
        axisColor: {
          type: String,
          default: '#797979'
        },
        // 分割线颜色
        splitLineColor: {
          type: String,
          default: '#dcdcdc'
        },
        chart: null
      }
    },
    computed: {
      // 生成一个随机id, 实现图表组件的复用
      id: function () {
        return parseInt(Math.random() * 1000000)
      },
      legendData: function () {
        let legendData = []
        this.series.forEach(function (elem) {
          legendData.push(elem.name)
        })
        return legendData
      }
    },
    methods: {
      renderChart: function () {
        if (this.chart) {
          this.chart.dispose()
        }
        // 初始化echart
        this.chart = echarts.init(document.getElementById(this.id))
        // 自定义eChart样式 官方配置指南(http://echarts.baidu.com/option.html#yAxis.splitLine.lineStyle.color)
        this.chart.setOption({
          title: {
            x: 'center',
           // text: 'Age',
           // subtext: 'Rainbow bar for Age',
            link: 'http://echarts.baidu.com/doc/example.html'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}:\n{c}%'
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          // 柱形图默认参数
          bar: {
            barMinHeight: 0,            // 最小高度改为0
            // barWidth: null,        // 默认自适应
            //barGap: '90%',           // 柱间距离，默认为柱形宽度的30%，可设固定值
            //barCategoryGap: '50%',   // 类目间柱形距离，默认为类目间距的20%，可设固定值
          },
            dataRange:{
            x: 'center',                   // 水平安放位置，默认为全图左对齐，可选为：
            itemGap: 10,               // 各个item之间的间隔，单位px，默认为10，
          },
          calculable: true,
          grid: {
            borderWidth: 0,
            y: 80,
            y2: 60,
            width:"430"
          },
          xAxis: [
            {
              type: 'category',
             // show: false,
              data: ['比特币', '以太币', '莱特币', '星云币', 'EOS', '人民币'],
              splitLine:{
                //show:false
              },
              axisTick: {//决定是否显示坐标刻度
                //alignWithLabel: true,
                show:false
              },
            },

          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                show: false,
                interval: 'auto',
                formatter: '{value} %'
              },
              show: false
            }
          ],
          series: [
            {
              name: 'Age',
              type: 'bar',
              barWidth : 30,
              //barCategoryGap:'5%',
              //barGap:'10%',
              //center: ['55%', '60%'],
              itemStyle: {
                normal: {
                  color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                      '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                      '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                      '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                    ];
                    return colorList[params.dataIndex]
                  },
                  label: {
                    show: true,
                    position: 'top',
                    formatter: '{b}\n{c}%'
                  }
                }
              },
              data: [12,21,10,4,12,5],
              markPoint: {
                tooltip: {
                  trigger: 'item',
                  backgroundColor: 'rgba(0,0,0,0)',
                  formatter: function(params){
                    return '<img src="'
                      + params.data.symbol.replace('image://', '')
                      + '"/>';
                  }
                },
                data: [
                  {xAxis:0, y: 350, name:'4-14', symbolSize:20, symbol: 'image://../asset/ico/折线图.png'},
                  {xAxis:1, y: 350, name:'15-24', symbolSize:20, symbol: 'image://../asset/ico/柱状图.png'},
                  {xAxis:2, y: 350, name:'25-34', symbolSize:20, symbol: 'image://../asset/ico/散点图.png'},
                  {xAxis:3, y: 350, name:'35-44', symbolSize:20, symbol: 'image://../asset/ico/K线图.png'},
                  {xAxis:4, y: 350, name:'45-54', symbolSize:20, symbol: 'image://../asset/ico/饼状图.png'},
                  {xAxis:5, y: 350, name:'55-64', symbolSize:20, symbol: 'image://../asset/ico/雷达图.png'},
                  //{xAxis:6, y: 350, name:'65以上', symbolSize:20, symbol: 'image://../asset/ico/和弦图.png'},
                  //{xAxis:7, y: 350, name:'Force', symbolSize:20, symbol: 'image://../asset/ico/力导向图.png'},
                  //{xAxis:8, y: 350, name:'Map', symbolSize:20, symbol: 'image://../asset/ico/地图.png'},
                  //{xAxis:9, y: 350, name:'Gauge', symbolSize:20, symbol: 'image://../asset/ico/仪表盘.png'},
                  //{xAxis:10, y: 350, name:'Funnel', symbolSize:20, symbol: 'image://../asset/ico/漏斗图.png'},
                ]
              }
            }
          ]
        })
      }
    },
    watch: {
      xAxisData: function () {
        this.renderChart()
      },
      series: function () {
        this.renderChart()
      }
    },
    mounted: function () {
      this.renderChart()
    }
  }
</script>
<style scoped lang="less">
  .vm-chart-bar{
    .panel-body{
      margin: auto;
    }
  }

</style>
