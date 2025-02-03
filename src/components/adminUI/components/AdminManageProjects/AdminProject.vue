<script>
import { db } from '../../../../firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

export default {
  name: 'AdminProject',
  inject: ['projects'],
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showDeleteRequestDialog: false,
      showProjectEditDialog: false,
      showError: false,
      title: '',
      titleTranslation: '',
      shortDescription: '',
      shortDescriptionTranslation: '',
      description: '',
      descriptionTranslation: '',
      thumbnail: ''
    }
  },
  methods: {
    async editProject() {
      this.title = this.data.title;
      this.titleTranslation = this.data.titleTranslation;
      this.shortDescription = this.data.shortDescription;
      this.shortDescriptionTranslation = this.data.shortDescriptionTranslation;
      this.description = this.data.description;
      this.descriptionTranslation = this.data.descriptionTranslation;
      this.thumbnail = this.data.thumbnail;
      this.showProjectEditDialog = true;
    },
    async deleteProject() {
      this.showDeleteRequestDialog = true;
    },
    async runProjectUpdateWorkflow() {
      const updatedProject = {
        title: this.title,
        titleTranslation: this.titleTranslation,
        shortDescription: this.shortDescription,
        shortDescriptionTranslation: this.shortDescriptionTranslation,
        description: this.description,
        descriptionTranslation: this.descriptionTranslation
      }

      try {
        const projectRef = doc(db, 'projects', this.id);
        updateDoc(projectRef, updatedProject);
      } catch (error) {
        console.error(error);
        this.showErrorWithTimeout('Fehler beim aktualisieren des Projekts!');
        return;
      }

      try {
        const index = this.projects.findIndex((p) => p.id === this.id);
        this.projects[index] = { id: this.id, data: updatedProject};
      } catch (error) {
        console.log(error);
        this.showErrorWithTimeout('Fehler beim aktualisieren des Projekts!');
        return;
      }

      this.showProjectEditDialog = false;
    },
    async runProjectDeletionWorkflow() {
      try {
        const projectRef = doc(db, 'projects', this.id);
        await deleteDoc(projectRef);

        const index = this.projects.findIndex((p) => p.id === this.id);
        if (index !== -1) {
          this.projects.splice(index, 1);
        }

        console.log(`Project ${this.id} deleted successfully`);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    },
    showErrorWithTimeout(message) {
      this.errorMessage = message;
      this.showError = true;

      // Automatically hide the error after 10 seconds
      setTimeout(() => {
        this.showError = false;
      }, 10000);
    },
  },
};
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
    <img v-bind:src="data.thumbnail" alt="project thumbnail">
    <h3 class="text-lg font-semibold text-gray-800">{{ data.title }}</h3>
    <p class="text-gray-600 mt-2 text-sm">{{ data.description }}</p>
    <div class="mt-4 flex justify-between">
      <button @click="editProject()" class="text-blue-600 hover:underline">Edit</button>
      <button @click="deleteProject()" class="text-red-600 hover:underline">Delete</button>
    </div>
  </div>
    <!-- Edit Project Form -->
    <div
    v-if="showProjectEditDialog"
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

      <form @submit.prevent="runProjectUpdateWorkflow">
        <div class="w-full flex flex-wrap">
          <!-- Left Column -->
          <div class="w-full md:w-1/2 p-2">
            <div class="border rounded mb-4 p-2">
              <label class="block mb-2">Project Name:</label>
              <input
                v-model="title"
                type="text"
                class="w-full p-1 border rounded mb-4"
                required
              />

              <label class="block mb-2">Project Name Translation:</label>
              <input
                v-model="titleTranslation"
                type="text"
                class="w-full p-1 border rounded mb-4"
                required
              />
            </div>

            <div class="border rounded mb-4 p-2">
              <label class="block mb-2">Short Description:</label>
              <input
                v-model="shortDescription"
                type="text"
                class="w-full p-1 border rounded mb-4"
                required
              />

              <label class="block mb-2">Short Description Translation:</label>
              <input
                v-model="shortDescriptionTranslation"
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
                v-model="description"
                class="w-full p-1 border rounded mb-4 h-32"
                required
              ></textarea>

              <label class="block mb-2">Description Translation:</label>
              <textarea
                v-model="descriptionTranslation"
                class="w-full p-1 border rounded mb-4 h-32"
                required
              ></textarea>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            @click="showProjectEditDialog = false"
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
  <!-- Confirm Delete Request Form -->
  <div
  v-if="showDeleteRequestDialog"
  class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-sm">
      <h2 class="text-lg font-bold mb-4">Confirm deletion</h2>
      <p>Please confirm deletion of projection {{ data.title }} ({{ id }}) </p>
      <br>
      <form @submit.prevent="runProjectDeletionWorkflow">
        <div class="flex justify-end">
          <button
            type="button"
            @click="showDeleteRequestDialog = false"
            class="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
