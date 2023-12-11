<script setup lang="ts">
interface PaginateProps {
  page: number
  nbPage: number
  paginateCallback: (pageNum: number) => void
}
const { page, nbPage, paginateCallback } = defineProps<PaginateProps>()
</script>
<template>
  <div class="flex items-center w-1/2 justify-around">
    <button
      :disabled="page <= 1"
      @click="paginateCallback(page - 1)"
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-solid border-blue-500 hover:border-transparent rounded disabled:text-slate-700 disabled:border-slate-700 disabled:bg-slate-200"
    >
      &lt
    </button>

    <p class="bg-transparent text-blue-700 font-semibold py-2 px-4 border border-solid border-blue-500 rounded">
      {{ page }}
    </p>
    <button
      :disabled="page >= nbPage"
      @click="paginateCallback(page + 1)"
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-solid border-blue-500 hover:border-transparent rounded disabled:text-slate-700 disabled:border-slate-700 disabled:bg-slate-200"
    >
      >
    </button>
  </div>
</template>
