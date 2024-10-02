import { createApp } from 'vue'
import App from './App.vue'
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const options = {
  position: "top-right",
  rtl: true
};


createApp(App)
.use(Vue3Toastify, options)
.mount('#app')
