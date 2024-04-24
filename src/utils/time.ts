import moment from 'moment'

// 全部处理为 YYYY-MM-DD HH:mm:ss
export const formatTime = (time: any): string =>
  moment(time).format('YYYY-MM-DD HH:mm')

interface TimePeriod {
  startTime: string
  endTime: string
}

// 获取接下来 n小时的时间段
export const goByHours = (n: number): TimePeriod => {
  const currentTime = moment()
  const start = currentTime.clone()
  const end = start.clone().add(n, 'hours')

  return {
    startTime: formatTime(start),
    endTime: formatTime(end)
  }
}
