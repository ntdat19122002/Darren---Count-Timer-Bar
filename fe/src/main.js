import './assets/in_app/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PolarisVue from '@ownego/polaris-vue'
import '@ownego/polaris-vue/dist/style.css'
import {createApp as createAppBridge} from '@shopify/app-bridge'
import store from "./store/store";

const app = createApp(App)
const appBridge = createAppBridge({
    apiKey: '2886ff10c28fa541be66db52b0a98deb',
    host: new URLSearchParams(location.search).get("host"),
    forceRedirect: true
})
store.commit('setAppBridge', appBridge);
app.use(store).use(PolarisVue).use(router).mount('#app')
