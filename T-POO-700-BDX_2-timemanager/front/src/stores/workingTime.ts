import WorkingTime from '@/types/workingTime'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useWorkingTime = defineStore('workingTime', () => {
  const workingTime = ref<WorkingTime | null>(null)
  function setWorkingTime(newWorkingTime: WorkingTime | null) {
    workingTime.value = newWorkingTime
  }

  return { workingTime, setWorkingTime }
})

export default useWorkingTime
