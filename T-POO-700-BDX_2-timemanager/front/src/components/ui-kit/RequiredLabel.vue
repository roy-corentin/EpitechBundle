<script setup lang="ts">
import RequiredFieldAsterisk from './RequiredFieldAsterisk.vue'

// Props
interface RequiredLabelProps {
  labelName: string
}
const { labelName } = defineProps<RequiredLabelProps>()

const capitalizedLabel = labelName[0].toUpperCase() + labelName.substring(1)
</script>

<template>
  <label v-bind="$attrs" class="flex flex-row flex-nowrap">
    {{ capitalizedLabel }}
    <RequiredFieldAsterisk />
  </label>
</template>
