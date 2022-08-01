<template>
  <div v-if="isShow" class="overlay"></div>
  <div class="list-container">
    <stay-preview v-for="stay in stays" :stay="stay" :key="stay._id" />
  </div>
</template>

<script>
  import stayPreview from '../cmps/stay-preview.vue';
  import { eventBus } from '../services/event-bus.service.js';
  export default {
    name: 'stay-list',
    props: {
      stays: Array,
    },
    data() {
      return {
        isShow: false,
      };
    },
    created() {
      const bus = eventBus.on('overlay', data => {
        this.isShow = data;
      });
    },
    components: {
      stayPreview,
      eventBus,
    },
  };
</script>
