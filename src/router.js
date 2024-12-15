import { createMemoryHistory, createRouter } from 'vue-router';
import AppBody from './components/AppBody.vue';
import ProjectVueFrontend from './components/ProjectVueFrontend.vue';

const routes = [
    { path: '/', component: AppBody, name: 'home' },
    { path: '/vueFrontend', component: ProjectVueFrontend, name: 'vueFrontend' }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

export default router;