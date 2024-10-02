<template>
  <header class="card">
    <h1>لیست وظایف</h1>

    <button id="theme-switcher" @click="changeTheme">
      <img v-if="defaultTheme == 'dark'" src="./../assets/icon-sun.svg" alt="Change color theme" />
      <img v-else src="./../assets/icon-moon.svg" alt="Change color theme" />
    </button>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const defaultTheme = ref('dark')

function changeTheme() {
  if (defaultTheme.value == 'dark') {
    defaultTheme.value = 'light'
    document.querySelector('body').classList.add('light')
  } else {
    defaultTheme.value = 'dark'
    document.querySelector('body').classList.remove('light')
  }
}
</script>

<style></style>
