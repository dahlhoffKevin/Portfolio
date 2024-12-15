import { createMemoryHistory, createRouter } from 'vue-router';
import AppBody from './components/AppBody.vue';
import ProjectVueFrontend from './components/projects/ProjectVueFrontend.vue';
import ProjectVueBackend from './components/projects/ProjectVueBackend.vue';

const routes = [
    { path: '/', component: AppBody, name: 'home' },
    { path: '/projectVueFrontend', component: ProjectVueFrontend, name: 'projectVueFrontend' },
    { path: '/projectVueBackend', component: ProjectVueBackend, name: 'projectVueBackend' }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

export default router;