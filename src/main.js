import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index';
import eventBus from './eventBus'; 


import { createPinia } from "pinia";
const app = createApp(App);

// Hacer el bus de eventos accesible en toda la aplicación
app.config.globalProperties.$bus = eventBus;
app.use(createPinia());

app.use(router).mount('#app');
