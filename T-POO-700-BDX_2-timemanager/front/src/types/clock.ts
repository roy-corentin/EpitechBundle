export type ClockApi = {
  id: number
  status: boolean
  time: string
}

type Clock = {
  id: number
  status: boolean
  started: Date
}

export default Clock
