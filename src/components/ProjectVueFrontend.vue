<template>
    <div class="min-h-screen bg-white text-gray-800">
      <!-- Header -->
      <Header/>
  
      <!-- Project Details -->
      <main class="container mx-auto p-6">
        <section class="py-12">
          <h2 class="text-4xl font-bold text-gray-900">{{ project.title }}</h2>
          <p class="text-lg text-gray-600 mt-4">{{ project.description }}</p>
        </section>
  
        <section class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-12">
          <img
            v-for="(image, index) in project.images"
            :key="index"
            :src="image"
            :alt="project.title"
            class="rounded-lg shadow-md"
          />
        </section>
  
        <section class="py-12">
          <h3 class="text-2xl font-bold text-gray-900">Details</h3>
          <p class="text-gray-700 mt-4">{{ project.details }}</p>
          <a
            :href="project.link"
            target="_blank"
            class="bg-blue-600 text-white px-4 py-2 rounded mt-6 inline-block hover:bg-blue-700"
          >
            Visit Project
          </a>
        </section>
      </main>
  
      <!-- Footer -->
      <Footer/>
    </div>
  </template>
  
  <script>
  import Header from './Header.vue';
  import Footer from './Footer.vue';

  export default {
    name: 'Project',
    components: {
      Header,
      Footer
    },
    data() {
      return {
        // Example project details
        project: {
          title: "Project 1",
          description: "A detailed description of Project 1.",
          details:
            "This project is focused on modern UI/UX design with cutting-edge technologies. It features responsive design, robust functionality, and seamless user experience.",
          images: [
            "https://via.placeholder.com/400x300",
            "https://via.placeholder.com/400x300",
            "https://via.placeholder.com/400x300",
          ],
          link: "https://example.com",
        },
      };
    },
  };
  </script>
  