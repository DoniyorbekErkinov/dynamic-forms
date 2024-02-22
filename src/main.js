import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import DynamicComponent from './components/DynamicComponent/index.vue'

const pinia = createPinia()

const app = createApp(App)
    app.use(pinia)
    app.component('DynamicComponent', DynamicComponent)
    app.mount('#app')
