<script setup lang="ts">
import WorkingTime from '@/types/workingTime'
import useWorkingTime from '@/stores/workingTime'
import router from '@/router'
import useMyself from '@/stores/myself'

interface WorkingTimesTableBodyProps {
  workingTimes: WorkingTime[]
  userId: number
}
const myselfStore = useMyself()
const { userId } = defineProps<WorkingTimesTableBodyProps>()
const { setWorkingTime } = useWorkingTime()

const redirectEdit = (workingTime: WorkingTime) => {
  setWorkingTime(workingTime)
  router.push(`/workingTime/${userId}/${workingTime.id}`)
}
</script>

<template>
  <tbody v-if="workingTimes.length > 0">
    <tr
      v-for="workingTime in workingTimes"
      :key="workingTime.id"
      class="bg-gray-50 even:bg-white border-b hover:bg-gray-100 border-gray-200"
    >
      <td class="px-2 py-2 md:py-4 md:px-6">{{ workingTime.startDisplay }}</td>
      <td class="px-2 py-2 md:py-4 md:px-6">{{ workingTime.endDisplay }}</td>
      <td class="px-6 py-2 md:py-4 md:px-6 font-mono">{{ workingTime.totalWorkDisplay }}</td>
      <td
        v-if="userId === myselfStore.getMyself().id || myselfStore.getMyself().role === 'administrator'"
        class="px-6 py-2 md:py-4 md:px-6"
      >
        <button @click="() => redirectEdit(workingTime)" class="font-medium text-blue-600 hover:underline">
          Inspect
        </button>
      </td>
    </tr>
  </tbody>
</template>
