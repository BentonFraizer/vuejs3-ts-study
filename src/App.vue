<script setup lang="ts">
import AddForm from '@/components/AddForm.vue'
import { ref, computed, watchEffect, watch, reactive } from 'vue'
import type { Task } from '@/helpers/types.ts'
// todo: 3.3. Как импортировать именно Task.vue? Есть конфликт с наименованием типа Task
import TaskComponent from './components/Task.vue'

const tasks = ref<Task[]>([
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

const searchValue = ref('')

const searchedTasks = computed<Task[]>(() =>
  tasks.value.filter((t) => t.title.toLowerCase().includes(searchValue.value.toLowerCase())),
)

const allTasksAmount = computed(() => tasks.value.length)
const undoneTasksAmount = computed(() => tasks.value.filter((t) => t.done === false).length)
const doneTasksAmount = computed(() => allTasksAmount.value - undoneTasksAmount.value)

watchEffect(() => {
  console.log('searchValue:', searchValue.value)
})

// const searchTasks = (searchValue: string) => {
//   searchedTasks.value = tasks.value.filter((t) => t.title.includes(searchValue))
// }

// watchEffect(() => {
//   console.log('tasks:', tasks.value)
//   searchTasks(searchValue.value)
// })

console.log('undoneTasksAmount: ', undoneTasksAmount)

// const updateTask = (id: string) => {
//   // tasks.value.forEach((task) => {
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
//   const taskToUpdate = tasks.value.find((task) => task.id === id)
//   if (!taskToUpdate) throw new Error('id not found')
//
//   taskToUpdate.done = !taskToUpdate.done
// }

const deleteCompletedTasks = () => {
  tasks.value = tasks.value.filter((t) => !t.done)
  // todo: вопрос. Почему не работает вариант без присваивания?
  // tasks.value.map((t) => !t.done)
}
</script>

<template>
  <main>
    <h2 style="margin-bottom: 15px">Список задач</h2>
    <AddForm v-model:tasks="tasks" />
    <ul>
      <TaskComponent v-model:tasks="searchedTasks" />
    </ul>
    <span>Осталось {{ undoneTasksAmount }} из {{ allTasksAmount }}</span>
    <button @click="deleteCompletedTasks" class="delete-finished">Удалить завершенные</button>

    <div class="search">
      <label for="search">Поиск по задачам: </label>
      <input id="search" type="search" v-model="searchValue" />
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 30px 40px 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  border: 1px solid slateblue;
  border-radius: 1rem;
}

.delete-finished {
  margin-bottom: 15px;
}

.search {
  display: flex;
}

.search label {
  margin-right: 10px;
}
</style>
