import Clock, { ClockApi } from '@/types/clock'

function parseApiClock(apiClock: ClockApi): Clock {
  return {
    id: apiClock.id,
    status: apiClock.status,
    started: new Date(apiClock.time)
  }
}

export default parseApiClock
