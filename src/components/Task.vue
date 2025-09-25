<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import { useTasksStore } from '@/stores/tasks.ts'

const tasksStore = useTasksStore()
const editableTaskId = ref<string | null>(null)

watchEffect(() => {
  console.log('1. tasksStore.searchedTasks ----->', tasksStore.searchedTasks)
})
</script>

<!--todo: Нельзя навесить v-for на template-->
<template>
  <li v-for="todo in tasksStore.filteredTasks" :key="todo.id">
    <template v-if="editableTaskId !== todo.id">
      <input type="checkbox" v-model="todo.done" />
      <label @dblclick="editableTaskId = todo.id">{{ todo.title }}</label>
    </template>

    <template v-else>
      <input type="text" v-model="todo.title" />
      <button @click="editableTaskId = null">Сохранить</button>
    </template>
  </li>
</template>

<style scoped>
li {
  list-style: none;
}

input {
  margin-right: 10px;
}

input:checked + label {
  text-decoration: line-through;
}
</style>
