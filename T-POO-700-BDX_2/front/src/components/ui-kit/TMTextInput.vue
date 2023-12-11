<script setup lang="ts">
import { IconAlertCircleFilled } from '@tabler/icons-vue'
import { ref, watch } from 'vue'
import RequiredLabel from './RequiredLabel.vue'
import { IconArrowBackUp } from '@tabler/icons-vue'

// Props
interface TMTextInputProps {
  input: string | null
  name: string
  label: string
  required?: boolean
  placeholder?: string
  defaultInput?: string
  errorFnc?: () => boolean
}
const props = withDefaults(defineProps<TMTextInputProps>(), {
  required: false
})

// Emits
interface TMTextInutEmits {
  (e: 'update:input', input: string | null): void
}
defineEmits<TMTextInutEmits>()

// Input
const currentInput = ref(props.input)

// Errors management
const inError = ref(false)

watch(
  () => props.input,
  (newInput) => {
    if (newInput === props.defaultInput) currentInput.value = newInput
  }
)
</script>

<template>
  <div class="flex flex-col flex-nowrap">
    <RequiredLabel class="text-lg md:text-2xl" v-if="required" :for="name" :label-name="label" />
    <label v-else :for="name">{{ label }}</label>
    <div
      class="w-full flex flex-row items-center mt-[0.5rem] mb-[1rem] border-b-2 border-solid"
      :style="{ borderColor: inError ? '#dc2626' : '', color: inError ? '#dc2626' : '' }"
    >
      <input
        v-bind="$attrs"
        class="w-full border-0 text-base md:text-lg"
        :required="required"
        :placeholder="placeholder"
        :id="name"
        :name="name"
        v-model="currentInput"
        @input="
          () => {
            $emit('update:input', currentInput)
            if (errorFnc) inError = !errorFnc()
          }
        "
      />
      <IconArrowBackUp
        v-if="defaultInput && defaultInput !== currentInput"
        :size="20"
        color="black"
        class="z-10 cursor-pointer"
        :style="{ marginLeft: inError ? '-3.5rem' : '-1.5rem' }"
        @click="
          () => {
            currentInput = defaultInput as string
            inError = false
          }
        "
      />
      <IconAlertCircleFilled v-if="inError" color="#dc2626" :size="22" class="mx-[0.5rem]" />
    </div>
  </div>
</template>
