<script setup lang="ts">
import { IconAlertCircleFilled, IconEye, IconEyeClosed } from '@tabler/icons-vue'
import { ref, watch } from 'vue'
import RequiredLabel from './RequiredLabel.vue'

// Props
interface TMPasswordInputProps {
  input: string | null
  name: string
  errorFnc: () => boolean
  required?: boolean
}
const props = withDefaults(defineProps<TMPasswordInputProps>(), {
  required: false
})

// Emits
interface TMTextInutEmits {
  (e: 'update:input', input: string | null): void
}

defineEmits<TMTextInutEmits>()

// Input
const currentInput = ref(props.input)
const passwordVisible = ref(false)

// Errors management
const inError = ref(false)

watch(props, (newProps, _) => {
  currentInput.value = newProps.input
})
</script>

<template>
  <div class="flex flex-col flex-nowrap">
    <RequiredLabel v-if="required" :for="name" label-name="Password" />
    <label class="text-lg md:text-2xl" v-else :for="name">Password</label>
    <div
      class="w-full flex flex-row items-center mt-[0.5rem] mb-[1rem] border-b-2 border-solid"
      :style="{ borderColor: inError ? '#dc2626' : '', color: inError ? '#dc2626' : '' }"
    >
      <input
        v-bind="$attrs"
        class="w-full border-0 text-base md:text-lg"
        :type="passwordVisible ? 'text' : 'password'"
        :required="required"
        placeholder="mY$uPeRp@$$W0rD"
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
      <div class="cursor-pointer mx-[0.5rem]">
        <IconEyeClosed v-if="passwordVisible" @click="passwordVisible = !passwordVisible" />
        <IconEye v-else @click="passwordVisible = !passwordVisible" />
      </div>
      <IconAlertCircleFilled v-if="inError" color="#dc2626" :size="22" />
    </div>
  </div>
</template>
