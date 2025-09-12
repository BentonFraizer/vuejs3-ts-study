<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import type { Task } from '@/helpers/types.ts'

const tasks = defineModel<Task[]>('tasks', { required: true })

const editableTaskId = ref<string | null>(null)

// todo: 3.2. Как посмотреть значения внутри пропс? Чтобы увидеть именно массив, а не Proxy что-то там...
// или просто надо смотреть внутрь <target> ?
watchEffect(() => {
  console.log('tasks ----->', tasks.value)
})
</script>

<!--todo: 3.1. По ходу нельзя навесить v-for на template-->
<template>
  <li v-for="todo in tasks" :key="todo.id">
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
