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

<script>
export default {
  props: {
    todo: Object
  },
  methods: {
    deleteTodo() {
      if (confirm('آیا از حذف اطمینان دارید؟')) {
        this.$emit('deleted', this.todo.id)
      }
    },
    changeStatus() {
      this.$emit('changeStatus', this.todo.id, !this.todo.isCompleted)
    }
  }
}
</script>

<style></style>
