<script setup lang="ts">
import TMModal from '@/components/ui-kit/TMModal.vue'
import useApi from '@/composables/api'
import useMyself from '@/stores/myself'
import useUser from '@/stores/user'
import User, { UserRole, UserUpdate } from '@/types/user'
import { IconAlertTriangleFilled, IconLoader3 } from '@tabler/icons-vue'
import { Ref, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import RoleSelector from '../ui-kit/RoleSelector.vue'
import TMPasswordInput from '../ui-kit/TMPasswordInput.vue'
import TMTextInput from '../ui-kit/TMTextInput.vue'

// Props
interface UpdateUserProps {
  currentUser: User
  title?: string
}
const props = defineProps<UpdateUserProps>()
const currentUser = ref(props.currentUser)

const { updateUser } = useApi()
const { getMyself, setMyself } = useMyself()
const { setUser } = useUser()
const updateError = ref(false)
const loading = ref(false)
const toast = useToast()
const modalVisible = ref(false)

// New user values
const updatedUserEmail: Ref<string | null> = ref(currentUser.value.email)
const updatedUserUsername: Ref<string | null> = ref(currentUser.value.username)
const updatedUserPassword: Ref<string | null> = ref(null)
const updatedUserRole: Ref<UserRole> = ref(currentUser.value.role)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Input errors management
const isEmailValid = () =>
  updatedUserEmail.value !== null && updatedUserEmail.value.trim().length > 0 && emailRegex.test(updatedUserEmail.value)
const isUsernameValid = () => updatedUserUsername.value !== null && updatedUserUsername.value.trim().length > 0
const isPasswordValid = () =>
  updatedUserPassword.value === null ||
  updatedUserPassword.value.trim().length > 3 ||
  updatedUserPassword.value.length === 0

const areInputsValid = () =>
  isEmailValid() &&
  isUsernameValid() &&
  isPasswordValid() &&
  (currentUser.value.email !== updatedUserEmail.value ||
    currentUser.value.username !== updatedUserUsername.value ||
    currentUser.value.role !== updatedUserRole.value ||
    (updatedUserPassword.value !== null && updatedUserPassword.value.trim().length > 3))

const onUpdate = () => {
  const updatedUserValues: Partial<UserUpdate> = {}
  if (currentUser.value.email !== updatedUserEmail.value) updatedUserValues.email = updatedUserEmail.value || undefined
  if (currentUser.value.username !== updatedUserUsername.value)
    updatedUserValues.username = updatedUserUsername.value || undefined
  if (updatedUserPassword.value) updatedUserValues.password = updatedUserPassword.value || undefined
  if (currentUser.value.role !== updatedUserRole.value) updatedUserValues.role = updatedUserRole.value

  loading.value = true
  updateUser(currentUser.value.id, updatedUserValues)
    .then((updatedUser) => {
      if (updatedUser.id === getMyself().id) setMyself(updatedUser)
      else setUser(updatedUser)
      modalVisible.value = false
      toast.success(
        `User updated to [${updatedUser.role.charAt(0).toUpperCase()}]${updatedUser.username} (${updatedUser.email})`
      )
      currentUser.value = updatedUser
    })
    .catch(() => (updateError.value = true))
    .finally(() => (loading.value = false))
}

watch(
  () => props.currentUser,
  (newCurrentUser, _) => {
    currentUser.value = newCurrentUser
    updatedUserEmail.value = newCurrentUser.email
    updatedUserUsername.value = newCurrentUser.username
    updatedUserRole.value = newCurrentUser.role
  }
)
</script>

<template>
  <button
    v-bind="$attrs"
    class="p-[0.75rem] px-[1.2rem] bg-yellow-500 text-slate-50 font-bold rounded-lg hover:bg-yellow-600"
    @click="
      () => {
        modalVisible = true
        updatedUserEmail = currentUser.email
        updatedUserUsername = currentUser.username
        updatedUserRole = currentUser.role
      }
    "
  >
    Update
  </button>
  <TMModal v-model:visible="modalVisible" mt="7vh" md:mt="20vh">
    <form class="w-[80%] ml-[10%] flex flex-col" @submit.prevent.stop="onUpdate">
      <h2 v-if="title" class="text-center text-2xl md:text-4xl">{{ title }}</h2>
      <h2 v-else class="text-center text-2xl md:text-4xl">Update {{ currentUser.username }}'s account</h2>
      <div v-if="updateError" class="flex flex-row items-center gap-2 text-yellow-600 self-center">
        <IconAlertTriangleFilled class="mb-1" />
        <p class="text-lg font-bold text-yellow-600">Username or email already taken</p>
      </div>
      <div class="mt-2">
        <TMTextInput
          v-model:input="updatedUserEmail"
          name="email-update-input"
          label="Email"
          placeholder="jack@honell.com"
          :default-input="currentUser.email"
          :error-fnc="isEmailValid"
          @update:input="updateError = false"
        />
        <TMTextInput
          v-model:input="updatedUserUsername"
          name="username-update-input"
          label="Username"
          placeholder="Jack Honell"
          :default-input="currentUser.username"
          :error-fnc="isUsernameValid"
          @update:input="updateError = false"
        />
        <TMPasswordInput
          name="password-update-input"
          v-model:input="updatedUserPassword"
          :error-fnc="isPasswordValid"
          @update:input="updateError = false"
        />
        <RoleSelector
          v-if="getMyself().role === 'administrator'"
          v-model:input="updatedUserRole"
          :default-role="currentUser.role"
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
