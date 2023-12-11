import Clock from '@/types/clock'
import User from '@/types/user'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

const useMyself = defineStore('myself', () => {
  const myself: Ref<User | null> = ref(null)

  function getMyself(): User {
    return myself.value as User
  }

  function setMyself(newMe: User | null, token?: string | null) {
    myself.value = newMe
    if (token) localStorage.setItem('token', token)
    else if (token === null) localStorage.removeItem('token')
    if (newMe) localStorage.setItem('myself', JSON.stringify(newMe))
    else if (newMe === null) localStorage.removeItem('myself')
  }

  const myClock: Ref<Clock | null> = ref(null)
  function setMyClock(newClock: Clock | null) {
    myClock.value = newClock
    if (newClock) localStorage.setItem('myClock', JSON.stringify(newClock))
    else if (newClock === null) localStorage.removeItem('myClock')
  }

  return { myself, getMyself, setMyself, myClock, setMyClock }
})

export default useMyself
