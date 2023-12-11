<script setup lang="ts">
import { UserRole } from '@/types/user'
import { ref, watch } from 'vue'
import RequiredLabel from './RequiredLabel.vue'

// Props
interface RoleSelectorProps {
  input: UserRole
  defaultRole: UserRole
  required?: boolean
}
const props = withDefaults(defineProps<RoleSelectorProps>(), {
  required: false
})

// Emits
interface RoleSelectorEmits {
  (e: 'update:input', input: UserRole): void
}
const emit = defineEmits<RoleSelectorEmits>()

const defaultOptions = [
  {
    label: 'Employee',
    key: 'employee'
  },
  {
    label: 'Manager',
    key: 'manager'
  },
  {
    label: 'Administrator',
    key: 'administrator'
  }
]

const currentSelected = ref(defaultOptions.find((option) => option.key === props.defaultRole))

watch(currentSelected, (newSelected, _) => {
  if (newSelected === null) currentSelected.value = defaultOptions.find((option) => option.key === props.defaultRole)
  emit('update:input', currentSelected.value?.key as UserRole)
})

watch(
  () => props.input,
  (newInput) => {
    if (newInput === props.defaultRole)
      currentSelected.value = defaultOptions.find((option) => option.key === props.defaultRole)
  }
)
</script>

<template>
  <RequiredLabel v-if="required" label-name="Role" />
  <label class="text-lg md:text-2xl" v-else>Role</label>
  <v-select
    key="key"
    :options="defaultOptions.filter((option) => option.key !== currentSelected?.key)"
    v-model="currentSelected"
    class="dark-selector text-base md:text-lg"
  ></v-select>
</template>

<style>
.dark-selector .vs__search::placeholder,
.dark-selector .vs__dropdown-toggle,
.dark-selector .vs__dropdown-menu {
  background: white;
  color: black;
  border-color: black;
}

.dark-selector .vs__clear,
.dark-selector .vs__open-indicator {
  fill: black;
}
.dark-selector .vs__selected {
  color: black;
}
</style>
