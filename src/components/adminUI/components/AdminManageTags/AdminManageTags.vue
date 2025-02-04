<script>
import { db, getProjectCountByTag } from '../../../../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, provide, onMounted } from 'vue';
import AdminTagList from './AdminTagList.vue';

export default {
  name: 'AdminManageTags',
  data() {
    return {
        showModal: false,
        tagName: ''
    }
  },
  setup() {
    const tags = ref([]);
    provide('tags', tags);

    onMounted(async () => {
      const querySnapshot = await getDocs(collection(db, 'tags'));
      querySnapshot.forEach((doc) => {
        tags.value.push({ id: doc.id, data: doc.data() });
      });

      for (const tag of tags.value) {
        tag.data.projectCount = await getProjectCountByTag(collection(db, 'projects'), tag.id);
      }
    });

    const addTagToList= (newTag) => {
      tags.value.push(newTag);
    };

    return { tags, addTagToList };
  },
  components: {
    AdminTagList
  },
  methods: {
    async addTag() {

      try {
        const tagsRef = collection(db, 'tags');
        const docRef = await addDoc(tagsRef, { name: this.tagName });

        const newTag = {
          id: docRef.id,
          data: {
            name: this.tagName,
            projectCount: 0
          }
        };

        this.addTagToList(newTag);
      } catch (error) {
        console.error(error);
        this.showErrorWithTimeout('Error while trying to add the tag!');
      }

      this.showModal = false;
    },
    closeForm() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.tagName = '';
    },
    showErrorWithTimeout(message) {
      this.errorMessage = message;
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 10000);
    },
  }
}
</script>
<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-xs">
      <h2 class="text-lg font-bold mb-4">Add Project Tag</h2>

      <div v-if="showError">
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mt-4 shadow"
        >
          <p>{{ errorMessage }}</p>
        </div>
        <br />
      </div>

      <form @submit.prevent="addTag">
        <div class="w-full flex flex-wrap">
          <div class="w-full">
              <input
                v-model="tagName"
                type="text"
                class="w-full p-1 border rounded mb-4"
                required
              />
          </div>
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
      <h1 class="text-3xl font-bold text-blue-600">Manage Project-Tags</h1>
      <button
        @click="showModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add New Tag
      </button>
    </header>

    <!-- Tags List -->
    <AdminTagList/>
  </div>
</template>