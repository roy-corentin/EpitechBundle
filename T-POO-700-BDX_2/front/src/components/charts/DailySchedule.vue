<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { ref } from 'vue'
import WorkingTime from '@/types/workingTime'
import {
  daysBetween,
  daysInMonth,
  getHoursFromDate,
  maxWorkingTimesPerDay,
  monthsBetween
} from '@/helpers/workingTimes'

// Props
interface DailyScheduleProps {
  workingTimes: WorkingTime[]
  startDate?: Date
  endDate?: Date
}
const { workingTimes, startDate, endDate } = defineProps<DailyScheduleProps>()

// Process dates params
const now = new Date()
const oneDay = 1000 * 60 * 60 * 24
const end = ref(endDate ? endDate : new Date())
const start = ref(startDate ? startDate : new Date(end.value.getTime() - oneDay * 30))
const numberOfDays =
  startDate || endDate ? daysBetween(start.value, end.value) : daysInMonth(now.getFullYear(), now.getMonth())

// Prepare data
const sortedWorkingTimes = ref(workingTimes)
if (!startDate && !endDate)
  sortedWorkingTimes.value = sortedWorkingTimes.value.filter(
    (workingTime) =>
      workingTime.startDate.getFullYear() === now.getFullYear() && workingTime.startDate.getMonth() === now.getMonth()
  )
sortedWorkingTimes.value.sort(
  (workingTimes1, workingTimes2) => workingTimes1.startDate.getDate() - workingTimes2.startDate.getDate()
)

const labels: string[] = []
if (startDate || endDate) {
  for (let i = start.value.getDate(); i <= daysInMonth(start.value.getFullYear(), start.value.getMonth()); i++)
    labels.push(`${start.value.getFullYear()}/${start.value.getMonth() + 1}/${i}`)
  const monthsSeparating = monthsBetween(start.value, end.value)
  if (monthsSeparating > 1) {
    for (let i = 0; i <= monthsSeparating; i++) {
      const currentYear =
        monthsSeparating < 12 ? start.value.getFullYear() : start.value.getFullYear() + (monthsSeparating % 12)
      const currentMonth =
        start.value.getMonth() + i < 12 ? start.value.getMonth() + i : currentYear - start.value.getFullYear() + i
      for (let i = 1; i <= daysInMonth(currentYear, currentMonth); i++)
        labels.push(`${currentYear}/${currentMonth + 1}/${i}`)
    }
  }
  for (let i = 1; i <= end.value.getDate(); i++)
    labels.push(`${end.value.getFullYear()}/${end.value.getMonth() + 1}/${i}`)
} else {
  for (let i = 1; i <= numberOfDays; i++) labels.push(`${now.getFullYear()}/${end.value.getMonth() + 1}/${i}`)
}

const getDataOfLayer = (layer: number): number[][] => {
  const data: number[][] = []
  for (const id of labels) {
    const dateWorkingTimes = sortedWorkingTimes.value.filter(
      (workingTime) =>
        workingTime.startDate.getFullYear() === parseInt(id.split('/')[0]) &&
        workingTime.startDate.getMonth() === parseInt(id.split('/')[1]) - 1 &&
        workingTime.startDate.getDate() === parseInt(id.split('/')[2])
    )
    if (layer < dateWorkingTimes.length)
      data.push([
        getHoursFromDate(dateWorkingTimes[layer].startDate),
        getHoursFromDate(dateWorkingTimes[layer].endDate)
      ])
    else data.push([0])
  }
  return data
}

const buildDatasets = () => {
  const datasets: {
    label: string
    backgroundColor: string
    borderColor: string
    borderWidth: number
    data: never[]
  }[] = []
  for (let i = 0; i < maxWorkingTimesPerDay(sortedWorkingTimes.value); i++) {
    datasets.push({
      label: 'Hours worked',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      data: getDataOfLayer(i) as never[]
    })
  }
  return datasets
}

const chartData = ref({
  name: 'BarChart',
  components: { Bar },
  labels,
  datasets: buildDatasets()
})

// Chart options
const barChartOptions = ref({
  responsive: true,
  aspectRatio: 2,
  maintainAspectRatio: true,
  plugins: {
      legend: {
         display: false
      }
   }
})
</script>

<template>
  <div class="w-full flex flex-col items-center gap-2 mt-8 md:w-4/6">
    <h3 class="text-xl md:text-2xl font-bold">Hours worked</h3>
    <Bar :data="chartData" :options="barChartOptions" />
  </div>
</template>
