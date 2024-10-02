<template>
  <li class="card" draggable="true">
    <div class="cb-container">
      <input
        type="checkbox"
        @click="changeStatus"
        :checked="todo.isCompleted ? true : false"
        class="cb-input"
      />
      <span class="check"></span>
    </div>
    <p class="item">
      <del v-if="todo.isCompleted === true">{{ todo.title }}</del>
      <span v-else>{{ todo.title }}</span>
    </p>
    <button class="clear" @click="deleteTodo">
      <img src="../assets/icon-cross.svg" alt="Clear it" />
    </button>
  </li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  todo: Object,
})

const emit = defineEmits(['deleted', 'changeStatus'])

function deleteTodo() {
  if (confirm('آیا از حذف اطمینان دارید؟')) {
    emit('deleted', props.todo.id)
  }
}
function changeStatus() {
  emit('changeStatus', props.todo.id, !props.todo.isCompleted)
}
</script>
