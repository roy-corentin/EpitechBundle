<script setup lang="ts">
import TMModal from '@/components/ui-kit/TMModal.vue'
import { ref } from 'vue'

// Props
interface ConfirmDeleteButtonProps {
  title: string
  details?: string
  deleteFnc: () => void
  closeModalOnConfirm?: boolean
}
withDefaults(defineProps<ConfirmDeleteButtonProps>(), {
  closeModalOnConfirm: true
})

const modalVisible = ref(false)
</script>

<template>
  <button
    v-bind="$attrs"
    class="p-[0.75rem] px-[1.2rem] bg-red-500 text-slate-50 font-bold rounded-lg disabled:bg-red-300 hover:bg-red-600"
    @click="() => (modalVisible = true)"
  >
    Delete
  </button>
  <TMModal v-model:visible="modalVisible" mt="25vh">
    <h2 class="w-[92%] ml-[4%] mt-[1.5rem] mb-[3rem] text-center text-2xl md:text-4xl">
      {{ title }}
    </h2>
    <p v-if="details" class="text-lg md:text-2xl text-center -mt-[1.5rem] my-[3rem]">
      {{ details }}
    </p>
    <div class="flex flex-col md:flex-row flew-nowrap justify-center gap-4 md:gap-16 text-xl mt-4">
      <button
        class="p-[1rem] px-[3rem] bg-red-500 text-slate-50 font-bold rounded-lg hover:bg-red-600"
        @click="
          () => {
            deleteFnc()
            modalVisible = false
          }
        "
      >
        Confirm
      </button>
      <button
        class="p-[1rem] px-[3rem] bg-slate-400 text-slate-50 font-bold rounded-lg hover:bg-slate-500"
        @click="modalVisible = false"
      >
        Cancel
      </button>
    </div>
  </TMModal>
</template>
