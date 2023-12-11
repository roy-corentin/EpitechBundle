<script setup lang="ts">
import useMyself from '@/stores/myself'
import useUser from '@/stores/user'
import Team from '@/types/team'
import User from '@/types/user'
import { Ref, ref, watch } from 'vue'
import TMLoader from '../ui-kit/TMLoader.vue'
import AppLogo from './AppLogo.vue'
import CreateTeam from './CreateTeam.vue'
import CreateUser from './CreateUser.vue'
import DeleteTeam from './DeleteTeam.vue'
import DeleteUser from './DeleteUser.vue'
import TeamSelector from './TeamSelector.vue'
import UpdateTeam from './UpdateTeam.vue'
import UpdateUser from './UpdateUser.vue'
import UserInfo from './UserInfo.vue'
import UserSelector from './UserSelector.vue'

const myselfStore = useMyself()
const myself = ref(myselfStore.getMyself())

const userStore = useUser()
const user = ref(userStore.user)

const team: Ref<Team | null> = ref(null)
const newTeam: Ref<Team | null | undefined> = ref(undefined)

watch(
  () => userStore.user,
  (newUser, _) => {
    user.value = newUser
  }
)

watch(
  () => myselfStore.myself,
  (newMyself, _) => {
    myself.value = newMyself as User
  }
)
</script>

<template>
  <section
    class="absolute md:sticky top-0 md:w-1/6 h-[100vh] bg-gradient-to-t from-slate-500 to-slate-800 flex flex-col justify-between transition ease-in-out"
  >
    <div>
      <AppLogo />
      <div v-if="myself.role === 'administrator' || myself.role === 'manager'" class="w-[90%] mx-4 mt-[2rem]">
        <Suspense>
          <template #default>
            <TeamSelector v-model:input="team" :new-team="newTeam" />
          </template>
          <template #fallback>
            <TMLoader />
          </template>
        </Suspense>
        <div class="mt-2 flex flex-col xl:flex-row justify-between">
          <CreateTeam v-if="myself.role === 'administrator'" />
          <UpdateTeam :current-team="team" :set-new-team="(updatedTeam) => (newTeam = updatedTeam)" />
          <DeleteTeam
            v-if="myself.role === 'administrator'"
            :current-team="team"
            :set-new-team="(updatedTeam) => (newTeam = updatedTeam)"
          />
        </div>
      </div>
      <div v-if="myself.role === 'administrator' || myself.role === 'manager'" class="w-[90%] mx-4 mt-[2rem]">
        <Suspense>
          <template #default>
            <UserSelector />
          </template>
          <template #fallback>
            <TMLoader />
          </template>
        </Suspense>
        <div v-if="myself.role === 'administrator'" class="mt-2 flex flex-col xl:flex-row justify-between">
          <CreateUser />
          <UpdateUser :current-user="user" />
          <DeleteUser :current-user="user" />
        </div>
      </div>
    </div>
    <div v-if="myself" class="mb-4 ml-4">
      <UserInfo :user="myself" />
    </div>
  </section>
</template>
