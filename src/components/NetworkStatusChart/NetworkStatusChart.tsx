// NetworkStatusChart.tsx
import React, { useState, useEffect, useRef } from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import { useFrame } from '@react-three/fiber'

interface INetworkData {
  time: string // 时间戳
  status: number // 网络状态指标，例如信号强度或延迟
}

interface INetworkStatusChartProps {
  initialData: INetworkData[] // 初始网络状态数据
}

const NetworkStatusChart: React.FC<INetworkStatusChartProps> = ({
  initialData
}) => {
  const chartRef = useRef(null)
  const [option, setOption] = useState<any>({})

  useEffect(() => {
    const timer = setInterval(() => {
      // 模拟数据更新
      initialData.push({
        time: new Date().toLocaleString(),
        status: Math.random() * 2 + 50
      })
      console.log(navigator.connection)
      updateChartData(initialData)
    }, 1000) // 每秒更新一次数据

    return () => clearInterval(timer) // 清理定时器
  }, [])
  function FPSCounter() {
    const [lastCallTime, setLastCallTime] = useState(Date.now())
    const [frames, setFrames] = useState(0)

    useFrame(() => {
      const now = Date.now()
      const deltaTime = (now - lastCallTime) / 1000 // 秒数
      setLastCallTime(now)

      // 每秒更新一次帧率
      if (deltaTime >= 1) {
        console.log(`FPS: ${frames.toFixed(1)}`)
        setFrames(0)
        setLastCallTime(now)
      } else {
        setFrames(frames + 1)
      }
    })

    return null
  }

  // const getNetworkStatus = () => {
  //   const connection = navigator.connection
  //   if (connection) {
  //     return connection.effectiveType || 'unknown'
  //   } else {
  //     console.warn('Network information is not available')
  //     return 'unknown'
  //   }
  // }
  const updateChartData = (data: INetworkData[]) => {
    if (chartRef.current && chartRef.current.getEchartsInstance()) {
      const echartInstance = chartRef.current.getEchartsInstance()
      const xAxisData = data.map((item) => item.time)
      const yAxisData = data.map((item) => item.status)

      const newOption = {
        color: ['#1e90ff'], // 自定义线条颜色
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            return `${params[0].name}<br/>网络状态: ${params[0].value}`
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, // 让折线紧贴X轴
          data: xAxisData,
          axisLabel: {
            rotate: 45, // X轴标签旋转45度，防止重叠
            color: '#666'
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed' // Y轴网格线为虚线
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        series: [
          {
            data: yAxisData,
            type: 'line',
            smooth: true, // 折线平滑
            showSymbol: false, // 不显示每个点的符号
            lineStyle: {
              width: 2 // 线条宽度
            },
            areaStyle: {
              opacity: 0.3, // 区域填充透明度
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 1, color: '#1e90ff' }
              ])
            }
          }
        ],
        legend: {
          show: false
        }
      }

      echartInstance.setOption(newOption)
      echartInstance.resize() // 确保图表自动适应容器大小
    }
  }

  useEffect(() => {
    const initialOption = {
      // ... 之前的初始配置
      // 由于我们已经在updateChartData中设置了大部分样式，这里可以简略或者移除重复部分
    }
    setOption(initialOption)
  }, [initialData])

  return (
    <ReactECharts
      ref={chartRef}
      option={option}
      notMerge={true}
      style={{ height: '400px', width: '100%', margin: '0 auto' }} // 增加宽度并居中
    />
  )
}

export default NetworkStatusChart
