import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

import App from './App.vue';

const app = createApp(App);

const vuetify = createVuetify();

app.use(createPinia());
app.use(vuetify);

app.mount('#app');
