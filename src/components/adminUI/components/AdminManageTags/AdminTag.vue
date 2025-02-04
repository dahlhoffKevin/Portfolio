<script>
import { db } from '../../../../firebase';
import { collection, getDocs, where, writeBatch, doc, query, deleteDoc } from 'firebase/firestore';

export default {
  name: 'AdminTag',
  data() {
    return {
        isEditing: false
    }
  },
  inject: ['tags'],
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
  methods: {
    updateTag() {
      const updatedTagName = document.getElementById('input_' + this.id).value;
      if (this.data.name == updatedTagName) return;

      //TODO: Update Tag
    },
    async deleteTag() {
      //delete tag referenz in projects first
      await this.deleteTagAndRemoveReferences();

      //delete tag in tag collection
      try {
        const index = this.tags.findIndex((t) => t.id === this.id);
        if (index !== -1) {
          this.tags.splice(index, 1);
        }

        const tagsRef = doc(db, 'tags', this.id);
        await deleteDoc(tagsRef);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    },
    async deleteTagAndRemoveReferences() {
      const projetcsRef = collection(db, 'projects');
      const projectTagRef = doc(projetcsRef.firestore, 'tags', this.id);
      const projectsQuery = query(projetcsRef, where('tags', 'array-contains', projectTagRef));
      const projectsQuerySnapshot = await getDocs(projectsQuery);

      if (projectsQuerySnapshot.empty) {
        console.log('no projects references this tag id');
        return;
      }

      const batch = writeBatch(db);
      const tagsRef = collection(db, 'tags');
      // const tagRef = doc(tagsRef.firestore, 'tags', this.id);

      projectsQuerySnapshot.forEach((projetcsDoc) => {
        const projectRef = doc(db, 'projects', projetcsDoc.id);
        const updatedTags = projetcsDoc.data().tags.filter(tagRef => tagRef.id !== this.id);
        batch.update(projectRef, { tags: updatedTags });
      });

      await batch.commit();
    }
  }
}
</script>

<template>
  <div class="p-4 bg-white shadow rounded-md">
    <!-- Flex Container für Tag und Button -->
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <!-- Tag Name (mit Doppelklick zum Bearbeiten) -->
        <div
          class="bg-blue-100 text-blue-600 shadow rounded-md py-1 px-2 cursor-pointer"
          v-if="!isEditing"
          @dblclick="isEditing = true"
        >
          {{ data.name }}
        </div>
        <input
          v-else
          v-model="data.name"
          @blur="isEditing = false"
          @keyup.enter="updateTag()"
          class="border p-1 rounded-md"
          :id="'input_' + id"
        />
        <div class="bg-blue-100 text-blue-600 shadow rounded-md py-1 px-2 ml-2">
          {{ data.projectCount }}
        </div>
      </div>
      <!-- Delete Button -->
      <button class="ml-4 text-red-600 hover:text-red-800" @click="deleteTag">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
