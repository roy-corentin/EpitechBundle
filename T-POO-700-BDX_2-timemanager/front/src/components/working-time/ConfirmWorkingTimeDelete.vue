<script setup lang="ts">
import useApi from '@/composables/api'
import router from '@/router'
import WorkingTime from '@/types/workingTime'
import { useToast } from 'vue-toastification'

// Props
interface ConfirmWorkingTimeDeleteProps {
  visible: boolean
  workingTime: WorkingTime
  userId: number
}
const { workingTime, userId } = defineProps<ConfirmWorkingTimeDeleteProps>()

// Emits
interface ConfirmWorkingTimeDeleteEmits {
  (e: 'update:visible', visible: boolean): void
}
defineEmits<ConfirmWorkingTimeDeleteEmits>()

const { deleteWorkingTime } = useApi()
const toast = useToast()

const onDeleteConfirmed = () => {
  deleteWorkingTime(workingTime.id).then(() => {
    toast.success('Working time successfully deleted')
    router.push(`/workingTimes/${userId}`)
  })
}
</script>

<template>
  <div v-show="visible">
    <h2 class="w-[90%] ml-[5%] mt-[1.5rem] mb-[0.75rem] text-center">Do you confirm this working time deletion?</h2>
    <p class="text-2xl text-center mb-[5rem]">{{ workingTime.startDisplay }} - {{ workingTime.endDisplay }}</p>
    <div class="flex flex-row flew-nowrap justify-center gap-16 text-xl mt-4">
      <button
        class="p-[1rem] px-[3rem] bg-red-500 text-slate-50 font-bold rounded-lg hover:bg-red-600"
        @click="onDeleteConfirmed"
      >
        Confirm
      </button>
      <button
        class="p-[1rem] px-[3rem] bg-slate-400 text-slate-50 font-bold rounded-lg hover:bg-slate-500"
        @click="$emit('update:visible', false)"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
