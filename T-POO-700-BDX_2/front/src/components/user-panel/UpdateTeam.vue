<script setup lang="ts">
import Team from '@/types/team'
import UpdateTeamButton from './UpdateTeamButton.vue';

// Props
interface UpdateTeamProps {
  currentTeam: Team | null
  setNewTeam: (newTeam: Team | null) => void
}
defineProps<UpdateTeamProps>()
</script>

<template>
  <UpdateTeamButton v-if="currentTeam" :current-team="currentTeam" :set-new-team="setNewTeam" />
  <button v-else class="p-[0.75rem] px-[1.2rem] bg-gray-500 text-slate-50 font-bold rounded-lg" disabled>Update</button>
</template>
