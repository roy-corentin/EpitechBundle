<script setup lang="ts">
import useApi from '@/composables/api'
import useMyself from '@/stores/myself'
import Team from '@/types/team'
import { Ref, ref, watch } from 'vue'

type TeamOption = {
  label: string
  key: number
}

// Props
interface TeamSelectorProps {
  input: Team | null
  newTeam?: Team | null
}
const props = defineProps<TeamSelectorProps>()

// Emits
interface TeamSelectorEmits {
  (e: 'update:input', input: Team | null): void
}
const emit = defineEmits<TeamSelectorEmits>()

const myselfStore = useMyself()
const { fetchTeams } = useApi()
const loading = ref(true)

// Options
const teams: Ref<Team[]> = ref([])
const options: Ref<TeamOption[]> = ref([])
const selected: Ref<TeamOption | null> = ref(null)
const doFetchTeams = () => {
  const myself = myselfStore.getMyself()
  fetchTeams()
    .then((fetchedTeams) => {
      teams.value = fetchedTeams
      if (myself.role === 'manager') teams.value = teams.value.filter((team) => team.manager.id === myself.id)
      options.value = teams.value.map((team) => {
        return {
          label: `${team.name}` + (myself.role === 'administrator' ? `(${team.manager.username})` : ''),
          key: team.id
        }
      })
    })
    .finally(() => (loading.value = false))
}

watch(selected, () => emit('update:input', teams.value.find((team) => team.id === selected.value?.key) || null))

watch(
  () => props.newTeam,
  (newTeam, _) => {
    if (newTeam === null) {
      selected.value = null
      doFetchTeams()
    } else if (newTeam !== undefined) {
      const myself = myselfStore.getMyself()
      selected.value = {
        key: newTeam.id,
        label: `${newTeam.name}` + (myself.role === 'administrator' ? `(${newTeam.manager.username})` : '')
      }
    }
  }
)
</script>

<template>
  <label class="text-white text-lg">Select team</label>
  <v-select
    key="key"
    :options="options"
    v-model="selected"
    :loading="loading"
    @search:focus="() => doFetchTeams()"
  ></v-select>
</template>
