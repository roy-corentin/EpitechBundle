<script setup lang="ts">
import TMLoader from '@/components/ui-kit/TMLoader.vue'
import TMModal from '@/components/ui-kit/TMModal.vue'
import useApi from '@/composables/api'
import router from '@/router'
import useUser from '@/stores/user'
import { useToast } from 'vue-toastification'
import User from '@/types/user'
import { IconArrowBackUp } from '@tabler/icons-vue'
import { Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useMyself from '@/stores/myself'
import { authorizedToCUDUser } from '@/guards'

const route = useRoute()
const myselfStore = useMyself()
const myself = myselfStore.getMyself()
const userStore = useUser()
const toast = useToast()
const { getUserById, createWorkingTime } = useApi()

// Verify params is ok and user is synchronized with select otherwise redirect
if (!parseInt(route.params.userId as string)) router.push('/notFound')
const paramUserId = parseInt(route.params.userId as string)

const user = ref(myself.id === paramUserId ? myself : userStore.user)
const fetchingUser = ref(false)

if (user.value === null || user.value.id !== paramUserId) {
  fetchingUser.value = true
  getUserById(paramUserId)
    .then((userFetched) => {
      if (!authorizedToCUDUser(myself, userFetched)) router.push('/unauthorized')
      else {
        userStore.setUser(userFetched)
        fetchingUser.value = false
      }
    })
    .catch(() => router.push('/notFound'))
}

// New working time values
const defaultStartDate = new Date()
defaultStartDate.setHours(9, 0, 0, 0)
const defaultEndDate = new Date()
defaultEndDate.setHours(17, 0, 0, 0)
const initialDateRange = [defaultStartDate, defaultEndDate]
const inputDateRange: Ref<Date[]> = ref(initialDateRange)

const inputDifferentThanInitial = () => {
  return (
    inputDateRange.value === null ||
    (inputDateRange.value[0] !== (initialDateRange as Date[])[0] &&
      inputDateRange.value[1] !== (initialDateRange as Date[])[1])
  )
}

const validateWorkingTime = () => {
  return inputDateRange.value !== null
}

// Create the working time with the indicated input values
const onConfirm = () => {
  createWorkingTime({
    userId: (user.value as User).id,
    startDate: inputDateRange.value[0],
    endDate: inputDateRange.value[1]
  }).then((workingTime) => {
    toast.success(
      `Working time ${workingTime.startDisplay} - ${workingTime.endDisplay} created for ${
        (user.value as User).username
      }`
    )
    router.push(`/workingTimes/${(user.value as User).id}`)
  })
}

// Update user if changed by fetching
watch(
  () => userStore.user,
  (newUser, _) => {
    if (!newUser) user.value = myself
    else user.value = newUser
  }
)
</script>

<template>
  <TMModal :visible="true" md:width="'50%'" md:height="'40vh'" md:ml="'30%'">
    <TMLoader v-if="fetchingUser" />
    <form v-else class="w-[80%] ml-[10%]" @submit.prevent.stop="onConfirm">
      <h2 class="text-center text-2xl md:text-4xl">Create a working time for {{ (user as User).username }}</h2>
      <div class="mt-8 flex flex-row flex-nowrap justify-start items-center">
        <v-datepicker v-model="inputDateRange" range calendar-cell-class-name="dp-rounded-cell" />
        <IconArrowBackUp
          v-if="inputDifferentThanInitial()"
          :size="20"
          color="#9ca3af"
          class="z-10 cursor-pointer"
          :style="{ marginLeft: inputDateRange === null ? '-2rem' : '-3.5rem' }"
          @click="inputDateRange = initialDateRange"
        />
      </div>
      <div class="flex flex-col md:flex-row flew-nowrap justify-center gap-4 md:gap-16 text-xl mt-6">
        <button
          type="submit"
          :disabled="!validateWorkingTime()"
          class="p-[1rem] px-[3rem] bg-blue-500 text-slate-50 font-bold rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          Confirm
        </button>
        <button
          class="p-[1rem] px-[3rem] bg-slate-400 text-slate-50 font-bold rounded-lg hover:bg-slate-500"
          type="button"
          @click="$router.push(`/workingTimes/${(user as User).id}`)"
        >
          Cancel
        </button>
      </div>
    </form>
  </TMModal>
</template>

<style>
.dp-rounded-cell {
  border-radius: 50%;
}
.dp__action_select {
  color: var(--dp-text-color);
}
.dp__action_select:hover {
  color: var(--dp-primary-text-color);
}
</style>
