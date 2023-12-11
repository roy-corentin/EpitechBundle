import { Duration } from 'dayjs/plugin/duration'

export type ApiWorkingTime = {
  id: number
  start: string
  end: string
}

type WorkingTime = {
  id: number
  start: string
  end: string
  startDisplay: string
  endDisplay: string
  startDate: Date
  endDate: Date
  totalWork: Duration
  totalWorkDisplay: string
}

export default WorkingTime
