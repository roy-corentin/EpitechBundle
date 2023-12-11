<script setup lang="ts">
import DailySchedule from '@/components/charts/DailySchedule.vue'
import MeanWorkingHoursPerDay from '@/components/charts/MeanWorkingHoursPerDay.vue'
import HoursWorkedPerMonth from '@/components/charts/HoursWorkedPerMonth.vue'
import NightHours from '@/components/charts/NightHours.vue'
import TMLoader from '@/components/ui-kit/TMLoader.vue'
import WorkingTimesSearch from '@/components/working-times/WorkingTimesSearch.vue'
import useApi from '@/composables/api'
import router from '@/router'
import useUser from '@/stores/user'
import User from '@/types/user'
import WorkingTime from '@/types/workingTime'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  LogarithmicScale,
  PointElement,
  RadialLinearScale,
  TimeScale
} from 'chart.js'
import { Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useMyself from '@/stores/myself'
import { authorizedToViewUser } from '@/guards'

ChartJS.register(
  LinearScale,
  CategoryScale,
  TimeScale,
  PointElement,
  LogarithmicScale,
  RadialLinearScale,
  LineElement,
  BarElement,
  ArcElement
)

// Get necessary stores and variables
const route = useRoute()
const myselfStore = useMyself()
const myself = myselfStore.getMyself()
const userStore = useUser()

// Working times data
const workingTimes: Ref<WorkingTime[] | null> = ref(null)
const startDateParam: Ref<Date | undefined> = ref(undefined)
const endDateParam: Ref<Date | undefined> = ref(undefined)

/**
 * Verify date params
 */
const setDateParams = () => {
  startDateParam.value = route.query.startDate ? new Date(route.query.startDate as string) : undefined
  if (startDateParam.value && Number.isNaN(startDateParam.value.getTime())) router.push(route.path)
  endDateParam.value = route.query.endDate ? new Date(route.query.endDate as string) : undefined
  if (endDateParam.value && Number.isNaN(endDateParam.value.getTime())) router.push(route.path)
}

/**
 * Get user working times
 */
const fetchWorkingTimes = () => {
  const currentUser = user.value as User
  isLoading.value = true
  fetchUserWorkingTimes({
    userId: currentUser.id,
    startDate: startDateParam.value && startDateParam.value.toDateString(),
    endDate: endDateParam.value && endDateParam.value.toDateString()
  }).then((result) => {
    workingTimes.value = result.workingTimes
    isLoading.value = false
  })
}

// Verify params is ok and user is synchronized with select otherwise redirect
if (!parseInt(route.params.userId as string)) router.push('/notFound')
setDateParams()
const paramUserId = parseInt(route.params.userId as string)

const user = ref(myself && myself.id === paramUserId ? myself : userStore.user)
const { fetchUserWorkingTimes, getUserById } = useApi()
const isLoading = ref(false)

if (user.value === null || user.value.id !== paramUserId) {
  isLoading.value = true
  getUserById(paramUserId)
    .then((userFetched) => {
      if (!authorizedToViewUser(myself, userFetched)) router.push('/unauthorized')
      else {
        userStore.setUser(userFetched)
        user.value = userFetched
        fetchWorkingTimes()
      }
    })
    .catch(() => router.push('/notFound'))
    .finally(() => isLoading.value = false)
} else {
  if (!authorizedToViewUser(myself, user.value)) router.push('/unauthorized')
  else fetchWorkingTimes()
}

// Update user if changed by fetching
watch(
  () => userStore.user,
  (newUser, _) => {
    if (!newUser) user.value = myself
    else user.value = newUser
    router.push(`/chartManager/${user.value.id}`)
  }
)

// Update working times if strat / end date params
watch(
  () => route.params,
  () => {
    setDateParams()
    fetchWorkingTimes()
  }
)
</script>

<template>
  <div v-if="isLoading || !workingTimes" class="w-[60%] ml-[20%] mt-[15rem]">
    <TMLoader />
  </div>

  <div v-else class="w-12/12 h-full flex flex-col items-center overflow-y-auto">
    <WorkingTimesSearch class="mt-16 md:self-start md:ml-8 md:mt-8" />
    <DailySchedule :working-times="workingTimes" :start-date="startDateParam" :end-date="endDateParam" />
    <MeanWorkingHoursPerDay :working-times="workingTimes" />
    <HoursWorkedPerMonth :working-times="workingTimes" />
    <NightHours :working-times="workingTimes" />
  </div>
</template>
