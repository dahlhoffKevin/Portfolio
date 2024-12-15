<template>
    <div class="min-h-screen bg-gray-50 text-gray-800"> 
      <!-- Project Details -->
      <main class="container mx-auto p-6">

        <!-- Project Head Section -->
        <section class="py-12">
          <h2 class="text-4xl font-bold text-gray-900">{{ $t(`projects.${projects.taskitudeFrontend.translationId}.title`) }}</h2>
          <p class="text-lg text-gray-600 mt-4">{{ $t(`projects.${projects.taskitudeFrontend.translationId}.detailedDesc`) }}</p>
          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mt-3">
            <div
              class="bg-blue-100 text-blue-600 shadow-lg rounded-md py-1 px-2 inline-block"
              v-for="(tag, index) in projects.taskitudeFrontend.tags"
              :key="index"
            >
              {{ tag }}
            </div>
          </div>
        </section>
  
        <section class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-12">
          <img
            v-for="(image, index) in projects.taskitudeFrontend.images"
            :key="index"
            :src="image"
            :alt="projects.taskitudeFrontend.title"
            class="rounded-lg shadow-md"
          />
        </section>
  
        <section class="py-12">
          <h3 class="text-2xl font-bold text-gray-900">Details</h3>
          <p class="text-gray-700 mt-4">{{ projects.taskitudeFrontend.details }}</p>
          <a
            :href="projects.taskitudeFrontend.sourceCodeLink"
            target="_blank"
            class="bg-blue-600 text-white px-4 py-2 rounded mt-6 inline-block hover:bg-blue-700"
          >
            Source Code
        </a>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  import Header from '../Header.vue';
  import Footer from '../Footer.vue';
  import { projects } from '../../assets/projects.js';

  export default {
    name: 'ProjectVueFrontend',
    components: {
      Header,
      Footer
    },
    data() {
      return {
        projects
      };
    },
  };
  </script>
  