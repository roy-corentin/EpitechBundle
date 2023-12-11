<template>
  <tfoot v-if="workingTimes.length > 0">
    <tr class="font-semibold text-gray-900">
      <th scope="row" class="px-6 py-3 text-base">Total</th>
      <td class="px-6 py-3"></td>
      <td class="px-6 py-3 font-mono">
        {{
          formatDuration(
            workingTimes.reduce((sum, workingTime) => sum.add(workingTime.totalWork), dayjs.duration(0, 'millisecond'))
          )
        }}
      </td>
    </tr>
  </tfoot>
</template>

<script setup lang="ts">
import WorkingTime from '@/types/workingTime'
import { dayjs } from '../../dayjs'

interface WorkingTimesTableBodyProps {
  workingTimes: WorkingTime[]
}
const { workingTimes } = defineProps<WorkingTimesTableBodyProps>()

const formatDuration = (duration: plugin.Duration) => {
  const days = duration.days()
  const hours = duration.hours() + days * 24
  const minutes = duration.minutes()
  return `${hours}h:${minutes}m`
}
</script>
