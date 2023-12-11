<script setup lang="ts">
import TMPasswordInput from '@/components/ui-kit/TMPasswordInput.vue'
import TMTextInput from '@/components/ui-kit/TMTextInput.vue'
import useApi from '@/composables/api'
import router from '@/router'
import useMyself from '@/stores/myself'
import useUser from '@/stores/user'
import { IconAlertTriangleFilled, IconLoader3 } from '@tabler/icons-vue'
import { Ref, ref } from 'vue'

const { signIn } = useApi()
const { setMyself } = useMyself()
const { setUser } = useUser()

// Login fields
const email: Ref<string | null> = ref(null)
const password: Ref<string | null> = ref(null)

// Define fields errors
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const isEmailValid = () => email.value !== null && email.value.trim().length > 0 && emailRegex.test(email.value)
const isPasswordValid = () => password.value !== null && password.value.trim().length > 3
const areInputsValid = () => isEmailValid() && isPasswordValid()

// Login error
const invalidLogin = ref(false)

// Loading
const loading = ref(false)

const onLoginSubmit = () => {
  loading.value = true
  signIn(email.value as string, password.value as string)
    .then((signedInUser) => {
      setMyself(signedInUser.user, signedInUser.token)
      setUser(null)
      router.push(`/clock/${signedInUser.user.username}`)
    })
    .catch(() => (invalidLogin.value = true))
    .finally(() => (loading.value = false))
}
</script>

<template>
  <div class="absolute top-0 left-0 w-screen h-screen bg-gradient-to-t from-slate-500 to-slate-800">
    <form
      @submit.prevent.capture.self=""
      class="w-4/5 md:w-2/5 ml-auto mr-auto mt-[25vh] bg-white px-4 sm:px-8 py-8 sm:py-12 rounded-xl flex flex-col"
    >
      <h2 class="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 -mt-4">Sign in</h2>
      <div v-if="invalidLogin" class="mb-4 flex flex-row items-center gap-2 text-yellow-600 self-center">
        <IconAlertTriangleFilled class="mb-1" />
        <p class="text-lg font-bold text-yellow-600">The given credentials are not valid</p>
      </div>
      <TMTextInput
        v-model:input="email"
        name="email-signin-input"
        label="Email"
        placeholder="john@doe.com"
        required
        type="email"
        :error-fnc="isEmailValid"
        @update:input="() => (invalidLogin = false)"
      />
      <TMPasswordInput
        name="password-signin-input"
        v-model:input="password"
        :error-fnc="isPasswordValid"
        @update:input="() => (invalidLogin = false)"
      />
      <button
        type="submit"
        :disabled="!areInputsValid()"
        class="w-1/2 mt-2 mb-4 ml-[25%] p-[1rem] bg-blue-500 text-slate-50 font-bold rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        :style="
          loading ? { display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'center' } : {}
        "
        @click="onLoginSubmit"
      >
        Sign in
        <IconLoader3 v-if="loading" class="animate-spin ml-4 -mr-6" />
      </button>
      <RouterLink to="/signup" class="text-center text-lg text-blue-500 underline hover:text-blue-600"
        >Don't have an account? Create one here</RouterLink
      >
    </form>
  </div>
</template>
