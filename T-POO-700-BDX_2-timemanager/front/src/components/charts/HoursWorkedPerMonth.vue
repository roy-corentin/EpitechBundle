<script setup lang="ts">
import { ref } from 'vue'
import { Line } from 'vue-chartjs'
import { getWorkHoursAmount } from '@/helpers/workingTimes'
import WorkingTime from '@/types/workingTime'

interface TotalHoursWorkedPerMonth {
  workingTimes: WorkingTime[]
}

const { workingTimes } = defineProps<TotalHoursWorkedPerMonth>()

const monthsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Fonction pour calculer le total d'heures de travail par mois
const totalHoursPerMonth: number[] = Array(12).fill(0)

workingTimes.forEach((time) => {
  const start = new Date(time.start)
  const end = new Date(time.end)
  const hoursWorked = getWorkHoursAmount(start, end)

  const startMonthIndex = start.getMonth()
  const endMonthIndex = end.getMonth()

  if (startMonthIndex === endMonthIndex) {
    totalHoursPerMonth[startMonthIndex] += hoursWorked
  } else {
    totalHoursPerMonth[startMonthIndex] +=
      hoursWorked *
      ((new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate() - start.getDate() + 1) /
        new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate())
    totalHoursPerMonth[endMonthIndex] +=
      hoursWorked * (end.getDate() / new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate())
    for (let i = startMonthIndex + 1; i < endMonthIndex; i++) {
      totalHoursPerMonth[i] += hoursWorked
    }
  }
})

// Définir les données du graphique
const chartData = ref({
  name: 'Total working hours per month',
  components: { Line },
  labels: monthsLabels,
  datasets: [
    {
      label: 'Total Hours Worked ',
      backgroundColor: 'rgba(255, 99, 41, 1)',
      borderColor: 'rgba(255, 99, 41, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(255, 99, 71, 1)',
      pointBorderColor: 'rgba(255, 99, 71, 1)',
      pointBorderWidth: 2,
      pointRadius: 5,

      data: totalHoursPerMonth
    }
  ]
})

// Déclarations des options de graphique
const lineChartOptions = ref({
  responsive: true,
  aspectRatio: 2,
  maintainAspectRatio: true,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(75, 192, 192, 1)'
      },
      ticks: {
        color: 'rgba(0, 0, 0, 0.7)'
      }
    },
    x: {
      grid: {
        color: 'rgba(75, 192, 192, 1)'
      },
      ticks: {
        color: 'rgba(0, 0, 0, 0.7)'
      }
    }
  }
})
</script>

<template>
  <div class="w-full flex flex-col items-center gap-2 mt-16 md:w-4/6">
    <p class="text-2xl font-bold">Total hours worked per month</p>
    <Line :data="chartData" :options="lineChartOptions" />
  </div>
</template>
