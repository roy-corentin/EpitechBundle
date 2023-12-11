<script setup lang="ts">
import useApi from '@/composables/api'
import User from '@/types/user'
import { Ref, ref, watch } from 'vue'
import RequiredLabel from '../ui-kit/RequiredLabel.vue'
import useMyself from '@/stores/myself'

type ManagerOption = {
  label: string
  key: number
}

const { fetchUsers } = useApi()

// Props
interface ManagerSelectorProps {
  input: User | null
  defaultManager?: User
  required?: boolean
}
const props = withDefaults(defineProps<ManagerSelectorProps>(), {
  required: false
})

// Emits
interface ManagerSelectorEmits {
  (e: 'update:input', input: User | null): void
}
const emit = defineEmits<ManagerSelectorEmits>()

// Build options
const loading = ref(true)
const users: Ref<User[]> = ref([])
const options: Ref<ManagerOption[]> = ref([])
const selected: Ref<ManagerOption | null> = ref(null)

const doFetchUsers = () => {
  fetchUsers()
    .then((fetchedUsers) => {
      users.value = fetchedUsers
      users.value = users.value.filter((user) => user.role !== 'employee')
      options.value = users.value.map((user) => {
        return {
          label: user.username,
          key: user.id
        }
      })
      selected.value = props.defaultManager
        ? (options.value.find((option) => option.key === (props.defaultManager as User).id) as ManagerOption)
        : null
    })
    .finally(() => (loading.value = false))
}

const myself = useMyself().getMyself()
if (myself.role === 'administrator') doFetchUsers()
else {
  options.value = [
    {
      key: myself.id,
      label: myself.username
    }
  ]
  selected.value = options.value[0]
  loading.value = false
}

watch(selected, () => {
  if (myself.role === 'manager') {
    selected.value = options.value[0]
    return
  }
  if (selected.value === null && props.defaultManager !== undefined)
    selected.value = options.value.find((option) => option.key === (props.defaultManager as User).id) as ManagerOption
  emit('update:input', selected.value ? (users.value.find((user) => user.id === selected.value?.key) as User) : null)
})

watch(
  () => props.input,
  (newInput, _) => {
    if (newInput === null) selected.value = null
  }
)

watch(
  () => props.defaultManager,
  () => {
    if (users.value.length > 0) {
      selected.value = props.defaultManager
        ? (options.value.find((option) => option.key === (props.defaultManager as User).id) as ManagerOption)
        : null
    }
  }
)
</script>

<template>
  <RequiredLabel v-if="required" label-name="Manager" />
  <label class="text-lg md:text-2xl" v-else>Manager</label>
  <v-select
    key="key"
    :options="options.filter((option) => option.key !== selected?.key)"
    v-model="selected"
    @search:focus="() => doFetchUsers()"
    :class="`dark-selector manager-selector ${myself.role === 'manager' && 'managed'}`"
  ></v-select>
</template>

<style>
.manager-selector .vs__selected {
  color: #1e293b;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: large;
}

.managed .vs__open-indicator,
.managed .vs__clear {
  display: none;
}
</style>
