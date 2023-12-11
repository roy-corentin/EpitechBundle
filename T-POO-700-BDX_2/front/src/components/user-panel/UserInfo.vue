<script setup lang="ts">
import User from '@/types/user'
import UpdateUserButton from './UpdateUserButton.vue'
import DisconnectButton from './DisconnectButton.vue';

// Props
interface UserInfoProps {
  user: User
}
defineProps<UserInfoProps>()
</script>

<template>
  <div class="flex flex-col items-start mb-[0.5rem]">
    <h3 class="text-3xl font-extrabold text-white">{{ user.username }}</h3>
    <p class="text-lg font-semibold text-white">{{ user.email }}</p>
  </div>
  <div class="flex flex-row flex-nowrap">
    <DisconnectButton class="mr-2" />
    <UpdateUserButton :current-user="user" title="Update account" class="update-btn" />
  </div>
</template>

<style>
.update-btn {
  background-color: #f1f5f9;
  color: #334155;
}
.update-btn:hover {
  background-color: #cbd5e1;
}
</style>
