<script setup lang="ts">
import { IconCirclePlus } from '@tabler/icons-vue'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()
const paramUserId = parseInt(route.params.userId as string)

const redirectCreate = () => {
  router.push(`/workingTime/${paramUserId}`)
}
</script>
<template>
  <button
    @click="redirectCreate"
    class="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded md:px-4 md:py-4"
  >
    <IconCirclePlus class="mr-2" />
    <p class="text-white font-bold pr-2">Create</p>
  </button>
</template>
