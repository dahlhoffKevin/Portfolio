<script>
import { db } from '../../../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import AdminProjectList from './AdminProjectList.vue';
import { ref, provide, onMounted } from 'vue';

//https://primevue.org/skeleton/

export default {
  name: 'AdminManageProjects',
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
      uploadedFile: null,
      isDragging: false,
    };
  },
  components: {
    AdminProjectList,
  },
  setup() {
    const projects = ref([]);

    provide('projects', projects);

    onMounted(async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      querySnapshot.forEach((doc) => {
        projects.value.push({ id: doc.id, data: doc.data() });
      });
    });

    const addProjectToList = (newProject) => {
      projects.value.push(newProject);
    };

    return { projects, addProjectToList };
  },
  methods: {
    showErrorWithTimeout(message) {
      this.errorMessage = message;
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 10000);
    },
    async addProject() {
      if (!this.uploadedFile) {
        this.showErrorWithTimeout('Please upload a thumbnail. Allowed formats .svg, .png, .jpg');
        return;
      }

      try {
        const projectsRef = collection(db, 'projects');
        const docRef = await addDoc(projectsRef, {
          title: this.projectName,
          titleTranslation: this.projectNameTranslation,
          shortDescription: this.projectShortDescription,
          shortDescriptionTranslation: this.projectShortDescriptionTranslation,
          description: this.projectDescription,
          descriptionTranslation: this.projectDescriptionTranslation,
        });

        const newProject = {
          id: docRef.id,
          data: {
            title: this.projectName,
            titleTranslation: this.projectNameTranslation,
            shortDescription: this.projectShortDescription,
            shortDescriptionTranslation: this.projectShortDescriptionTranslation,
            description: this.projectDescription,
            descriptionTranslation: this.projectDescriptionTranslation,
          },
        };

        this.addProjectToList(newProject);
      } catch (error) {
        this.showErrorWithTimeout(error.message);
      }

      this.showModal = false;
      this.resetForm();
    },
    closeForm() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.projectName = '';
      this.projectNameTranslation = '';
      this.projectShortDescription = '';
      this.projectShortDescriptionTranslation = '';
      this.projectDescription = '';
      this.projectDescriptionTranslation = '';
      this.uploadedFile = null;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.validateFile(file);
    },
    handleDrop(event) {
      event.preventDefault();
      this.isDragging = false;
      const file = event.dataTransfer.files[0];
      this.validateFile(file);
    },
    validateFile(file) {
      if (!file) return;
      if (file.type === 'image/svg+xml' || file.type === 'image/jpg' || file.type === 'image/png') {
        this.uploadedFile = file;
      } else {
        this.showErrorWithTimeout('Only SVG files are allowed.');
      }
    },
  },
}
</script>
<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-4xl">
      <h2 class="text-lg font-bold mb-4">Add New Project</h2>

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

        <div class="w-full p-2">
          <label class="block mb-2">Upload a Thumbnail</label>
          <div
            class="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center cursor-pointer"
            :class="{ 'bg-gray-100': isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop="handleDrop"
            @click="$refs.fileInput.click()"
          >
            <p v-if="!uploadedFile">
              Drag & Drop or Click to Upload (.svg, .png, .jpg)
            </p>
            <p v-if="uploadedFile" class="text-green-600 font-bold">
              {{ uploadedFile.name }}
            </p>
            <input
              ref="fileInput"
              type="file"
              accept=".svg,.png,.jpg"
              class="hidden"
              @change="handleFileUpload"
            />
          </div>
          <br />
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            @click="closeForm"
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
    <AdminProjectList />
  </div>
</template>
