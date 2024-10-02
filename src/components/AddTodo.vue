<template>
  <div class="card add">
    <div class="cb-container">
      <button id="add-btn" @click="addTodo">+</button>
    </div>
    <div class="txt-container">
      <label for="addt">افزودن </label>
      <input
        v-model="todoTitle"
        @keyup.enter="addTodo"
        type="text"
        class="txt-input"
        placeholder="افزودن وظیفه جدید..."
        spellcheck="false"
        autocomplete="off"
        id="addt"
        dir="rtl"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const todoTitle = ref('')
const emits = defineEmits(['addNewTodo'])

function addTodo() {
  emits('addNewTodo', todoTitle.value)
  todoTitle.value = ''
}
</script>

<style scoped></style>
