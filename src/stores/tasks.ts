import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '@/helpers/types.ts'
import { v4 as uuidv4 } from 'uuid'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const searchValue = ref('')
  const statusFilter = ref('all')
  const allTasksAmount = computed(() => tasks.value.length)
  const undoneTasksAmount = computed(() => tasks.value.filter((t) => t.done === false).length)
  const doneTasksAmount = computed(() => allTasksAmount.value - undoneTasksAmount.value)

  const searchedTasks = computed<Task[]>(() =>
    tasks.value.filter((t) => t.title.toLowerCase().includes(searchValue.value.toLowerCase())),
  )

  const filteredTasks = computed<Task[]>(() => {
    if (statusFilter.value !== 'all') {
      if (statusFilter.value === 'done') {
        return [...searchedTasks.value.filter((t) => t.done)]
      } else if (statusFilter.value === 'undone') {
        return [...searchedTasks.value.filter((t) => !t.done)]
      }
    }
    return [...searchedTasks.value]
  })

  const deleteCompletedTasks = () => {
    tasks.value = tasks.value.filter((t) => !t.done)
    // todo: вопрос. Почему не работает вариант без присваивания?
    // tasks.value.map((t) => !t.done)
  }

  function addTask(newTaskTitle: string) {
    if (!newTaskTitle) return
    const newTask: Task = { id: uuidv4(), title: newTaskTitle, done: false }
    // tasks.value = [newTask, ...tasks.value]
    tasks.value.unshift(newTask)
  }

  return {
    tasks,
    searchValue,
    statusFilter,
    filteredTasks,
    allTasksAmount,
    searchedTasks,
    undoneTasksAmount,
    doneTasksAmount,
    deleteCompletedTasks,
    addTask,
  }
})
