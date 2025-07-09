import { createApp } from 'vue'
import App from './App.vue'
//import './registerServiceWorker'
//import router from './router'
//import store from './store'
import PrimeVue from 'primevue/config'; // This imports the PrimeVue library.
import "vue3-openlayers/styles.css";
import 'bootstrap-icons/font/bootstrap-icons.css'

import OpenLayersMap from "vue3-openlayers";

createApp(App)
//.use(store)
//.use(router)
.use(OpenLayersMap)
.use(PrimeVue, { ripple: true })
.mount('#app')