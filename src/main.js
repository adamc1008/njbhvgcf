import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { createApp } from 'vue'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(BootstrapVue3)

app.use(router)

app.mount('#app')
