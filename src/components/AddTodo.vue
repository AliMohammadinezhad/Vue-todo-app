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

<script>
export default {
  data() {
    return {
      todoTitle: ''
    }
  },
  methods: {
    addTodo() {
      this.$emit('addNewTodo', this.todoTitle), (this.todoTitle = '')
    }
  }
}
</script>

<style scoped></style>
