<script setup lang="ts">
import { IconX } from '@tabler/icons-vue'

// Props
interface TMModalProps {
  visible: boolean
  width?: string
  height?: string
  ml?: string
  mt?: string
  screen?: string
}

withDefaults(defineProps<TMModalProps>(), {
  width: '95%',
  height: 'auto'
})

// Events
interface TMModalEmits {
  (e: 'update:visible', visible: boolean): void
}
const emit = defineEmits<TMModalEmits>()
</script>

<template>
  <div
    v-show="visible"
    @click.self="
      () => {
        emit('update:visible', false)
      }
    "
    class="absolute top-0 left-0 w-[99vw] h-[100vh] bg-black/[.5] animate-fadein"
  >
    <section
      class="w-desktop"
      :class="`absolute z-10 ml-[3%] mt-[10vh]  md:ml-[25%] bg-white  rounded-lg opacity-100 `"
      :style="{ width, height, marginLeft: ml, marginTop: mt }"
    >
      <div class="h-[30px]">
        <IconX
          class="absolute top-0 right-0 p-[0.4rem] m-[0.4rem] cursor-pointer hover:bg-slate-300 rounded-full"
          @click="
            () => {
              emit('update:visible', false)
            }
          "
          :size="30"
        />
      </div>
      <slot />
    </section>
  </div>
</template>

<style>
@media (min-width: 768px) {
  .w-desktop {
    width: 65% !important;
  }
}
</style>
