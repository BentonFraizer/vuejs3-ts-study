<script setup lang="ts">
import AddForm from '@/components/AddForm.vue'
import { ref, computed, watchEffect } from 'vue'
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

const editableTaskId = ref<string | null>(null)

const allTasksAmount = computed(() => initialTasks.value.length)
const undoneTasksAmount = computed(() => initialTasks.value.filter((t) => t.done === false).length)
const doneTasksAmount = computed(() => allTasksAmount.value - undoneTasksAmount.value)

watchEffect(() => {
  console.log('doneTasksAmount:', doneTasksAmount.value)
})

console.log('undoneTasksAmount: ', undoneTasksAmount)

// const updateTask = (id: string) => {
//   // initialTasks.value.forEach((task) => {
//   //   return task.id === id
//   //       ?   {
//   //         ...task,
//   //         done: !task.done,
//   //       }
//   //       : task,
//   // }
//   // )
//
//   // todo: Очень важный момент. Если что-то может пойти не так, об этом нужно оповестить в консоли!
//   const taskToUpdate = initialTasks.value.find((task) => task.id === id)
//   if (!taskToUpdate) throw new Error('id not found')
//
//   taskToUpdate.done = !taskToUpdate.done
// }

const deleteCompletedTasks = () => {
  initialTasks.value = initialTasks.value.filter((t) => !t.done)
  // todo: вопрос. Почему не работает вариант без присваивания?
  // initialTasks.value.map((t) => !t.done)
}
</script>

<template>
  <main>
    <AddForm v-model:tasks="initialTasks" />
    <ul>
      <template v-for="todo in initialTasks" :key="todo.id">
        <li v-if="editableTaskId !== todo.id">
          <input type="checkbox" v-model="todo.done" />
          <label @dblclick="editableTaskId = todo.id">{{ todo.title }}</label>
        </li>
        <li v-if="editableTaskId === todo.id">
          <input type="text" v-model="todo.title" />
          <button @click="editableTaskId = null">Сохранить</button>
        </li>
      </template>
    </ul>
    <span>Осталось {{ undoneTasksAmount }} из {{ allTasksAmount }}</span>
    <button @click="deleteCompletedTasks">Удалить завершенные</button>
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
