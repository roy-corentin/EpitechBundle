<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import { ref } from 'vue'
import WorkingTime from '@/types/workingTime'

// Props
interface MeanWorkingHoursPerDayProps {
  workingTimes: WorkingTime[]
}
const { workingTimes } = defineProps<MeanWorkingHoursPerDayProps>()

// Prepare data
const dayWorkingHours: number[][] = []
const nightWorkingHours: number[][] = []

workingTimes.forEach((workingTime) => {
  workingTime.startDate.setHours(workingTime.startDate.getHours() - 1)
  workingTime.endDate.setHours(workingTime.endDate.getHours() - 1)

  const workingDayHours: number[] = []
  const workingNightHours: number[] = []

  if (workingTime.startDate.getHours() > 6 && workingTime.startDate.getHours() < 19) {
    workingDayHours.push(workingTime.startDate.getHours())
    if (workingTime.endDate.getHours() > 6 && workingTime.endDate.getHours() < 19)
      workingDayHours.push(workingTime.endDate.getHours())
    else {
      workingDayHours.push(19)
      workingNightHours.push(19)
      workingNightHours.push(workingTime.endDate.getHours() === 0 ? 24 : workingTime.endDate.getHours())
    }
  } else {
    workingNightHours.push(workingTime.startDate.getHours() === 0 ? 24 : workingTime.startDate.getHours())
    if (workingTime.endDate.getHours() > 6 && workingTime.endDate.getHours() < 19) {
      workingNightHours.push(6)
      workingDayHours.push(6)
      workingDayHours.push(workingTime.endDate.getHours())
    } else workingNightHours.push(workingTime.endDate.getHours() === 0 ? 24 : workingTime.endDate.getHours())
  }

  if (workingDayHours.length > 0) dayWorkingHours.push(workingDayHours)
  if (workingNightHours.length > 0) nightWorkingHours.push(workingNightHours)
})

let totalDayHours = 0
let totalNightHours = 0

dayWorkingHours.forEach((workingHours) => {
  totalDayHours += workingHours[1] - workingHours[0]
})
nightWorkingHours.forEach((workingHours) => {
  totalNightHours += workingHours[1] - workingHours[0]
})

const totalHoursWorked = totalDayHours + totalNightHours
const dayHoursPercentage = (100 * totalDayHours) / totalHoursWorked
const nightHoursPercentage = (100 * totalNightHours) / totalHoursWorked

const chartData = ref({
  name: 'Night hours',
  components: { Pie },
  labels: ['Day hours', 'Night hours'],
  datasets: [
    {
      backgroundColor: ['#fde047', '#6b21a8'],
      borderColor: ['#fde047', '#6b21a8'],
      borderWidth: 2,
      data: [dayHoursPercentage, nightHoursPercentage]
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  aspectRatio: 2,
  maintainAspectRatio: true
})
</script>

<template>
  <div class="w-full flex flex-col items-center gap-2 mt-16 mb-16 md:w-3/5">
    <h3 class="text-2xl font-bold">Night hours</h3>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>
