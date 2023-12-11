<script setup lang="ts">
import useApi from '@/composables/api'
import User from '@/types/user'
import { IconX } from '@tabler/icons-vue'
import { Ref, ref, watch } from 'vue'
import RequiredLabel from '../ui-kit/RequiredLabel.vue'

type MemberOption = {
  label: string
  key: number
}

const { fetchUsers } = useApi()

// Props
interface MembersSelectorProps {
  input: User[]
  currentManager: User | null
  defaultMembers?: User[]
  required?: boolean
}
const props = withDefaults(defineProps<MembersSelectorProps>(), {
  required: false
})

// Emits
interface MembersSelectorEmits {
  (e: 'update:input', input: User[]): void
}
const emit = defineEmits<MembersSelectorEmits>()

// Build options
const loading = ref(true)
const users: Ref<User[]> = ref([])
const options: Ref<MemberOption[]> = ref([])
const selected: Ref<MemberOption[]> = ref([])
fetchUsers()
  .then((fetchedUsers) => {
    users.value = fetchedUsers
    options.value = users.value.map((user) => {
      return {
        label: user.username,
        key: user.id
      }
    })
    if (props.defaultMembers) setSelectedAsDefaultMembers()
    else selected.value = []
  })
  .finally(() => (loading.value = false))

const setSelectedAsDefaultMembers = () => {
  selected.value = options.value.filter(
    (option) => (props.defaultMembers as User[]).find((user) => user.id === option.key) !== undefined
  )
}

const getFilteredOptions = (): MemberOption[] => {
  const finalOptions: MemberOption[] = []
  for (const option of options.value) {
    if (props.currentManager && option.key === props.currentManager.id) continue
    if (selected.value.find((selectedOption) => selectedOption === option)) continue
    finalOptions.push(option)
  }
  return finalOptions
}

const sameMembersAsDefaultSelected = (): boolean => {
  if (props.defaultMembers && selected.value.length !== props.defaultMembers.length) return false
  for (const option of selected.value) {
    if ((props.defaultMembers as User[]).find((user) => user.id === option.key) === undefined) return false
  }
  return true
}

const emitSelection = (newSelected: MemberOption[] | null) => {
  if (newSelected === null) return []
  const selectedUsers: User[] = []
  for (const option of newSelected) selectedUsers.push(users.value.find((user) => user.id === option.key) as User)
  selected.value = newSelected as MemberOption[]
  emit('update:input', selectedUsers)
}

const emitDeselection = (deselected: MemberOption) => {
  const selectedUsers: User[] = []
  for (const option of selected.value) {
    if (option !== deselected) selectedUsers.push(users.value.find((user) => user.id === option.key) as User)
  }
  selected.value = selected.value.filter((selected) => selected !== deselected)
  emit('update:input', selectedUsers)
}

watch(
  () => props.currentManager,
  (newManager, _) => {
    if (newManager !== null) selected.value = selected.value.filter((option) => option.key !== newManager.id)
  }
)

watch(
  () => props.input,
  (newInput, _) => {
    if (newInput.length === 0) selected.value = []
  }
)

watch(
  () => props.defaultMembers,
  () => {
    if (users.value.length > 0) {
      if (props.defaultMembers) setSelectedAsDefaultMembers()
      else selected.value = []
    }
  }
)
</script>

<template>
  <RequiredLabel v-if="required" label-name="Manager" />
  <label class="text-lg md:text-2xl" v-else>Members</label>
  <div class="relative">
    <v-select
      multiple
      key="key"
      :options="getFilteredOptions()"
      :modelValue="selected"
      @option:selected="emitSelection"
      @option:deselected="emitDeselection"
      class="dark-selector members-selector"
      :loading="loading"
    ></v-select>
    <IconX
      v-if="defaultMembers !== undefined && !sameMembersAsDefaultSelected()"
      :size="15"
      stroke-width="4"
      color="black"
      class="absolute right-[1.7rem] top-[0.85rem] z-10 cursor-pointer"
      :style="selected.length === 0 ? { top: '0.67rem' } : {}"
      @click="setSelectedAsDefaultMembers()"
    />
  </div>
</template>

<style>
.members-selector .vs__search::placeholder,
.members-selector .vs__dropdown-toggle,
.members-selector .vs__dropdown-menu {
  background: whitesmoke;
  border-color: black;
}

.members-selector .vs__clear,
.members-selector .vs__open-indicator {
  fill: black;
}
.members-selector .vs__selected {
  color: whitesmoke !important;
  background-color: #1e293b;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: large;
}
</style>
