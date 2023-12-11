<script setup lang="ts">
import TMLoader from '@/components/ui-kit/TMLoader.vue'
import useApi from '@/composables/api'
import { authorizedToViewUser } from '@/guards'
import router from '@/router'
import useMyself from '@/stores/myself'
import useUser from '@/stores/user'
import User from '@/types/user'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

interface ClockManagerProps {
  offlineMe?: User
}
const { offlineMe } = defineProps<ClockManagerProps>()

const route = useRoute()
const myselfStore = useMyself()
const userStore = useUser()

const paramUsername = route.params.user_name as string
const myself = myselfStore.getMyself()

const user = ref(myself && myself.username === paramUsername ? myself : userStore.user)
const clock = ref(myself && myself.username === paramUsername ? myselfStore.myClock : userStore.clock)
if (offlineMe) {
  user.value = offlineMe
  const localStorageClock = localStorage.getItem('myClock')
  if (localStorageClock) clock.value = JSON.parse(localStorageClock)
  else {
    clock.value = {
      id: -1,
      started: new Date(1, 1, 1, 0, 0, 0),
      status: false
    }
    myselfStore.setMyClock(clock.value)
  }
}

const { getClockByUserId, toggleClockByUserId, fetchUsers } = useApi()
const toast = useToast()
const isLoading = ref(false)

const timer = ref(clock.value ? getInitialTimerFromStartDate(clock.value.started) : new Date(1, 1, 1, 0, 0, 0))
let timerIntervalId = -1
const toggleTimer = () => {
  timerIntervalId = setInterval(() => {
    const nextDate = new Date(timer.value)
    nextDate.setSeconds(nextDate.getSeconds() + 1)
    timer.value = nextDate
  }, 1000)
}

function getInitialTimerFromStartDate(startDate: Date): Date {
  const adjustedStartDate = new Date(startDate)
  adjustedStartDate.setHours(adjustedStartDate.getHours() + 1)
  return new Date(new Date().getTime() - adjustedStartDate.getTime())
}

// Start / End working logic
const clockAndRefresh = () => {
  const userId = (user.value as User).id
  toggleClockByUserId(userId, offlineMe !== undefined).then((toggledClock) => {
    if (!toggledClock) {
      if (!clock.value) {
        clock.value = {
          id: -1,
          started: new Date(1, 1, 1, 0, 0, 0),
          status: true
        }
      } else {
        clock.value.status = !clock.value.status
        if (clock.value.status) clock.value.started = new Date()
      }
    } else clock.value = toggledClock

    timer.value = getInitialTimerFromStartDate(clock.value.started)
    if ((user.value as User).id === myself.id) myselfStore.setMyClock(clock.value)
    else userStore.setClock(clock.value)
    if (clock.value.status) {
      // If user is working
      toggleTimer()
      toast.success('Working time record started')
    } else {
      // If user is not working
      clearInterval(timerIntervalId)
      toast.success(`Working time of ${timer.value.toLocaleTimeString(undefined, { hour12: false })} registered`)
    }
  })
}

// Fetch user if not set by context (url typed)
if (user.value === null) {
  isLoading.value = true
  fetchUsers({
    username: paramUsername as string
  }).then((usersFound) => {
    if (usersFound.length === 0) router.push('/notFound')
    if (!authorizedToViewUser(myself, usersFound[0])) router.push('/unauthorized')
    else {
      user.value = usersFound[0]
      userStore.setUser(usersFound[0])
      getClockByUserId(usersFound[0].id)
        .then((clockFetched) => {
          clock.value = clockFetched
          timer.value = getInitialTimerFromStartDate(clockFetched.started)
          if (clockFetched.status && timerIntervalId === -1) toggleTimer()
          else if (timerIntervalId !== -1) {
            clearInterval(timerIntervalId)
            timerIntervalId = -1
          }
          userStore.setClock(clockFetched)
          isLoading.value = false
        })
        .catch(() => (isLoading.value = false))
    }
  })
} else {
  if (!authorizedToViewUser(myself, user.value)) router.push('/unauthorized')
  else {
    // If user in context and is working toggle timer
    if (clock.value && clock.value.status) toggleTimer()
    else {
      getClockByUserId(user.value.id)
        .then((clockFetched) => {
          clock.value = clockFetched
          timer.value = getInitialTimerFromStartDate(clockFetched.started)
          if (clockFetched.status && timerIntervalId === -1) toggleTimer()
          else if (timerIntervalId !== -1) {
            clearInterval(timerIntervalId)
            timerIntervalId = -1
          }
          if ((user.value as User).id === myself.id && !myselfStore.myClock) myselfStore.setMyClock(clockFetched)
          else userStore.setClock(clockFetched)
          isLoading.value = false
        })
        .catch(() => (isLoading.value = false))
    }
  }
}

// Update user if changed by fetching
watch(
  () => userStore.user,
  (newUser, _) => {
    if (!newUser) {
      user.value = myself
      clock.value = myselfStore.myClock
    } else {
      user.value = newUser
      clock.value = null
    }

    if (!clock.value) {
      isLoading.value = true
      getClockByUserId(user.value.id)
        .then((clockFetched) => {
          clock.value = clockFetched
          if (clockFetched.status && timerIntervalId === -1) {
            timer.value = getInitialTimerFromStartDate(clockFetched.started)
            toggleTimer()
          } else if (timerIntervalId !== -1) {
            clearInterval(timerIntervalId)
            timerIntervalId = -1
            timer.value = new Date(1, 1, 1, 0, 0, 0)
          }
          userStore.setClock(clockFetched)
          isLoading.value = false
        })
        .catch(() => (isLoading.value = false))
        .finally(() => {
          router.push(`/clock/${(user.value as User).username}`)
        })
    } else {
      if (clock.value.status && timerIntervalId === -1) {
        timer.value = getInitialTimerFromStartDate(clock.value.started)
        toggleTimer()
      } else if (timerIntervalId !== -1) {
        clearInterval(timerIntervalId)
        timerIntervalId = -1
        timer.value = new Date(1, 1, 1, 0, 0, 0)
      }
      router.push(`/clock/${user.value.username}`)
    }
  }
)

watch(
  () => myselfStore.myself,
  (newMyself, _) => {
    router.push(`/clock/${(newMyself as User).username}`)
    user.value = newMyself
  }
)
</script>

<template>
  <div v-if="isLoading" class="w-[60%] ml-[20%] mt-[15rem]">
    <TMLoader />
  </div>
  <div v-else class="h-full container">
    <h2 v-if="user" class="text-3xl font-bold mb-4">{{ user.username }}'s clock</h2>
    <h2 v-else>Please, select a user to start</h2>
    <div class="flex flex-col items-center">
      <div v-if="clock && clock.status" class="w-full md:w-1/2 mb-4">
        <h4 class="text-lg md:text-xl font-semibold center-text">
          Current working time: {{ timer.toLocaleTimeString(undefined, { hour12: false }) }}
        </h4>
      </div>
      <h4
        class="text-xl font-semibold"
        v-else-if="user && user.id !== myselfStore.getMyself().id && myselfStore.getMyself().role === 'manager'"
      >
        {{ user.username }} is not working for now
      </h4>
      <div :class="clock && clock.status ? 'mt-[0.15rem]' : 'mt-[2.6rem]'">
        <button
          v-if="offlineMe !== undefined || user === myselfStore.getMyself() || myselfStore.getMyself().role === 'administrator'"
          :disabled="user === null"
          @click="clockAndRefresh"
          :class="{ 'text-green': clock && clock.status, 'text-red': !clock || !clock.status }"
          class="custom"
        >
          {{ clock && clock.status ? 'Finish Work' : 'Start Work' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  padding-top: 16rem;
}
.container h2,
.center-text {
  text-align: center;
}
.text-green {
  color: #48bb78;
  border: 4px solid #48bb78;
}
.text-red {
  color: #f56565;
  border: 4px solid #f56565;
}
.custom {
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}
.custom:disabled {
  color: white;
  background: #b5beac;
  border: none;
}
</style>
