<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { ref, watchEffect } from 'vue'
import type { PropType } from 'vue'
import type { Task } from '@/helpers/types.ts'

const props = defineProps({
  tasks: { type: Array as PropType<Task[]>, required: true },
})
const emit = defineEmits<{
  (e: 'update:tasks', value: Task[]): void
}>()

const text = ref('')

function addTask() {
  if (!text.value) return
  const newTask: Task = { id: uuidv4(), title: text.value, done: false }
  emit('update:tasks', [...props.tasks, newTask]) // отправляем новый массив родителю
  text.value = ''
}

watchEffect(() => {
  console.log('text:', text.value)
})
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
