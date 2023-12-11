<script setup lang="ts">
import useMyself from '@/stores/myself'
import { IconError404 } from '@tabler/icons-vue'
import { RouterLink } from 'vue-router'

const myselfStore = useMyself()
</script>

<template>
  <div
    class="w-[100vw] h-[100vh] absolute top-0 left-0 bg-white flex flex-col flex-nowrap justify-center items-center gap-10"
  >
    <h2 class="text-center text-4xl">Resource requested not found</h2>
    <IconError404 :size="150" color="#0f172a" />
    <RouterLink
      v-if="myselfStore.getMyself()"
      :to="`/clock/${myselfStore.getMyself().username}`"
      class="border-2 border-solid bg-white inline-block py-2 px-4 font-bold"
      >Home</RouterLink
    >
    <RouterLink v-else to="/signin" class="border-2 border-solid bg-white inline-block py-2 px-4 font-bold"
      >Sign in</RouterLink
    >
  </div>
</template>
