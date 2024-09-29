<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import SingleTodo from './components/SingleTodo.vue'
import AddTodo from './components/AddTodo.vue'
export default {
  name: 'App',
  components: {
    AppHeader,
    AddTodo,
    AppFooter,
    SingleTodo
  },
  data() {
    return {
      todos: [],
      dragging: -1,
      activeTab: 'all'
    }
  },
  computed: {
    getActiveTodos() {
      return this.todos.filter((t) => t.isCompleted === false).length
    },
    getTodo() {
      switch (this.activeTab) {
        case 'all':
          return this.todos
        case 'active':
          return this.todos.filter((t) => t.isCompleted === false)
        case 'completed':
          return this.todos.filter((t) => t.isCompleted === true)
        default:
          return this.todos
      }
    }
  },
  methods: {
    addTodo(title) {
      const id = Math.random().toString(16).slice(2)
      const todo = { id, title, isCompleted: false }
      this.todos.push(todo)
      this.$toast.success('وظیفه ساخته شد.')
    },
    deleteTodo(id) {
      const deletedTodo = this.todos.find((t) => t.id === id)
      this.todos = this.todos.filter((t) => t.id !== id)
      this.$toast.error(`وظیفه ${deletedTodo.title} حذف شد.`)
    },
    changeTodoStatus(id, newStatus) {
      let newTodos = [...this.todos]
      let selectedTodo = newTodos.find((t) => t.id === id)
      selectedTodo.isCompleted = newStatus
      this.todos = newTodos
    },
    deleteCompletedTodos() {
      if (confirm('ایا از حذف وظیفه های کامل شده مطمئن هستید؟')) {
        let allTodos = [...this.todos]
        this.todos = allTodos.filter((t) => t.isCompleted === false)
        this.$toast.success('عملیات با موفقیت انجام شد.')
      }
    },
    dragStart(index) {
      this.dragging = index
    },
    drop(index) {
      let newElement = this.todos.splice(this.dragging, 1)[0]
      this.todos.splice(index, 0, newElement)
    },
    changeTab(tab) {
      this.activeTab = tab
    }
  }
}
</script>

<template>
  <app-header></app-header>
  <main>
    <add-todo @addNewTodo="addTodo"></add-todo>
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
