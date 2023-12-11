<script setup lang="ts">
import { IconMenuDeep } from '@tabler/icons-vue'
import { Ref, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import NavBar from './components/ui-kit/NavBar.vue'
import UserPanel from './components/user-panel/UserPanel.vue'
import useApi from './composables/api'
import useMyself from './stores/myself'
import User from './types/user'
import ClockManager from './views/ClockManager.vue'
import useOfflineMode from './composables/offlineMode'
import { useToast } from 'vue-toastification'

const { getMe } = useApi()
const myselfStore = useMyself()
const router = useRouter()
const routerLoading = ref(true)
const gettingMyself = ref(true)

const menuOpened = ref(false)

const isOnline = ref(true)
const offlineMe: Ref<User | null> = ref(null)
const { sendStoredRequests } = useOfflineMode()
const toast = useToast()

router.isReady().then(() => {
  if (!myselfStore.myself && !router.currentRoute.value.fullPath.includes('sign')) {
    if (!localStorage.getItem('token')) {
      gettingMyself.value = false
      router.push('/signin')
    } else {
      getMe()
        .then((user) => myselfStore.setMyself(user))
        .catch(() => router.push('/signin'))
        .finally(() => (gettingMyself.value = false))
    }
  } else gettingMyself.value = false
  routerLoading.value = false
})

const updateOnlineStatus = (e: Event) => {
  isOnline.value = e.type === 'online'
  if (!isOnline.value) {
    const myselfLocalStorage = localStorage.getItem('myself')
    offlineMe.value = myselfLocalStorage ? (JSON.parse(myselfLocalStorage) as User) : null
    localStorage.removeItem('requests')
    localStorage.removeItem('myClock')
  } else {
    if (localStorage.getItem('requests')) {
      sendStoredRequests()
        .then(() => toast.success('All working times registered during offline mode have been sent.'))
        .catch(() =>
          toast.error(
            'An error occured while trying to send registered working times in offline mode... Please, contact your administrator.'
          )
        )
    }
  }
}

onBeforeMount(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})
onBeforeUnmount(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})
</script>

<template>
  <div v-if="!isOnline">
    <p v-if="offlineMe">Offline mode</p>
    <p v-else>You do not seem online...</p>
    <ClockManager v-if="offlineMe" :offline-me="offlineMe" />
  </div>
  <div v-else-if="!routerLoading && !gettingMyself">
    <div v-if="router.currentRoute.value.path.includes('sign') || !myselfStore.myself">
      <RouterView />
    </div>
    <div v-else class="flex flex-row w-screen h-screen">
      <IconMenuDeep
        :color="menuOpened ? 'white' : 'black'"
        :size="28"
        :class="`md:hidden absolute z-10 top-5 left-5 transition ease-in-out ${menuOpened ? '' : '-scale-x-100'}`"
        @click="menuOpened = !menuOpened"
      />
      <UserPanel :class="menuOpened ? 'translate-x-0 w-screen' : '-translate-x-[101%] md:translate-x-0'" />
      <div :class="menuOpened ? 'translate-x-full hidden' : 'flex flex-col-reverse md:flex-col md:w-full'">
        <header class="w-screen md:w-full md:block">
          <div class="wrapper">
            <NavBar />
          </div>
        </header>

        <RouterView />
      </div>
    </div>
  </div>
</template>
