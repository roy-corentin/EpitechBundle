<script setup lang="ts">
import useMyself from '@/stores/myself'
import useUser from '@/stores/user'
import { IconCalendarStats, IconChartAreaLineFilled, IconClockHour3 } from '@tabler/icons-vue'
import { computed, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const myselfStore = useMyself()
const userStore = useUser()
const user = ref(userStore.user ? userStore.user : myselfStore.getMyself())

const router = useRouter()
const currentPath = computed(() => router.currentRoute.value.path)

const isTabActive = (path: string, type: 'equal' | 'startsWith' = 'equal') =>
  type === 'startsWith' ? currentPath.value.startsWith(path) : path === currentPath.value

watch(
  () => userStore.user,
  (newUser, _) => {
    if (!newUser) user.value = myselfStore.getMyself()
    else user.value = newUser
  }
)
</script>

<template>
  <nav>
    <ul class="flex border-solid bg-slate-800 border-slate-700 border-b">
      <li class="w-1/4 md:w-min" :class="{ '-mb-px': isTabActive(`/clock/${user?.username}`, 'startsWith') }">
        <RouterLink
          :to="`/clock/${user?.username}`"
          class="py-2 px-4 font-semibold flex flex-row gap-1"
          :class="{
            'h-full border-solid border-t-4 border-white bg-white text-slate-700 rounded-tr': isTabActive(
              `/clock/${user?.username}`,
              'startsWith'
            ),
            'text-white hover:text-slate-500': !isTabActive(`/clock/${user?.username}`, 'startsWith')
          }"
        >
          <IconClockHour3 :size="21" class="mt-[0.025rem]" />Clock
        </RouterLink>
      </li>
      <li class="w-2/4 flex justify-center md:md:w-max" :class="{ '-mb-px': isTabActive('/workingTimes', 'startsWith') }">
        <RouterLink
          :to="`/workingTimes/${user?.id}`"
          class="py-2 px-4 font-semibold flex flex-row gap-1 items-center"
          :class="{
            'bg-white text-slate-700 h-full border-solid border-t-4 border-white rounded-t': isTabActive(
              '/workingTime',
              'startsWith'
            ),
            'text-white hover:text-slate-500': !isTabActive('/workingTime', 'startsWith')
          }"
        >
          <IconCalendarStats :size="21" class="mb-[0.075rem]" />Working times
        </RouterLink>
      </li>
      <li class="w-1/4 md:w-min" :class="{ '-mb-px': isTabActive(`/chartManager/${user?.id}`, 'startsWith') }">
        <RouterLink
          :to="`/chartManager/${user?.id}`"
          class="py-2 px-4 font-semibold flex flex-row gap-1"
          :class="{
            'bg-white text-slate-700 h-full border-solid border-t-4 border-white rounded-tl': isTabActive(
              `/chartManager/${user?.id}`,
              'startsWith'
            ),
            'text-white hover:text-slate-500': !isTabActive(`/chartManager/${user?.id}`, 'startsWith')
          }"
        >
          <IconChartAreaLineFilled :size="21" class="mt-[0.025rem]" />Charts
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
