import WorkingTime, { ApiWorkingTime } from '../types/workingTime'
import { dayjs } from '../dayjs'

export function getLocalDateTime(date: Date): Date {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}

function parseApiWorkingTime(apiWorkingTime: ApiWorkingTime): WorkingTime {
  const startDate = dayjs.utc(apiWorkingTime.start)
  const endDate = dayjs.utc(apiWorkingTime.end)
  const diff = dayjs.duration(endDate.diff(startDate))
  return {
    id: apiWorkingTime.id,
    start: apiWorkingTime.start,
    end: apiWorkingTime.end,
    startDisplay: startDate.format('YYYY-MM-DD HH:mm'),
    endDisplay: endDate.format('YYYY-MM-DD HH:mm'),
    startDate: new Date(apiWorkingTime.start),
    endDate: new Date(apiWorkingTime.end),
    totalWork: diff,
    totalWorkDisplay: diff.format('HH:mm')
  }
}

export default parseApiWorkingTime
