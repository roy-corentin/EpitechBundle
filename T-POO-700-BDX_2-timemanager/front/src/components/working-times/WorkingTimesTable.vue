<script setup lang="ts">
import WorkingTime from '@/types/workingTime'
import WorkingTimesTableHeader from './WorkingTimesTableHeader.vue'
import WorkingTimesTableBody from './WorkingTimesTableBody.vue'
import WorkingTimesTableFoot from './WorkingTimesTableFoot.vue'

interface WorkingTimesTableBodyProps {
  workingTimes: WorkingTime[]
  userId: number
}
defineProps<WorkingTimesTableBodyProps>()
</script>

<template>
  <div class="w-flex flex-col items-center justify-center">
    <table class="w-full text-xs md:text-base text-left text-gray-500">
      <WorkingTimesTableHeader :user-id="userId" />
      <WorkingTimesTableBody :working-times="workingTimes" :user-id="userId" />
      <WorkingTimesTableFoot :working-times="workingTimes" />
    </table>
    <div v-if="workingTimes.length === 0" class="h-1/2 bg-gray-50 border-b border-gray-200">Empty</div>
  </div>
</template>
