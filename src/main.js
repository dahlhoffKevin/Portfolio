import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { messages } from './assets/translations.js';
import { VueFire, VueFireFirestoreOptionsAPI } from 'vuefire';
import { firebaseApp } from './firebase.js';
import router from './router.js';
import App from './App.vue';
import './style.css';

const i18n = createI18n({
  locale: 'de',
  fallbackLocale: 'en',
  messages
});

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireFirestoreOptionsAPI(),
  ]
})
app.mount('#app');
