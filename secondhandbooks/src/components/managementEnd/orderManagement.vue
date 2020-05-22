<template>
    <div class="order-management">
        <div class="title" id="order-management-title"><h4>订单管理</h4></div>
        <div class="echart-wrap">
            <div class="btns">
                <el-button type="primary" @click="years">按年统计</el-button>
                <el-button type="primary" @click="months">按月统计</el-button>
                <el-button type="primary" @click="days">按日统计</el-button>
                <el-button type="primary" @click="bar">柱状图</el-button>
                <el-button type="primary" @click="pie">饼状图</el-button>
                <el-button type="primary" @click="line">折线图</el-button>
            </div>
            <div class="echart" ref="echart"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {
            xAxisData: [],
            seriesData: [],
            legendData: [],
            seriesData2: [],
            type: 'line',
            title: '近七天统计图'
        }
    },
    methods: {
        // 日期计算
        getBeforeDate(n) {
            let d = new Date();
            d.setDate(d.getDate() - n);
            let year = d.getFullYear();
            let mon = d.getMonth() + 1;
            let day = d.getDate();
            let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
            return s;
        },
        years() {
            this.$store.dispatch('order/getOrderRecord', 'year').then(res => {
                let year = new Date().getFullYear()
                let years = []
                let datas = [0,0,0,0,0,0,0]
                for(let a = 6; a >= 0; a--) {
                    years.push(year-a+'')
                }
                res.forEach(e => {
                    if(years.indexOf(e._id) !== -1) {
                        datas[years.indexOf(e._id)] = e.number
                    }
                })
                this.xAxisData = years
                this.seriesData = datas
                this.legendData = years
                this.seriesData2 = [
                    {value: datas[0], name: years[0]},
                    {value: datas[1], name: years[1]},
                    {value: datas[2], name: years[2]},
                    {value: datas[3], name: years[3]},
                    {value: datas[4], name: years[4]},
                    {value: datas[5], name: years[5]},
                    {value: datas[6], name: years[6]}
                ]
                this.title = '近七年统计图'
                this._initChart(this.type)
            })
        },
        months() {
            this.$store.dispatch('order/getOrderRecord', 'month').then(res => {
                let month = new Date().getMonth() + 1
                let months = []
                let datas = []
                for(var a = month-1; a >= 0; a--) {
                    if(month-a < 10) {
                        months.push('0' + (month-a))
                    } else {
                        months.push(month-a + '')
                    }
                    datas.push(0)
                }
                res.forEach(e => {
                    if(months.indexOf(e._id) !== -1) {
                        datas[months.indexOf(e._id)] = e.number
                    }
                })
                this.xAxisData = months
                this.seriesData = datas
                this.legendData = months
                let seriesData2 = []
                for(let a = 0; a < months.length; a++) {
                    seriesData2.push({value: datas[a], name: months[a]})
                }
                this.seriesData2 = seriesData2
                this.title = '月份统计图'
                this._initChart(this.type)
            })
        },
        days() {
            this.$store.dispatch('order/getOrderRecord', 'day').then(res => {
                let days = []
                let datas = []
                for(let a = 6; a >= 0; a--) {
                    days.push(this.getBeforeDate(a))
                    datas.push(0)
                }
                res.forEach(e => {
                    if(days.indexOf(e._id) !== -1) {
                        datas[days.indexOf(e._id)] = e.number
                    }
                })
                this.xAxisData = days
                this.seriesData = datas
                this.legendData = days
                let seriesData2 = []
                for(let a = 0; a < days.length; a++) {
                    seriesData2.push({value: datas[a], name: days[a]})
                }
                this.seriesData2 = seriesData2
                this.title = '近七天统计图'
                this._initChart(this.type)
            })
        },
        bar() {
            this.type = 'bar'
            this._initChart(this.type)
        },
        pie() {
            this.type = 'pie'
            this._initChart(this.type)
        },
        line() {
            this.type = 'line'
            this._initChart(this.type)
        },
        _initChart(type) {
            // 基于准备好的dom，初始化echarts实例
            var initChart = echarts.init(this.$refs.echart);
            initChart.clear();
            // 绘制图表
            let options = {
                title: {
                    text: this.title,
                    padding: [32, 0]
                },
                tooltip: {
                    trigger: 'axis',
                }
            }
            if(type === 'bar') {
                options.tooltip.axisPointer = {type: 'shadow'}
                options.xAxis = {
                    type: 'category',
                    data: this.xAxisData
                }
                options.yAxis = {
                    type:'value'
                }
                options.series = [{
                    type: 'bar',
                    barGap: 0,
                    data: this.seriesData
                }]
            } else if(type === 'line') {
                options.xAxis = {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xAxisData
                }
                options.yAxis = {
                    type:'value'
                }
                options.series = [{
                    type: 'line',
                    data: this.seriesData
                }]
            } else if(type === 'pie') {
                options.tooltip.trigger = 'item'
                options.tooltip.formatter = '{a} <br/>{b}: {c} ({d}%)'
                options.legend = {
                    data: this.legendData
                }
                options.series = [{
                    name: '完成订单数量',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    data: this.seriesData2
                }] 
            }
            initChart.setOption(options);
        }
    },
    created() {
        this.years()
    }
}
</script>

<style lang="scss">
    .order-management{
        padding-top: 20px;
        .title{
            text-align: left;
            margin: 0 auto;
            width: 80vw;
            min-width: 1040px;
            background-color: #dad7d7;
            border: 1px solid #eee;
            padding: 10px 20px;
        }
        .echart-wrap{
            width: 70vw;
            min-width: 910px;
            margin: 0 auto;
            margin-top: 50px;
            height: 62vh;
            background-color: rgba(255,255,255,.3);
            box-shadow: 0px 0px 5px 10px rgba(141, 140, 140, 0.6);
            border-radius: 10px;
            padding: 10px 20px;
            position: relative;
            .btns{
                // margin-top: 10px;
            }
            .echart{
                // border: 1px solid black;
                width: 80%;
                height: 80%;
                margin: 20px auto 0;
            }
        }
    }
</style>