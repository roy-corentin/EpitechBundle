<script setup lang="ts">
import router from '@/router';
import useMyself from '@/stores/myself'
import useUser from '@/stores/user'
import { IconDoorExit } from '@tabler/icons-vue'

const { setMyself, setMyClock } = useMyself()
const { setUser, setClock } = useUser()

const onDisconnect = () => {
  router.push('/signin')
  setMyself(null, null)
  setMyClock(null)
  setUser(null)
  setClock(null)
}
</script>

<template>
  <button
    @click="onDisconnect"
    class="p-[0.75rem] bg-slate-100 hover:bg-slate-300 font-bold text-slate-700 rounded-lg flex flex-row gap-2"
  >
    <IconDoorExit />
    Sign out
  </button>
</template>
