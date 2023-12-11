<script setup lang="ts">
import TMModal from '@/components/ui-kit/TMModal.vue'
import useApi from '@/composables/api'
import Team from '@/types/team'
import User from '@/types/user'
import { Ref, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import TMTextInput from '../ui-kit/TMTextInput.vue'
import ManagerSelector from './ManagerSelector.vue'
import MembersSelector from './MembersSelector.vue'
import { IconLoader3 } from '@tabler/icons-vue'
import { IconAlertTriangleFilled } from '@tabler/icons-vue'

// Props
interface UpdateTeamProps {
  currentTeam: Team
  setNewTeam: (newTeam: Team | null) => void
}
const props = defineProps<UpdateTeamProps>()
const currentTeam = ref(props.currentTeam)

const { updateTeam } = useApi()
const toast = useToast()
const modalVisible = ref(false)

// New user values
const updatedTeamName: Ref<string | null> = ref(currentTeam.value.name)
const updatedTeamManager: Ref<User | null> = ref(currentTeam.value.manager)
const updatedTeamMembers: Ref<User[]> = ref(currentTeam.value.members)

// Input errors management
const isNameValid = () => updatedTeamName.value !== null && updatedTeamName.value.trim().length > 0
const isManagerValid = () => updatedTeamManager.value !== null
const membersAreDifferent = () => {
  if (updatedTeamMembers.value.length !== currentTeam.value.members.length) return true
  for (const updatedMember of updatedTeamMembers.value) {
    if (currentTeam.value.members.find((currentMember) => currentMember.id === updatedMember.id) === null) return true
  }
  return false
}
const oneDifference = () =>
  updatedTeamName.value !== currentTeam.value.name ||
  updatedTeamManager.value !== currentTeam.value.manager ||
  membersAreDifferent()
const areInputsValid = () => isNameValid() && isManagerValid() && oneDifference()

const loading = ref(false)
const updateError = ref(false)

const getUsersToAdd = (): User[] => {
  const usersToAdd: User[] = []
  for (const member of updatedTeamMembers.value) {
    if (
      currentTeam.value.members.length === 0 ||
      currentTeam.value.members.find((currentMember) => currentMember.id === member.id) === undefined
    )
      usersToAdd.push(member)
  }
  return usersToAdd
}

const getUsersToRemove = (): User[] => {
  const usersToRemove: User[] = []
  for (const currentMember of currentTeam.value.members) {
    if (
      updatedTeamMembers.value.length === 0 ||
      updatedTeamMembers.value.find((member) => member.id === currentMember.id) === undefined
    )
      usersToRemove.push(currentMember)
  }
  return usersToRemove
}

const onConfirm = () => {
  const teamUpdates: {
    name?: string
    manager_id?: number
  } = {}
  if (currentTeam.value.name !== updatedTeamName.value) teamUpdates.name = updatedTeamName.value as string
  if (currentTeam.value.manager.id !== (updatedTeamManager.value as User).id)
    teamUpdates.manager_id = (updatedTeamManager.value as User).id

  loading.value = true
  updateTeam(currentTeam.value.id, teamUpdates, getUsersToAdd(), getUsersToRemove())
    .then((team) => {
      props.setNewTeam(team)
      currentTeam.value = team
      updatedTeamName.value = team.name
      updatedTeamManager.value = team.manager
      updatedTeamMembers.value = team.members
      toast.success(`Team ${team.name} updated`)
      modalVisible.value = false
    })
    .catch(() => (updateError.value = true))
    .finally(() => (loading.value = false))
}

watch(
  () => props.currentTeam,
  (newCurrentTeam, _) => {
    currentTeam.value = newCurrentTeam
    updatedTeamName.value = newCurrentTeam.name
    updatedTeamManager.value = newCurrentTeam.manager
    updatedTeamMembers.value = newCurrentTeam.members
  }
)
</script>

<template>
  <button
    v-bind="$attrs"
    class="p-[0.75rem] px-[1.2rem] bg-yellow-500 text-slate-50 font-bold rounded-lg hover:bg-yellow-600"
    @click="
      () => {
        updatedTeamName = currentTeam.name
        updatedTeamManager = currentTeam.manager
        updatedTeamMembers = currentTeam.members
        modalVisible = true
      }
    "
  >
    Update
  </button>
  <TMModal modal-id="updateTeamModal" v-model:visible="modalVisible">
    <form class="w-[80%] ml-[10%]" @submit.prevent.stop="onConfirm">
      <h2 class="text-center text-2xl md:text-4xl">Update {{ currentTeam.name }} team</h2>
      <div v-if="updateError" class="mb-4 flex flex-row items-center gap-2 text-yellow-600 self-center">
        <IconAlertTriangleFilled class="mb-1" />
        <p class="text-lg font-bold text-yellow-600">A team with this name already exists</p>
      </div>
      <div class="mt-2">
        <TMTextInput
          v-model:input="updatedTeamName"
          name="team-name-update-input"
          label="Name"
          placeholder="DevOps"
          :default-input="currentTeam.name"
          :error-fnc="isNameValid"
          @update:input="updateError = false"
        />
        <div class="mb-[1rem]">
          <ManagerSelector
            v-model:input="updatedTeamManager"
            :default-manager="currentTeam.manager"
            @update:input="updateError = false"
          />
        </div>
        <MembersSelector
          v-model:input="updatedTeamMembers"
          :current-manager="updatedTeamManager"
          :default-members="currentTeam.members"
          @update:input="updateError = false"
        />
      </div>
      <div class="flex flex-col md:flex-row flew-nowrap justify-center gap-4 md:gap-16 text-xl mt-4">
        <button
          type="submit"
          :disabled="!areInputsValid()"
          class="p-[1rem] px-[3rem] bg-yellow-500 text-slate-50 font-bold rounded-lg hover:bg-yellow-600 disabled:bg-yellow-300"
          :style="
            loading ? { display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'center' } : {}
          "
        >
          Confirm
          <IconLoader3 v-if="loading" class="animate-spin ml-4 -mr-6" />
        </button>
        <button
          type="button"
          class="p-[1rem] px-[3rem] bg-slate-400 text-slate-50 font-bold rounded-lg hover:bg-slate-500"
          @click="modalVisible = false"
        >
          Cancel
        </button>
      </div>
    </form>
  </TMModal>
</template>
