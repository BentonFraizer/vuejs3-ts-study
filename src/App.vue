<script setup lang="ts">
import AddForm from '@/components/AddForm.vue'
import { storeToRefs } from 'pinia'
// todo: 3.3. Как импортировать именно Task.vue? Есть конфликт с наименованием типа Task
import TaskComponent from './components/Task.vue'
import { useTasksStore } from '@/stores/tasks.ts'

const tasksStore = useTasksStore()

const { searchValue, statusFilter, allTasksAmount, undoneTasksAmount } = storeToRefs(tasksStore)

const { deleteCompletedTasks } = tasksStore

tasksStore.tasks = [
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
  {
    id: '4',
    title: 'Выполненная задача',
    done: true,
  },
  {
    id: '5',
    title: 'Готовая задача',
    done: true,
  },
]
</script>

<template>
  <main>
    <h2 style="margin-bottom: 15px">Список задач</h2>
    <AddForm />
    <ul>
      <TaskComponent />
    </ul>
    <span>Осталось {{ undoneTasksAmount }} из {{ allTasksAmount }}</span>
    <button @click="deleteCompletedTasks" class="delete-finished">Удалить завершенные</button>

    <div class="search">
      <label for="search">Поиск по задачам: </label>
      <input id="search" type="search" v-model="searchValue" />
    </div>
    <fieldset>
      <input type="radio" id="all" name="status" value="all" v-model="statusFilter" />
      <label for="all">all</label><br />

      <input type="radio" id="done" name="status" value="done" v-model="statusFilter" />
      <label for="done">done</label><br />

      <input type="radio" id="undone" name="status" value="undone" v-model="statusFilter" />
      <label for="undone">undone</label>
    </fieldset>
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

fieldset > input {
  margin-right: 10px;
}
</style>
