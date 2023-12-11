<script setup lang="ts">
import TMLoader from '@/components/ui-kit/TMLoader.vue'
import TMModal from '@/components/ui-kit/TMModal.vue'
import ConfirmWorkingTimeDelete from '@/components/working-time/ConfirmWorkingTimeDelete.vue'
import useApi from '@/composables/api'
import { authorizedToCUDUser } from '@/guards'
import router from '@/router'
import useMyself from '@/stores/myself'
import useUser from '@/stores/user'
import useWorkingTime from '@/stores/workingTime'
import User from '@/types/user'
import WorkingTime from '@/types/workingTime'
import { IconArrowBackUp } from '@tabler/icons-vue'
import { Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const route = useRoute()
const myselfStore = useMyself()
const myself = myselfStore.getMyself()
const userStore = useUser()
const toast = useToast()
const { getUserById, getWorkingTimeById, updateWorkingTime } = useApi()

const deleteViewVisible = ref(false)

const workingTime: Ref<WorkingTime | null> = ref(null)
let initialDateRange: Date[] | null = null
const inputDateRange: Ref<Date[] | null> = ref(null)

const initializeDateRanges = (initialStart: Date, initialEnd: Date) => {
  initialDateRange = [initialStart, initialEnd]
  inputDateRange.value = initialDateRange
}

// Verify params is ok and user is synchronized with select otherwise redirect
if (!parseInt(route.params.userId as string)) router.push('/notFound')
if (!parseInt(route.params.workingTimeId as string)) router.push('/notFound')
const paramUserId = parseInt(route.params.userId as string)
const paramsWorkingTimeId = parseInt(route.params.workingTimeId as string)

const user = ref(myself.id === paramUserId ? myself : userStore.user)

// If params in url are ok, if no user in store, fetch user and working time data (redirect if not valid)
const fetchingUserWorkingTime = ref(false)
if (user.value === null || user.value.id !== paramUserId) {
  fetchingUserWorkingTime.value = true
  getUserById(paramUserId)
    .then((userFetched) => {
      if (!authorizedToCUDUser(myself, userFetched)) router.push('/unauthorized')
      else {
        userStore.setUser(userFetched)
        getWorkingTimeById(userFetched.id, paramsWorkingTimeId)
          .then((fetchedWorkingTime) => {
            workingTime.value = fetchedWorkingTime
            initializeDateRanges(fetchedWorkingTime.startDate, fetchedWorkingTime.endDate)
            fetchingUserWorkingTime.value = false
          })
          .catch(() => router.push('/notFound'))
      }
    })
    .catch(() => router.push('/notFound'))
} else {
  // Otherwise get working time only
  if (!authorizedToCUDUser(myself, user.value)) router.push('/unauthorized')
  workingTime.value = useWorkingTime().workingTime as WorkingTime
  if (!workingTime.value) {
    getWorkingTimeById(user.value.id, paramsWorkingTimeId)
      .then((fetchedWorkingTime) => {
        workingTime.value = fetchedWorkingTime
        initializeDateRanges(fetchedWorkingTime.startDate, fetchedWorkingTime.endDate)
        fetchingUserWorkingTime.value = false
      })
      .catch(() => router.push('/notFound'))
  } else initializeDateRanges(workingTime.value.startDate, workingTime.value.endDate)
}

const inputDifferentThanInitial = () => {
  return (
    inputDateRange.value === null ||
    (inputDateRange.value[0] !== (initialDateRange as Date[])[0] &&
      inputDateRange.value[1] !== (initialDateRange as Date[])[1])
  )
}

const validateWorkingTime = () => inputDateRange.value !== null && inputDifferentThanInitial()

const onUpdate = () => {
  updateWorkingTime({
    startDate: (inputDateRange.value as Date[])[0],
    endDate: (inputDateRange.value as Date[])[1],
    userId: (user.value as User).id,
    workingTimeId: (workingTime.value as WorkingTime).id
  }).then((updatedWorkingTime) => {
    toast.success(`Working time updated to ${updatedWorkingTime.startDisplay} - ${updatedWorkingTime.endDisplay}`)
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
    <TMLoader v-if="fetchingUserWorkingTime" />
    <ConfirmWorkingTimeDelete
      v-else-if="deleteViewVisible"
      v-model:visible="deleteViewVisible"
      :working-time="workingTime as WorkingTime"
      :user-id="(user as User).id"
    />
    <form v-else class="w-[80%] ml-[10%]">
      <h2 class="text-center text-2xl md:text-4xl">Modifying working time for {{ (user as User).username }}</h2>
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
          type="button"
          :disabled="!validateWorkingTime()"
          class="p-[1rem] px-[3rem] bg-yellow-500 text-slate-50 font-bold rounded-lg hover:bg-yellow-600 disabled:bg-gray-300"
          @click="onUpdate"
        >
          Update
        </button>
        <button
          type="button"
          @click="() => (deleteViewVisible = true)"
          class="p-[1rem] px-[3rem] bg-red-500 text-slate-50 font-bold rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
        <button
          class="p-[1rem] px-[3rem] bg-slate-400 text-slate-50 font-bold rounded-lg hover:bg-slate-500"
          type="button"
          @click="$router.push(`/workingTimes/${user?.id}`)"
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
</style>
