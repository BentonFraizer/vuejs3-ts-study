<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { ref, watchEffect } from 'vue'
import type { Task } from '@/helpers/types.ts'
import { useTasksStore } from '@/stores/tasks.ts'

const tasksStore = useTasksStore()

const newTaskTitle = ref('')
const { addTask } = tasksStore

// Пример просмотра данных в консоли
// watchEffect(() => {
//   console.log('text:', text.value)
// })

const handleAddTask = () => {
  addTask(newTaskTitle.value)
  newTaskTitle.value = ''
}
</script>

<template>
  <form @submit.prevent="handleAddTask">
    <input v-model="newTaskTitle" />
    <button type="submit">Создать задачу</button>
  </form>
</template>

<style scoped>
form {
  margin-bottom: 15px;
}

input {
  margin-right: 10px;
}
</style>
