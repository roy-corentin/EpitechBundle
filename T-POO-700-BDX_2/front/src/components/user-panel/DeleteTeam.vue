<script setup lang="ts">
import ConfirmDeleteButton from '@/components/ui-kit/ConfirmDeleteButton.vue'
import useApi from '@/composables/api'
import Team from '@/types/team'
import { useToast } from 'vue-toastification'

// Props
interface DeleteTeamProps {
  currentTeam: Team | null
  setNewTeam: (newTeam: Team | null) => void
}
const props = defineProps<DeleteTeamProps>()

const { deleteTeam } = useApi()
const toast = useToast()

const doDeleteTeam = () => {
  deleteTeam((props.currentTeam as Team).id).then(() => {
    props.setNewTeam(null)
    toast.success(`Team ${(props.currentTeam as Team).name} deleted`)
  })
}
</script>

<template>
  <ConfirmDeleteButton
    v-if="currentTeam !== null"
    :title="`Are you sure you want to delete team ${currentTeam.name}?`"
    :delete-fnc="doDeleteTeam"
  />
  <button v-else class="p-[0.75rem] px-[1.2rem] bg-gray-500 text-slate-50 font-bold rounded-lg" disabled>Delete</button>
</template>
