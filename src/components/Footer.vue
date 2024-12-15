<template>
  <footer class="bg-gray-800 text-white py-6">
    <div class="container mx-auto text-center space-y-4">
      <!-- Contact Information -->
      <div>
        <p class="text-lg font-semibold">{{ $t("contact.title") }}</p>
        <p> 
          <a href="mailto:contact@kevindahlhoff.de" class="text-blue-400 hover:underline">
            contact@kevindahlhoff.de
          </a>
        </p>
      </div>

      <!-- Copyright Information -->
      <div>
        <p>&copy; 2024 kevindahlhoff.de | {{ $t('footer') }}</p>
        <p>Made with VueJS 3.4 & TailwindCSS by Kevin Dahlhoff</p>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
    name: 'Footer'
}
</script>