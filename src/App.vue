<template>
  <div v-if="!$route.fullPath.startsWith('/admin')"><Header/></div>
  <RouterView/>
  <div v-if="!$route.fullPath.startsWith('/admin')"><Footer/></div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
};
</script>
