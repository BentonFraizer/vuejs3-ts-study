<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { ref, watchEffect } from 'vue'
import type { Task } from '@/helpers/types.ts'

const tasks = defineModel<Task[]>('tasks', { required: true })
const text = ref('')

function addTask() {
  if (!text.value) return
  const newTask: Task = { id: uuidv4(), title: text.value, done: false }
  // tasks.value = [newTask, ...tasks.value]
  tasks.value.unshift(newTask)
  text.value = ''
}

// Пример просмотра данных в консоли
// watchEffect(() => {
//   console.log('text:', text.value)
// })
</script>

<template>
  <form @submit.prevent="addTask">
    <input v-model="text" />
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
