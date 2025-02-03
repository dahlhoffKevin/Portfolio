<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800"
  >
    <!-- Login Card -->
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm relative">
      <h1 class="text-2xl font-bold text-blue-600 text-center">Admin Login</h1>

      <!-- Popup for Errors -->
      <div
        v-if="showError"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mt-4 shadow"
      >
        <p>{{ errorMessage }}</p>
      </div>

      <form @submit.prevent="handleLogin" class="mt-6 space-y-4">
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            placeholder="Enter your password"
          />
        </div>

        <!-- Login Button -->
        <div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebase';

export default {
  name: 'adminLoginUI',
  data() {
    return {
      email: '',
      password: '',
      showError: false,
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      // Reset error state
      this.showError = false;
      this.errorMessage = '';

      if (!this.email || !this.password) {
        this.showErrorWithTimeout('Both email and password are required.');
        return;
      }

      // Redirect to admin page
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/admin');
      } catch (error) {
        if (typeof(error.message) && error.message.includes('auth/user-disabled')) {
          this.showErrorWithTimeout('User was deleted or is disabled!');
          return;
        }
        this.showErrorWithTimeout('Invalid credentials');
      }
    },
    showErrorWithTimeout(message) {
      this.errorMessage = message;
      this.showError = true;

      // Automatically hide the error after 3 seconds
      setTimeout(() => {
        this.showError = false;
      }, 10000);
    },
  },
};
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
