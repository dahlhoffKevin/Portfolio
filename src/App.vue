<template>
  <Header v-show="!$route.fullPath.startsWith('/admin')"/>
  <RouterView/>
  <Footer v-show="!$route.fullPath.startsWith('/admin')"/>
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
