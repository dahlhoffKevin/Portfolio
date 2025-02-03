<script>
import { inject } from 'vue';
import AdminProject from './AdminProject.vue';

export default {
  name: 'AdminProjectList',
  components: {
    AdminProject,
  },
  setup() {
    const projects = inject('projects');
    return { projects };
  },
};
</script>

<template>
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-gray-700">Project List</h2>
    <div class="mt-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div v-if="projects.length" v-for="project in projects" :key="project.id">
        <AdminProject :id="project.id" :data="project.data" />
      </div>
      <div v-else>
        <p>No projects added!</p>
      </div>
    </div>
  </section>
</template>
