<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <main class="container mx-auto p-6">

      <!-- Hero Section -->
      <section class="text-center py-20">
        <h2 class="text-4xl font-bold text-blue-600">{{ $t("heroTitle") }}</h2>
        <p class="text-lg text-gray-600 mt-4">{{ $t("heroSubtitle") }}</p>
      </section>

      <!-- About Section -->
      <section id="about" class="py-16">
        <h3 class="text-3xl font-semibold text-blue-600">
          {{ $t("about.title") }}
        </h3>
        <p class="text-gray-700 mt-4">
          {{ $t("about.desc") }}
        </p>
      </section>

      <!-- Projects Section -->
      <section id="projects" class="py-16">
        <h3 class="text-3xl font-semibold text-blue-600">
          {{ $t("projects.title") }}
        </h3>
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          <div v-for="(project, index) in projects">
            <div :key="index" class="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between hover:shadow-xl">
              <div class="flex items-center justify-center h-16 mb-4">
                <img
                  :src="project.logo.logoPath"
                  :alt="project.logo.alt"
                  class="h-full object-contain"
                />
              </div>
              <h4 class="text-xl font-semibold">
                {{ this.$t(`projects.${project.translationId}.title`) }}
              </h4>
              <p class="text-gray-600 mt-2">
                {{ this.$t(`projects.${project.translationId}.desc`) }}
              </p>
              <!-- Tags -->
              <div :key="index" class="flex flex-wrap gap-2 mt-3">
                <div v-for="(tag, index) in project.tags">
                  <div
                    :key="index"
                    class="bg-blue-100 text-blue-600 shadow-lg rounded-md py-1 px-2 inline-block"
                  >
                    {{ tag }}
                  </div>
                </div>
              </div>
              <div class="mt-12">
              <!-- <button
                target="_blank"
                class="bg-blue-600 text-white px-4 py-2 rounded inline-block hover:bg-blue-700 hover:scale-105"
                @click="routeToProject(project.projectRoute)"
              >
                {{ $t("projects.button") }}
              </button> -->
            </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section id="skills" class="py-16">
        <h3 class="text-3xl font-semibold text-blue-600">
          {{ $t("skills.header") }}
        </h3>
        <div class="py-16 bg-white text-gray-800 shadow-lg rounded-lg mt-6">
          <div class="container mx-auto text-center">
            <h2 class="text-4xl font-bold text-gray-900">
              {{ $t("skills.title") }}
            </h2>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              <!-- Front-end Entwicklung -->
              <div class="flex flex-col items-center" style="margin-left: 2%">
                <span class="text-blue-600 text-6xl">
                  <!-- Computer Icon -->
                  <i class="fas fa-desktop"></i>
                </span>
                <h3 class="text-xl font-semibold text-gray-900 mt-4">
                  {{ $t("skills.frontend.title") }}
                </h3>
                <p class="text-gray-600 mt-2 text-sm">
                  {{ $t("skills.frontend.desc") }}
                </p>
              </div>
              <!-- Back-end Entwicklung -->
              <div class="flex flex-col items-center">
                <span class="text-blue-600 text-6xl">
                  <!-- Gear Icon -->
                  <i class="fas fa-cogs"></i>
                </span>
                <h3 class="text-xl font-semibold text-gray-900 mt-4">
                  {{ $t("skills.backend.title") }}
                </h3>
                <p class="text-gray-600 mt-2 text-sm">
                  {{ $t("skills.backend.desc") }}
                </p>
              </div>
              <!-- Schnittstellenentwicklung -->
              <div class="flex flex-col items-center" style="margin-right: 2%">
                <span class="text-blue-600 text-6xl">
                  <!-- Connected Gears Icon -->
                  <i class="fas fa-tools"></i>
                </span>
                <h3 class="text-xl font-semibold text-gray-900 mt-4">
                  {{ $t("skills.api.title") }}
                </h3>
                <p class="text-gray-600 mt-2 text-sm">
                  {{ $t("skills.api.desc") }}
                </p>
              </div>
              <!-- PlaceHolder -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12"></div>
              <!-- Agile Softwareentwicklung -->
              <div class="flex flex-col items-center">
                <span class="text-blue-600 text-6xl">
                  <!-- Clipboard Icon -->
                  <i class="fas fa-clipboard-check"></i>
                </span>
                <h3 class="text-xl font-semibold text-gray-900 mt-4">
                  {{ $t("skills.agile.title") }}
                </h3>
                <p class="text-gray-600 mt-2 text-sm">
                  {{ $t("skills.api.desc") }}
                </p>
              </div>
              <!-- PlaceHolder -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <!-- <section id="contact" class="py-16">
        <h3 class="text-3xl font-semibold">{{ $t("contact.title") }}</h3>
        <form class="grid gap-6 grid-cols-1 sm:grid-cols-2 mt-6">
          <input
            type="text"
            :placeholder="$t('contact.name')"
            class="border border-gray-300 p-2 rounded"
          />
          <input
            type="email"
            :placeholder="$t('contact.email')"
            class="border border-gray-300 p-2 rounded"
          />
          <textarea
            :placeholder="$t('contact.message')"
            class="border border-gray-300 p-2 rounded sm:col-span-2"
          ></textarea>
          <button
            class="bg-blue-600 text-white py-2 px-4 rounded sm:col-span-2"
          >
            {{ $t("contact.button") }}
          </button>
        </form>
      </section> -->

    </main>
  </div>
</template>
<script>
import { projects } from '../assets/projects.js';

export default {
  name: 'AppBody',
  data() {
    return {
        projects
    };
  },
  methods: {
    routeToProject(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>
