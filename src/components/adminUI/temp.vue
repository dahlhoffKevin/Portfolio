<script>
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import adminProjectList from './AdminProjectList.vue';
import { ref, provide, onMounted } from 'vue';

export default {
  name: 'AdminUI',
  data() {
    return {
      showModal: false,
      projectName: '',
      projectNameTranslation: '',
      projectShortDescription: '',
      projectShortDescriptionTranslation: '',
      projectDescription: '',
      projectDescriptionTranslation: '',
      showError: false,
      errorMessage: '',
    };
  },
  components: {
    adminProjectList,
  },
  setup() {
    const projects = ref([]);

    provide("projects", projects);

    onMounted(async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      querySnapshot.forEach((doc) => {
        projects.value.push({ id: doc.id, data: doc.data() });
      });
    });

    const addProjectToList = (newProject) => {
      projects.value.push(newProject); // Add new project to reactive array
    };

    return { projects, addProjectToList };
  },
  async beforeMount() {
    console.log(auth.currentUser);
    if (!auth.currentUser) {
      this.$router.push({ name: 'adminLogin' });
    }
  },
  methods: {
    async logout() {
      await signOut(auth);
      this.$router.push({ name: 'home' });
    },
    showErrorWithTimeout(message) {
      this.errorMessage = message;
      this.showError = true;

      // Automatically hide the error after 10 seconds
      setTimeout(() => {
        this.showError = false;
      }, 10000);
    },
    async addProject() {
      const projectsRef = collection(db, 'projects');
      try {
        const docRef = await addDoc(projectsRef, {
          title: this.projectName,
          titleTranslation: this.projectNameTranslation,
          shortDescription: this.projectShortDescription,
          shortDescriptionTranslation: this.projectShortDescriptionTranslation,
          description: this.projectDescription,
          descriptionTranslation: this.projectDescriptionTranslation
        });

        // Create the project object and add it to the list
        const newProject = {
          id: docRef.id,
          data: {
            title: this.projectName,
            titleTranslation: this.projectNameTranslation,
            shortDescription: this.projectShortDescription,
            shortDescriptionTranslation: this.projectShortDescriptionTranslation,
            description: this.projectDescription,
            descriptionTranslation: this.projectDescriptionTranslation
          },
        };

        this.addProjectToList(newProject); // Add to reactive projects array

      } catch (error) {
        this.showErrorWithTimeout(error.message);
      }

      // Close modal & clear input fields
      this.showModal = false;
      this.projectName = '';
      this.projectNameTranslation = '';
      this.projectShortDescription = '';
      this.projectShortDescriptionTranslation = '';
      this.projectDescription = '';
      this.projectDescriptionTranslation = '';
    },
  },
};
</script>

<template>
  <div class="min-h-screen flex bg-gray-50 text-gray-800">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-lg">
      <div class="p-6">
        <h2 class="text-2xl font-bold text-blue-600">Admin Panel</h2>
      </div>
      <nav>
        <ul class="space-y-2 px-4">
          <li>
            <a
              href="#admin/logout"
              class="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
              @click="logout"
            >
              <i class="fas fa-sign-out-alt mr-3 text-blue-600"></i>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-4xl">
        <h2 class="text-lg font-bold mb-4">Add New Project</h2>

        <!-- Popup for Errors -->
        <div v-if="showError">
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mt-4 shadow"
          >
            <p>{{ errorMessage }}</p>
          </div>
          <br />
        </div>

        <form @submit.prevent="addProject">
          <div class="w-full flex flex-wrap">
            <!-- Left Column -->
            <div class="w-full md:w-1/2 p-2">
              <div class="border rounded mb-4 p-2">
                <label class="block mb-2">Project Name:</label>
                <input
                  v-model="projectName"
                  type="text"
                  class="w-full p-1 border rounded mb-4"
                  required
                />

                <label class="block mb-2">Project Name Translation:</label>
                <input
                  v-model="projectNameTranslation"
                  type="text"
                  class="w-full p-1 border rounded mb-4"
                  required
                />
              </div>

              <div class="border rounded mb-4 p-2">
                <label class="block mb-2">Short Description:</label>
                <input
                  v-model="projectShortDescription"
                  type="text"
                  class="w-full p-1 border rounded mb-4"
                  required
                />

                <label class="block mb-2">Short Description Translation:</label>
                <input
                  v-model="projectShortDescriptionTranslation"
                  type="text"
                  class="w-full p-1 border rounded mb-4"
                  required
                />
              </div>
            </div>

            <!-- Right Column -->
            <div class="w-full md:w-1/2 p-2">
              <div class="border rounded mb-4 p-2">
                <label class="block mb-2">Description:</label>
                <textarea
                  v-model="projectDescription"
                  class="w-full p-1 border rounded mb-4 h-32"
                  required
                ></textarea>

                <label class="block mb-2">Description Translation:</label>
                <textarea
                  v-model="projectDescriptionTranslation"
                  class="w-full p-1 border rounded mb-4 h-32"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              type="button"
              @click="showModal = false"
              class="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-6">
      <!-- Header -->
      <header class="flex items-center justify-between pb-6 border-b">
        <h1 class="text-3xl font-bold text-blue-600">Manage Projects</h1>
        <button
          @click="showModal = true"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New Project
        </button>
      </header>

      <!-- Project List -->
      <adminProjectList />
    </div>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
