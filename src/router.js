import { createMemoryHistory, createRouter } from 'vue-router';
import App from './App.vue';
import ProjectVueFrontend from './components/ProjectVueFrontend.vue';

const routes = [
    {
        path: '/',
        component: App,
        name: 'home'
    },
    {
        path: '/vueFrontend',
        component: ProjectVueFrontend,
        name: 'vueFrontend'
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

export default router;