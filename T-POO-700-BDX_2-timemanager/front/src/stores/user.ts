import Clock from '@/types/clock'
import User from '@/types/user'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

const useUser = defineStore('user', () => {
  const user: Ref<User | null> = ref(null)
  function setUser(newUser: User | null) {
    user.value = newUser
  }

  const clock: Ref<Clock | null> = ref(null)
  function setClock(newClock: Clock | null) {
    clock.value = newClock
  }

  return { user, setUser, clock, setClock }
})

export default useUser
