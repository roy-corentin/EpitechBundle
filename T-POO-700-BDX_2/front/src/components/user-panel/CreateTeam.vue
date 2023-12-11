<script setup lang="ts">
import TMModal from '@/components/ui-kit/TMModal.vue'
import useApi from '@/composables/api'
import User from '@/types/user'
import { IconAlertTriangleFilled, IconLoader3 } from '@tabler/icons-vue'
import { Ref, ref } from 'vue'
import { useToast } from 'vue-toastification'
import TMTextInput from '../ui-kit/TMTextInput.vue'
import ManagerSelector from './ManagerSelector.vue'
import MembersSelector from './MembersSelector.vue'

const { createTeam } = useApi()
const toast = useToast()
const modalVisible = ref(false)

// New user values
const newTeamName: Ref<string | null> = ref(null)
const newTeamManager: Ref<User | null> = ref(null)
const newTeamMembers: Ref<User[]> = ref([])

// Input errors management
const isNameValid = () => newTeamName.value !== null && newTeamName.value.trim().length > 0
const isManagerValid = () => newTeamManager.value !== null
const areInputsValid = () => isNameValid() && isManagerValid()

const loading = ref(false)
const createdError = ref(false)

const onConfirm = () => {
  loading.value = true
  createTeam(newTeamName.value as string, newTeamManager.value as User, newTeamMembers.value as User[])
    .then((team) => {
      toast.success(`Team ${team.name} created`)
      modalVisible.value = false
    })
    .catch(() => (createdError.value = true))
    .finally(() => (loading.value = false))
}
</script>

<template>
  <button
    v-bind="$attrs"
    class="p-[0.75rem] px-[1.2rem] bg-blue-500 text-slate-50 font-bold rounded-lg hover:bg-blue-600"
    @click="
      () => {
        newTeamName = null
        newTeamManager = null
        newTeamMembers = []
        modalVisible = true
      }
    "
  >
    Create
  </button>
  <TMModal modal-id="createTeamModal" v-model:visible="modalVisible" :height="createdError ? '55vh' : 'auto'">
    <form class="w-[80%] ml-[10%] flex flex-col" @submit.prevent.stop="onConfirm">
      <h2 class="text-center">Create a new team</h2>
      <div v-if="createdError" class="mb-4 flex flex-row items-center gap-2 text-yellow-600 self-center">
        <IconAlertTriangleFilled class="mb-1" />
        <p class="text-lg font-bold text-yellow-600">A team with this name already exists</p>
      </div>
      <div class="mt-2">
        <TMTextInput
          v-model:input="newTeamName"
          name="team-name-create-input"
          label="Name"
          placeholder="DevOps"
          required
          :error-fnc="isNameValid"
          @update:input="createdError = false"
        />
        <div class="mb-[1rem]">
          <ManagerSelector v-model:input="newTeamManager" required @update:input="createdError = false" />
        </div>
        <MembersSelector
          v-model:input="newTeamMembers"
          :current-manager="newTeamManager"
          @update:input="createdError = false"
        />
      </div>
      <div class="flex flex-col md:flex-row flew-nowrap justify-center gap-4 md:gap-16 text-xl mt-4">
        <button
          type="submit"
          :disabled="!areInputsValid()"
          class="p-[1rem] px-[3rem] bg-blue-500 text-slate-50 font-bold rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
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
