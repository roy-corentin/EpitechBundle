<script setup lang="ts">
import TMModal from '@/components/ui-kit/TMModal.vue'
import useApi from '@/composables/api'
import { UserRole } from '@/types/user'
import { IconAlertTriangleFilled, IconLoader3 } from '@tabler/icons-vue'
import { Ref, ref } from 'vue'
import { useToast } from 'vue-toastification'
import RoleSelector from '../ui-kit/RoleSelector.vue'
import TMPasswordInput from '../ui-kit/TMPasswordInput.vue'
import TMTextInput from '../ui-kit/TMTextInput.vue'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const toast = useToast()
const { createUser } = useApi()
const modalVisible = ref(false)

// New user values
const newUserEmail: Ref<string | null> = ref(null)
const newUserUsername: Ref<string | null> = ref(null)
const newUserPassword: Ref<string | null> = ref(null)
const newUserRole: Ref<UserRole> = ref('employee')

// Input errors management
const isEmailValid = () =>
  newUserEmail.value !== null && newUserEmail.value.trim().length > 0 && emailRegex.test(newUserEmail.value)
const isUsernameValid = () => newUserUsername.value !== null && newUserUsername.value.trim().length > 0
const isPasswordValid = () => newUserPassword.value !== null && newUserPassword.value.trim().length > 3
const areInputsValid = () => isEmailValid() && isUsernameValid() && isPasswordValid()

const loading = ref(false)
const createError = ref(false)

const onConfirm = () => {
  createUser(
    newUserEmail.value as string,
    newUserUsername.value as string,
    newUserPassword.value as string,
    newUserRole.value
  )
    .then((newUser) => {
      modalVisible.value = false
      toast.success(`User [${newUser.role.charAt(0).toUpperCase()}]${newUser.username} (${newUser.email}) created`)
    })
    .catch(() => (createError.value = true))
    .finally(() => (loading.value = false))
}
</script>

<template>
  <button
    v-bind="$attrs"
    class="p-[0.75rem] px-[1.2rem] bg-blue-500 text-slate-50 font-bold rounded-lg hover:bg-blue-600"
    @click="
      () => {
        newUserEmail = null
        newUserUsername = null
        newUserPassword = null
        newUserRole = 'employee'
        modalVisible = true
      }
    "
  >
    Create
  </button>
  <TMModal modal-id="createUserModal" v-model:visible="modalVisible" width="95%" height="auto" md:mt="25vh">
    <form class="font w-[80%] ml-[10%]" @submit.prevent.stop="onConfirm">
      <h2 class="text-2xl md:text-4xl text-center">Create a new user</h2>
      <div v-if="createError" class="flex flex-row items-center gap-2 text-yellow-600 self-center">
        <IconAlertTriangleFilled class="mb-1" />
        <p class="text-lg font-bold text-yellow-600">Username or email already taken</p>
      </div>
      <div class="mt-2">
        <TMTextInput
          v-model:input="newUserEmail"
          name="email-create-input"
          label="Email"
          placeholder="jack@honell.com"
          required
          :error-fnc="isEmailValid"
          @update:input="createError = false"
        />
        <TMTextInput
          v-model:input="newUserUsername"
          name="username-create-input"
          label="Username"
          placeholder="Jack Honell"
          required
          :error-fnc="isUsernameValid"
          @update:input="createError = false"
        />
        <TMPasswordInput
          name="password-create-input"
          v-model:input="newUserPassword"
          :error-fnc="isPasswordValid"
          @update:input="createError = false"
        />
        <RoleSelector v-model:input="newUserRole" default-role="employee" @update:input="createError = false" />
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
