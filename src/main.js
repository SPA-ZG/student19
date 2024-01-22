import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

// Dodajemo Pinia za upravljanje stanjem
app.use(createPinia())

// Dodajemo Vue Router
app.use(router)

// Postavljamo Axios za HTTP zahteve
app.config.globalProperties.$axios = axios

app.mount('#app')
