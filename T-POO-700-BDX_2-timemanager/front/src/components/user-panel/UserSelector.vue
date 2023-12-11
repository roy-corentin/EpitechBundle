<script setup lang="ts">
import useApi from '@/composables/api'
import useMyself from '@/stores/myself'
import useUser from '@/stores/user'
import type User from '@/types/user'
import { Ref, computed, ref, watch } from 'vue'

// Types
type UserOption = {
  key: number
  label: string
}
type Loading = (status: boolean) => void

// Stores & Composables
const myselfStore = useMyself()
const userStore = useUser()
const user = ref(userStore.user)
const { setUser } = useUser()
const { fetchUsers } = useApi()

// Users fetching
const users: Ref<User[] | null> = ref([])

// Options
const options = computed(() => {
  const options: UserOption[] = []
  const myself = myselfStore.getMyself()
  for (const user of users.value as User[]) {
    if (user.id !== myself.id && (myself.role === 'administrator' || isUserInMyTeam(myself, user))) {
      options.push({
        key: user.id,
        label: user.username
      })
    }
  }
  return options
})
const selected = ref<UserOption | null>(null)
const isLoading = ref(false)

function isUserInMyTeam(me: User, user: User): boolean {
  for (const teamId of user.team_ids) {
    if (me.managed_team_ids.find((managedTeamId) => managedTeamId === teamId) !== null) return true
  }
  return false
}

// Do selection
watch(selected, (newSelected, _previousSelected) => {
  if (newSelected === null) setUser(null)
  else setUser((users.value as User[]).find((user) => user.id === newSelected.key) as User)
})

// Assure if user is changed elswhere that user selected is updated
watch(
  () => userStore.user,
  (newUser, _) => {
    user.value = newUser
    if (newUser === null) selected.value = null
    else {
      users.value = [newUser]
      selected.value = {
        key: newUser.id,
        label: newUser.username
      }
    }
  }
)
</script>

<template>
  <label class="text-white text-lg">Select employee</label>
  <v-select
    v-if="users"
    key="key"
    :options="options"
    v-model="selected"
    :loading="isLoading"
    @search:focus="
      () => {
        isLoading = true
        fetchUsers().then((fetchedUsers) => {
          users = fetchedUsers
          isLoading = false
        })
      }
    "
    @search="
      (search: string, loading: Loading) => {
        loading(true)
        fetchUsers({ username: search }).then((fetchedUsers) => {
          users = fetchedUsers
          loading(false)
        })
      }
    "
  ></v-select>
</template>

<style>
:root {
  --vs-border-color: white;
  --vs-border-width: 2px;
  --vs-controls-color: white;
  --vs-transition-timing-function: cubic-bezier(1, -0.115, 0.975, 0.855);
  --vs-transition-duration: 150ms;
  --vs-selected-color: white;
  --vs-search-input-color: white;
  .v-select {
    font-family: 'Raleway', sans-serif;
  }
}
</style>
