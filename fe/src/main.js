import './assets/in_app/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PolarisVue from '@ownego/polaris-vue'
import '@ownego/polaris-vue/dist/style.css'

const app = createApp(App)

app.use(PolarisVue).use(router)

app.mount('#app')
