<script setup lang="ts">
import User from '@/types/user'
import UpdateUserButton from './UpdateUserButton.vue'

// Props
interface UpdateUserProps {
  currentUser: User | null
}
defineProps<UpdateUserProps>()
</script>

<template>
  <UpdateUserButton v-if="currentUser" :current-user="currentUser" />
  <button v-else class="p-[0.75rem] px-[1.2rem] bg-gray-500 text-slate-50 font-bold rounded-lg" disabled>Update</button>
</template>
