<script>
import { inject, onMounted } from 'vue';
import AdminTag from './AdminTag.vue';

export default {
  name: 'AdminTagList',
  components: {
    AdminTag
  },
  setup() {
    const tags = inject('tags');
    return { tags };
  },
  methods: {
  }
};
</script>

<template>
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-gray-700">Tag List</h2>
    <div class="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-if="tags.length"
        v-for="tag in tags"
        :key="tag.id"
      >
        <AdminTag :id="tag.id" :data="tag.data"/>
      </div>
    </div>
  </section>
</template>
