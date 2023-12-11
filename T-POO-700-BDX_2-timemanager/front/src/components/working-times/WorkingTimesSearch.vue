<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()

const startDate = ref(route.query.startDate)
const endDate = ref(route.query.endDate)

watch(startDate, () => {
  router.push({ path: route.fullPath, query: { startDate: startDate.value, endDate: endDate.value } })
})
watch(endDate, () => {
  router.push({ path: route.fullPath, query: { startDate: startDate.value, endDate: endDate.value } })
})
</script>
<template>
  <div class="flex flex-row">
    <div class="w-1/3 mr-[20%] md:w-auto md:mr-16">
      <label for="start-date" class="text-sm">Start Date</label>
      <input
        type="date"
        id="start-date"
        v-model="startDate"
        class="w-full block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div class="w-1/3 md:w-auto">
      <label for="end-date" class="text-sm">End Date</label>
      <input
        type="date"
        id="end-date"
        v-model="endDate"
        class="w-full block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>
</template>
