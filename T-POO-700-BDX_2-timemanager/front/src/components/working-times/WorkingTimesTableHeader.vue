<script setup lang="ts">
import useMyself from '@/stores/myself';

// Props
interface WorkingTimesTableHeaderProps {
  userId: number
}
defineProps<WorkingTimesTableHeaderProps>()

const myselfStore = useMyself()
</script>

<template>
  <thead class="text-xs text-gray-700 uppercase bg-gray-200">
    <tr>
      <th scope="col" class="px-6 py-3">Start</th>
      <th scope="col" class="px-6 py-3">End</th>
      <th scope="col" class="px-6 py-3">Total Work</th>
      <th v-if="userId === myselfStore.getMyself().id || myselfStore.getMyself().role === 'administrator'" scope="col" class="px-6 py-3">Action</th>
    </tr>
  </thead>
</template>
