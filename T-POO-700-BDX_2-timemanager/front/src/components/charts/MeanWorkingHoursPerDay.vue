<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { ref } from 'vue'
import WorkingTime from '@/types/workingTime'
import { computeMean, getWorkHoursAmount } from '@/helpers/workingTimes'

// Props
interface MeanWorkingHoursPerDayProps {
  workingTimes: WorkingTime[]
}
const { workingTimes } = defineProps<MeanWorkingHoursPerDayProps>()

const workingHoursPerDay: number[] = []
for (let i = 0; i < 5; i++)
  workingHoursPerDay.push(
    computeMean(
      workingTimes
        .filter((workingTime) => workingTime.startDate.getDay() === i + 1)
        .map((workingTime) => getWorkHoursAmount(workingTime.startDate, workingTime.endDate))
    )
  )

const chartData = ref({
  name: 'Average hours worked per day',
  components: { Bar },
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  datasets: [
    {
      label: 'Average worked hours',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
      data: workingHoursPerDay
    }
  ]
})

// Graphic options
const barChartOptions = ref({
  responsive: true,
  aspectRatio: 2,
  maintainAspectRatio: true
})
</script>

<template>
  <div class="w-full flex flex-col items-center gap-2 mt-16 md:w-4/6">
    <h3 class="text-xl font-bold">Average hours worked per day</h3>
    <Bar :data="chartData" :options="barChartOptions" />
  </div>
</template>
