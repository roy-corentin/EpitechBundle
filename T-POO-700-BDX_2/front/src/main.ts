import '@vuepic/vue-datepicker/dist/main.css'
import 'vue-toastification/dist/index.css'
import './assets/main.css'

// Plugins
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Toast from 'vue-toastification'

// Global components
import VueDatePicker from '@vuepic/vue-datepicker'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import vSelect from 'vue-select'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)
app.component('v-select', vSelect)
app.component('v-datepicker', VueDatePicker)

ChartJS.register(ArcElement, Tooltip, Legend)

app.mount('#app')
