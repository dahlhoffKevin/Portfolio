import { createApp } from 'vue';
import './style.css';
import { createI18n } from 'vue-i18n';
import { messages } from './assets/translations.js';
import router from './router.js';
import App from './App.vue';

const i18n = createI18n({
  locale: 'de',
  fallbackLocale: 'en',
  messages
});

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount('#app');
