<template>
  <header class="bg-white shadow">
    <nav class="container mx-auto flex justify-between items-center py-4 px-6">
      <!-- Logo -->
      <button @click="routeToHome()"><h1 class="text-xl font-semibold text-blue-600">Kevin Dahlhoff</h1></button>

      <!-- Burger Menu Button for Small Screens -->
      <div class="sm:hidden">
        <button @click="toggleMenu" class="text-blue-600 focus:outline-none">
          <!-- Burger Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Main Menu for Large Screens -->
      <div class="hidden sm:flex items-center space-x-6">
        <ul class="flex space-x-6">
          <li v-if="$route.fullPath == '/'"><button @click="scrollToSection('about')" class="hover:text-blue-600">{{ $t('header.about') }}</button></li>
          <li v-if="$route.fullPath == '/'"><button @click="scrollToSection('projects')" class="hover:text-blue-600">{{ $t('header.projects') }}</button></li>
          <li v-if="$route.fullPath == '/'"><button @click="scrollToSection('skills')" class="hover:text-blue-600">{{ $t('header.skills') }}</button></li>
          <li v-if="$route.fullPath == '/'"><button @click="scrollToSection('contact')" class="hover:text-blue-600">{{ $t('header.contact') }}</button></li>
        </ul>
        <button @click="toggleLanguage" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {{ currentLanguage === 'en' ? '🇩🇪' : '🇬🇧' }}
        </button>
      </div>

      <!-- Sliding Menu for Small Screens -->
      <div
        class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        :class="{ 'opacity-100 pointer-events-auto': isMenuOpen, 'opacity-0 pointer-events-none': !isMenuOpen }"
        @click="toggleMenu"
      ></div>
      <div
        class="fixed right-0 top-0 h-full bg-white shadow-lg z-50 w-64 transform transition-transform duration-300"
        :class="{ 'translate-x-0': isMenuOpen, 'translate-x-full': !isMenuOpen }"
      >
        <button @click="toggleMenu" class="text-gray-500 p-4 focus:outline-none">
          <!-- Close Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <ul class="flex flex-col space-y-4 p-6">
          <li><button @click="scrollToSection('about')" class="hover:text-blue-600">{{ $t('header.about') }}</button></li>
          <li><button @click="scrollToSection('projects')" class="hover:text-blue-600">{{ $t('header.projects') }}</button></li>
          <li><button @click="scrollToSection('skills')" class="hover:text-blue-600">{{ $t('header.skills') }}</button></li>
          <li><button @click="scrollToSection('contact')" class="hover:text-blue-600">{{ $t('header.contact') }}</button></li>
        </ul>
        <div class="p-6">
          <button @click="toggleLanguage" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
            {{ currentLanguage === 'en' ? '🇩🇪' : '🇬🇧' }}
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isMenuOpen: false, // Tracks the state of the menu
      currentLanguage: 'de', // Language toggle state
    };
  },
  // onMount() {
  //   console.log(this.$route.fullPath);
  //   if (this.$route.fullPath == '/admin') {
  //     return;
  //   }
  // },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === 'en' ? 'de' : 'en';
      this.$i18n.locale = this.currentLanguage;
    },
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
      // Close the menu after clicking on a section link
      this.isMenuOpen = false;
    },
    routeToHome() {
      this.$router.push({ name: 'home' })
    }
  },
};
</script>