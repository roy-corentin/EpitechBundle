<script setup lang="ts">
import ConfirmDeleteButton from '@/components/ui-kit/ConfirmDeleteButton.vue'
import useApi from '@/composables/api'
import useUser from '@/stores/user'
import { useToast } from 'vue-toastification'
import User from '@/types/user'

// Props
interface DeleteUserProps {
  currentUser: User | null
}
const props = defineProps<DeleteUserProps>()

const { deleteUser } = useApi()
const { setUser } = useUser()
const toast = useToast()

const onDeleteConfirmed = () => {
  const user = props.currentUser as User
  deleteUser(user.id)
    .then(() => {
      toast.success(`User ${user.username} (${user.email}) deleted`)
      setUser(null)
    })
}
</script>

<template>
  <ConfirmDeleteButton
    v-if="currentUser !== null"
    :title="`Are you sure you want to delete ${currentUser.username} (${currentUser.email})?`"
    :delete-fnc="onDeleteConfirmed"
  />
  <button v-else class="p-[0.75rem] px-[1.2rem] bg-gray-500 text-slate-50 font-bold rounded-lg" disabled>Delete</button>
</template>
