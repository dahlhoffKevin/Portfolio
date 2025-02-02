import { createWebHashHistory, createRouter } from 'vue-router';
import { getCurrentUser } from './firebase';
import AppBody from './components/AppBody.vue';
import ProjectVueFrontend from './components/projects/ProjectVueFrontend.vue';
import ProjectVueBackend from './components/projects/ProjectVueBackend.vue';
import AdminUI from './components/adminUI/AdminUI.vue';
import AdminLogin from './components/adminUI/AdminLogin.vue';

const routes = [
  { path: '/', component: AppBody, name: 'home' },
  { path: '/projectVueFrontend', component: ProjectVueFrontend, name: 'projectVueFrontend' },
  { path: '/projectVueBackend', component: ProjectVueBackend, name: 'projectVueBackend' },
  { path: '/admin', component: AdminUI, name: 'AdminUI', meta: { requiresAuth: true } },
  { path: '/adminLogin', component: AdminLogin, name: 'adminLoginUI' }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const user = await getCurrentUser();
      if (user) {
        next(); // Weiterleiten, wenn der Benutzer eingeloggt ist
      } else {
        next({ name: 'adminLoginUI' }); // Redirect zum Login
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      next({ name: 'adminLoginUI' });
    }
  } else {
    next(); // Keine Authentifizierung benötigt
  }
});

export default router;