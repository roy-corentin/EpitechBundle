<script setup lang="ts">
import Paginate from '@/components/ui-kit/Paginate.vue'
import CreateWorkingTimeButton from '@/components/working-times/CreateWorkingTimeButton.vue'
import WorkingTimesSearch from '@/components/working-times/WorkingTimesSearch.vue'
import useApi from '@/composables/api'
import router from '@/router'
import useMyself from '@/stores/myself'
import useUser from '@/stores/user'
import User from '@/types/user'
import WorkingTime from '@/types/workingTime'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import WorkingTimesTable from '../components/working-times/WorkingTimesTable.vue'
import { authorizedToViewUser } from '@/guards'

const route = useRoute()
const myselfStore = useMyself()
const myself = myselfStore.getMyself()
const userStore = useUser()

const paramUserId = parseInt(route.params.userId as string)
if (!paramUserId) router.push('/notFound')

const user = ref(myself && myself.id === paramUserId ? myself : userStore.user)

const startDate = ref(route.query.startDate as string | undefined)
const endDate = ref(route.query.endDate as string | undefined)
const page = ref(Number((route.query.page as string | undefined) ?? 1))

const fetchingUser = ref(false)
const { getUserById, fetchUserWorkingTimes } = useApi()

if (user.value === null) {
  fetchingUser.value = true
  getUserById(paramUserId)
    .then((userFetched) => {
      if (!authorizedToViewUser(myself, userFetched)) router.push('/unauthorized')
      else userStore.setUser(userFetched)
    })
    .catch(() => router.push('/notFound'))
    .finally(() => (fetchingUser.value = false))
} else {
  if (!authorizedToViewUser(myself, user.value)) router.push('/unauthorized')
  fetchingUser.value = true
  fetchUserWorkingTimes({
    userId: user.value.id,
    startDate: startDate.value,
    endDate: endDate.value,
    page: page.value ? page.value : undefined
  }).then((result) => {
    nbPage.value = result.nbPage
    workingTimes.value = result.workingTimes
    fetchingUser.value = false
  })
}

const paginateCallback = (pageNum: number) => {
  router.push({ path: route.fullPath, query: { page: pageNum } })
}

const nbPage = ref(0)
const workingTimes = ref([] as WorkingTime[])

watch(
  () => userStore.user,
  (newUser) => {
    if (!newUser) user.value = myselfStore.getMyself()
    else user.value = newUser

    fetchingUser.value = true
    fetchUserWorkingTimes({
      userId: user.value.id,
      startDate: startDate.value,
      endDate: endDate.value,
      page: page.value ? page.value : undefined
    }).then((result) => {
      nbPage.value = result.nbPage
      workingTimes.value = result.workingTimes
      fetchingUser.value = false
      router.push(`/workingtimes/${(user.value as User).id}`)
    })
  }
)

watch(route, () => {
  startDate.value = route.query.startDate as string | undefined
  endDate.value = route.query.endDate as string | undefined
  page.value = Number((route.query.page as string | undefined) ?? 1)
  if (user.value) {
    fetchUserWorkingTimes({
      userId: user.value.id,
      startDate: startDate.value,
      endDate: endDate.value,
      page: page.value ? page.value : undefined
    }).then((result) => {
      ;(nbPage.value = result.nbPage), (workingTimes.value = result.workingTimes)
    })
  }
})
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-between mt-16 md:mt-8">
    <div class="w-5/6 ml-[8.3%]">
      <div class="flex flex-col items-center md:flex-row md:justify-between mb-6">
        <WorkingTimesSearch class="w-full mb-4" />
        <CreateWorkingTimeButton
          v-if="user === myselfStore.getMyself() || myselfStore.getMyself().role === 'administrator'"
          class="w-full md:w-auto"
        />
      </div>
      <WorkingTimesTable v-if="user" :working-times="workingTimes" :user-id="user.id" />
      <p v-else>loading</p>
    </div>
    <div class="mb-6 flex justify-center md:mb-16">
      <Paginate :page="page" :nb-page="nbPage" :paginate-callback="paginateCallback" />
    </div>
  </div>
</template>
