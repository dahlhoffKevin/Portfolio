<script>
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import AdminManageProjects from './AdminManagProjects.vue';

export default {
  name: 'AdminUI',
  components: {
    AdminManageProjects,
  },
  methods: {
    async logout() {
      await signOut(auth);
      this.$router.push({ name: 'home' });
    }
  },
};
</script>

<template>
  <div class="min-h-screen flex bg-gray-50 text-gray-800">
    <aside class="w-64 bg-white shadow-lg">
      <div class="p-6">
        <h2 class="text-2xl font-bold text-blue-600">Admin Panel</h2>
      </div>
      <nav>
        <ul class="space-y-2 px-4">
          <li>
            <a href="#admin/logout" class="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md" @click="logout">
              <i class="fas mr-3 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                </svg>
              </i> Logout
            </a>
            <a href="#admin" class="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
              <i class="fas mr-3 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
              </i>Projects
            </a>
            <a href="#admin" class="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
              <i class="fas mr-3 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
              </i>Tags
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <AdminManageProjects/>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>