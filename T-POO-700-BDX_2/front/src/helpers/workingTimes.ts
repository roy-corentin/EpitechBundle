import WorkingTime from '@/types/workingTime'

export function getHoursFromDate(date: Date): number {
  let minutesAsHours = date.getMinutes()
  if (minutesAsHours > 0) minutesAsHours = minutesAsHours / 60
  return date.getHours() - 1 + minutesAsHours
}

export function getWorkHoursAmount(start: Date, end: Date): number {
  return Math.abs(end.getTime() - start.getTime()) / 3600000
}

export function computeMean(numbers: number[]): number {
  let total = 0
  numbers.forEach((number) => (total += number))
  return total === 0 ? total : total / numbers.length
}

export function daysInMonth(year: number, month: number): number {
  return 31 - (month - 1 ? month % 7 & 1 : year & (year % 25 ? 3 : 15) ? 3 : 2)
}

export function maxWorkingTimesPerDay(workingTimes: WorkingTime[]): number {
  const counters: number[] = []
  for (let i = 1; i < 32; i++) counters.push(0)
  workingTimes.forEach((workingTime) => (counters[workingTime.startDate.getDate() - 1] += 1))

  let maxDay = 1
  for (let i = 0; i < 31; i++) {
    if (counters[i] > maxDay) maxDay = counters[i]
  }
  return maxDay
}

export function daysBetween(startDate: Date, endDate: Date): number {
  // The number of milliseconds in all UTC days (no DST)
  const oneDay = 1000 * 60 * 60 * 24

  // A day in UTC always lasts 24 hours (unlike in other time formats)
  const start = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
  const end = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())

  // so it's safe to divide by 24 hours
  return (start - end) / oneDay
}

export function monthsBetween(start: Date, end: Date): number {
  let months = (end.getFullYear() - start.getFullYear()) * 12
  months -= start.getMonth()
  months += end.getMonth()
  return months <= 0 ? 0 : months
}
