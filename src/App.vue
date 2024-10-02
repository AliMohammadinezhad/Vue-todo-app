<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import SingleTodo from './components/SingleTodo.vue'
import AddTodo from './components/AddTodo.vue'
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'

const todos = ref([])
const dragging = ref(-1)
const activeTab = ref('all')

const getActiveTodos = computed(() => {
  return todos.value.filter((t) => t.isCompleted === false).length
})

const getTodo = computed(() => {
  switch (activeTab.value) {
    case 'all':
      return todos.value
    case 'active':
      return todos.value.filter((t) => t.isCompleted === false)
    case 'completed':
      return todos.value.filter((t) => t.isCompleted === true)
    default:
      return todos.value
  }
})

function addTodo(title) {
  const id = Math.random().toString(16).slice(2)
  const todo = { id, title, isCompleted: false }
  if (todo.title != '') {
    todos.value.push(todo)
    toast.success('وظیفه ساخته شد.')
  }
  toast.error('لطفا متن وظیفه را وارد کنید.')
}
function deleteTodo(id) {
  const deletedTodo = todos.value.find((t) => t.id === id)
  todos.value = todos.value.filter((t) => t.id !== id)
  toast.error(`وظیفه ${deletedTodo.title} حذف شد.`)
}
function changeTodoStatus(id, newStatus) {
  let newTodos = [...todos.value]
  let selectedTodo = newTodos.find((t) => t.id === id)
  selectedTodo.isCompleted = newStatus
  todos.value = newTodos
}
function deleteCompletedTodos() {
  if (confirm('ایا از حذف وظیفه های کامل شده مطمئن هستید؟')) {
    let allTodos = [...todos.value]
    todos.value = allTodos.filter((t) => t.isCompleted === false)
    toast.success('عملیات با موفقیت انجام شد.')
  }
}
function dragStart(index) {
  dragging.value = index
}
function drop(index) {
  let newElement = todos.value.splice(dragging.value, 1)[0]
  todos.value.splice(index, 0, newElement)
}
function changeTab(tab) {
  activeTab.value = tab
}
</script>

<template>
  <app-header></app-header>
  <main>
    <AddTodo @addNewTodo="addTodo"></AddTodo>
    <ul class="todos">
      <single-todo
        v-for="(item, i) in getTodo"
        :key="item.id"
        :todo="item"
        @dragstart="dragStart(i)"
        @deleted="deleteTodo"
        @changeStatus="changeTodoStatus"
        @dragover.prevent
        @drop="drop(i)"
      ></single-todo>
    </ul>
    <div class="card stat">
      <p class="corner">
        <span id="items-left">{{ getActiveTodos }}</span> مورد باقی مانده
      </p>
      <div class="filter">
        <button id="all" :class="{ on: activeTab == 'all' }" @click="changeTab('all')">همه</button>
        <button id="active" :class="{ on: activeTab == 'active' }" @click="changeTab('active')">
          فعال
        </button>
        <button
          id="completed"
          :class="{ on: activeTab == 'completed' }"
          @click="changeTab('completed')"
        >
          تکمیل
        </button>
      </div>
      <div class="corner">
        <button id="clear-completed" @click="deleteCompletedTodos">حذف تکمیل شده ها</button>
      </div>
    </div>
  </main>
  <app-footer></app-footer>
</template>

<style scoped></style>
