import { createApp } from 'vue'
import App from './App.vue'


import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

// Pinia - State Management
import { createPinia } from 'pinia'

import './styles/primevue-global.css'

// Componentes PrimeVue
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import Select from 'primevue/select'
import Calendar from 'primevue/calendar'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import Menu from 'primevue/menu'
import OverlayPanel from 'primevue/overlaypanel'
import Popover from 'primevue/popover'

const app = createApp(App)

// Configurar Pinia
app.use(createPinia())

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark-mode',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  }
})

app.use(ToastService)

app.directive('tooltip', Tooltip)


app.component('Button', Button)
app.component('InputText', InputText)
app.component('Card', Card)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Dialog', Dialog)
app.component('Textarea', Textarea)
app.component('Dropdown', Dropdown)
app.component('Select', Select)
app.component('Calendar', Calendar)
app.component('DatePicker', DatePicker)
app.component('InputNumber', InputNumber)
app.component('Toast', Toast)
app.component('Menu', Menu)
app.component('OverlayPanel', OverlayPanel)
app.component('Popover', Popover)

app.mount('#app')
