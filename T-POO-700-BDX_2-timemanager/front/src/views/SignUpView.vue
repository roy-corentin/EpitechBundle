<script setup lang="ts">
import TMPasswordInput from '@/components/ui-kit/TMPasswordInput.vue'
import TMTextInput from '@/components/ui-kit/TMTextInput.vue'
import useApi from '@/composables/api'
import router from '@/router'
import useMyself from '@/stores/myself'
import useUser from '@/stores/user'
import { IconAlertTriangleFilled, IconLoader3 } from '@tabler/icons-vue'
import { Ref, ref } from 'vue'

const { setMyself } = useMyself()
const { setUser } = useUser()
const { signUp } = useApi()

// Signup fields
const email: Ref<string | null> = ref(null)
const password: Ref<string | null> = ref(null)
const username: Ref<string | null> = ref(null)

// Define fields errors
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const isEmailValid = () => email.value !== null && email.value.trim().length > 0 && emailRegex.test(email.value)
const isPasswordValid = () => password.value !== null && password.value.trim().length > 3
const isUsernameValid = () => username.value !== null && username.value.trim().length > 0
const areInputsValid = () => isEmailValid() && isPasswordValid() && isUsernameValid()

// Register errors
const alreadyExists = ref(false)

// Loading state
const loading = ref(false)

const onSignUpSubmit = () => {
  loading.value = true
  signUp(email.value as string, username.value as string, password.value as string)
    .then((createdUser) => {
      setMyself(createdUser.user, createdUser.token)
      setUser(null)
      router.push(`/clock/${createdUser.user.username}`)
    })
    .catch(() => (alreadyExists.value = true))
    .finally(() => (loading.value = false))
}
</script>

<template>
  <div class="absolute top-0 left-0 w-screen h-full bg-gradient-to-t from-slate-500 to-slate-800">
    <form
      @submit.prevent.capture.self=""
      class="w-4/5 md:w-2/5 ml-auto mr-auto mt-[15vh] bg-white px-4 sm:px-8 py-8 sm:py-12 rounded-xl flex flex-col"
    >
      <h2 class="text-center mb-4 -mt-4">Sign up</h2>
      <div v-if="alreadyExists" class="mb-4 flex flex-row items-center gap-2 text-yellow-600 self-center">
        <IconAlertTriangleFilled class="mb-1" />
        <p class="text-lg font-bold text-yellow-600">Email or username already taken</p>
      </div>
      <TMTextInput
        v-model:input="username"
        name="name-signup-input"
        label="Username"
        placeholder="johndoe"
        required
        type="name"
        :error-fnc="isUsernameValid"
        @update:input="alreadyExists = false"
      />
      <TMTextInput
        v-model:input="email"
        name="email-signup-input"
        label="Email"
        placeholder="john@doe.com"
        required
        type="email"
        :error-fnc="isEmailValid"
        @update:input="alreadyExists = false"
      />
      <TMPasswordInput
        name="password-signup-input"
        v-model:input="password"
        :error-fnc="isPasswordValid"
        @update:input="alreadyExists = false"
      />
      <button
        type="submit"
        :disabled="!areInputsValid()"
        class="w-1/2 mt-2 mb-4 ml-[25%] p-[1rem] bg-blue-500 text-slate-50 font-bold rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        :style="
          loading ? { display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'center' } : {}
        "
        @click="onSignUpSubmit"
      >
        Sign Up
        <IconLoader3 v-if="loading" class="animate-spin ml-4 -mr-6" />
      </button>
      <RouterLink to="/signin" class="text-center text-lg text-blue-500 underline hover:text-blue-600"
        >Already have an account? Sign in here</RouterLink
      >
    </form>
  </div>
</template>
