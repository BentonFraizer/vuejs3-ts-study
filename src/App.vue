<script setup lang="ts">
import AddForm from '@/components/AddForm.vue'
import { ref, computed } from 'vue'
import type { Task } from '@/helpers/types.ts'

const initialTasks = ref<Task[]>([
  {
    id: '1',
    title: 'Прибухнуть',
    done: false,
  },
  {
    id: '2',
    title: 'Поиграть в доту',
    done: false,
  },
  {
    id: '3',
    title: 'Выспаться',
    done: false,
  },
])

const allTasksAmount = computed(() => initialTasks.value.length)
const undoneTasksAmount = computed(() => initialTasks.value.filter((t) => t.done === false).length)

const updateTask = (id: string) => {
  initialTasks.value = initialTasks.value.map((task) =>
    task.id === id
      ? {
          ...task,
          done: !task.done,
        }
      : task,
  )
}
</script>

<template>
  <main>
    <AddForm v-model:tasks="initialTasks" />
    <ul>
      <li v-for="todo in initialTasks" :key="todo.id">
        <input type="checkbox" :id="todo.id" @change="updateTask(todo.id)" />
        <label :for="todo.id">{{ todo.title }}</label>
      </li>
    </ul>
    <span>Осталось {{ undoneTasksAmount }} из {{ allTasksAmount }}</span>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

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
